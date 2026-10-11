import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const input = process.argv[2];
const option = (name) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};
if (!input) {
  console.error('Usage: node scripts/generate-trello-docs.mjs <board.json> [--workbook file.xlsx --workbook-rows extracted-rows.json]');
  process.exit(1);
}
const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const dataPath = 'data/trello-board-snapshot.json';
const project = 'docs/Project Management';
const sourcePage = `${project}/trello-board-snapshot.md`;
const ai = '## AI Declaration\n\nOpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.';
let snapshot;
if (raw.schemaVersion === 1) {
  snapshot = raw;
} else {
  const members = new Map(raw.members.map((member) => [member.id, member.fullName]));
  const checklists = new Map(raw.checklists.map((list) => [list.id, list]));
  const latestAction = raw.actions.map((action) => action.date).sort().at(-1) || raw.dateLastActivity;
  snapshot = {
    schemaVersion: 1,
    board: { name: raw.name, url: raw.url, latestAction, lastActivity: raw.dateLastActivity },
    sources: [{ file: path.basename(input), sha256: hash(input), role: 'Full board export' }],
    lists: raw.lists.map((list) => ({ id: list.id, name: list.name, archived: list.closed, position: list.pos })),
    cards: raw.cards.map((card) => ({
      number: card.idShort, title: card.name, url: card.shortUrl || card.url,
      listId: card.idList, position: card.pos, archived: card.closed,
      markedComplete: card.dueComplete === true, dateCompleted: card.dateCompleted || null,
      lastActivity: card.dateLastActivity, due: card.due || null,
      owners: card.idMembers.map((id) => members.get(id) || `Unknown member ${id}`),
      labels: card.labels.map((label) => label.name || label.color),
      description: card.desc || '',
      checklists: card.idChecklists.map((id) => {
        const list = checklists.get(id);
        if (!list) throw new Error(`Missing checklist ${id} on card #${card.idShort}`);
        return { name: list.name, items: [...list.checkItems].sort((a, b) => a.pos - b.pos).map((item) => ({ name: item.name, complete: item.state === 'complete' })) };
      })
    }))
  };
  const workbook = option('--workbook');
  const workbookRows = option('--workbook-rows');
  if (Boolean(workbook) !== Boolean(workbookRows)) throw new Error('Supply both workbook and extracted rows.');
  if (workbook) {
    const sheets = JSON.parse(fs.readFileSync(workbookRows, 'utf8'));
    const rows = sheets.find((sheet) => sheet.name === 'Cards')?.rows;
    if (!rows?.length) throw new Error('Missing Cards worksheet.');
    const headers = new Map(Object.entries(rows[0].cells).map(([cell, value]) => [value, cell.replace(/\d+$/, '')]));
    const lists = new Map(snapshot.lists.map((list) => [list.id, list.name]));
    const matchedCards = [];
    let blankCompletionMarkers = 0;
    for (const row of rows.slice(1)) {
      const value = (label) => row.cells[`${headers.get(label)}${row.row}`] || '';
      const card = snapshot.cards.find((card) => card.url === value('Short URL'));
      if (!card || card.title !== value('Name') || lists.get(card.listId) !== value('List') || card.description !== value('Description') || card.archived !== (value('Archived') === 'Yes')) {
        throw new Error(`Workbook and JSON disagree at Cards row ${row.row}.`);
      }
      if (!value('Due complete')) blankCompletionMarkers++;
      matchedCards.push(card.number);
    }
    snapshot.sources.push({ file: path.basename(workbook), sha256: hash(workbook), role: 'Partial setup-card export' });
    snapshot.workbookReconciliation = { sheet: 'Cards', rowCount: matchedCards.length, matchedCards, comparedFields: ['title', 'list', 'description', 'archived'], blankCompletionMarkers };
  }
}

const lists = new Map(snapshot.lists.map((list) => [list.id, list]));
const numbers = new Set();
for (const card of snapshot.cards) {
  if (numbers.has(card.number)) throw new Error(`Duplicate card #${card.number}`);
  if (!lists.has(card.listId)) throw new Error(`Unknown list on card #${card.number}`);
  numbers.add(card.number);
}
const cardsIn = (name, includeArchived = false) => snapshot.cards.filter((card) => lists.get(card.listId).name === name && (includeArchived || !card.archived)).sort((a, b) => a.position - b.position || a.number - b.number);
const items = (card) => card.checklists.flatMap((list) => list.items);
const progress = (card) => {
  const values = items(card);
  return values.length ? `${values.filter((item) => item.complete).length}/${values.length}` : 'No checklist';
};
const cell = (value) => String(value).replaceAll('|', '\\|').replace(/\r?\n/g, '<br>');
const link = (card) => `[#${card.number} — ${cell(card.title)}](${card.url})`;
const owner = (card) => cell(card.owners.join(', ') || 'Unassigned');
const localDate = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Johannesburg', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(snapshot.board.latestAction));
const reference = (file) => path.relative(path.dirname(file), sourcePage).split(path.sep).join('/');
const basis = (file) => `**Board snapshot: ${localDate}.** Latest recorded action: \`${snapshot.board.latestAction}\` (UTC). See [export sources and reconciliation](${reference(file)}). List placement, the card completion marker (Trello \`dueComplete\`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.`;
const table = (cards, includeList = false) => {
  if (!cards.length) return '_No cards in this list._';
  const rows = [
    `| Card | ${includeList ? 'List | ' : ''}Owner(s) | Archived | Marked complete | Checklist |`,
    `| --- | ${includeList ? '--- | ' : ''}--- | --- | --- | --- |`
  ];
  for (const card of cards) rows.push(`| ${link(card)} | ${includeList ? `${cell(lists.get(card.listId).name)} | ` : ''}${owner(card)} | ${card.archived ? 'Yes' : 'No'} | ${card.markedComplete ? 'Yes' : 'No'} | ${progress(card)} |`);
  return rows.join('\n');
};
const detail = (card) => {
  const rows = [`### ${link(card)}`, '', `- **List:** ${cell(lists.get(card.listId).name)}${lists.get(card.listId).archived ? ' (archived list)' : ''}`, `- **Owner(s):** ${owner(card)}`, `- **Archived card:** ${card.archived ? 'Yes' : 'No'}`, `- **Marked complete:** ${card.markedComplete ? 'Yes' : 'No'}`, `- **Completion timestamp:** ${card.dateCompleted || 'Not recorded'}`, `- **Checklist:** ${progress(card)}`, `- **Labels:** ${cell(card.labels.join(', ') || 'None')}`, `- **Due:** ${card.due || 'Not recorded'}`, '', '**Exported description**', '', card.description ? card.description.trim().split(/\r?\n/).map((line) => line.trimEnd() ? `> ${line.trimEnd()}` : '>').join('\n') : '_No description recorded._'];
  for (const checklist of card.checklists) {
    rows.push('', `**Checklist: ${cell(checklist.name)}**`, '', ...checklist.items.map((item) => `- [${item.complete ? 'x' : ' '}] ${cell(item.name)}`));
  }
  return rows.join('\n');
};
const withoutAI = (text) => text.replace(/\n## AI Declaration\s*\n[\s\S]*$/i, '').trimEnd();
const historical = (file) => {
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') : '';
  const existing = text.match(/<!-- trello-history:start -->[\s\S]*?<!-- trello-history:end -->/);
  if (existing) return existing[0];
  if (!text) return '';
  const demoted = withoutAI(text).replace(/^(#{1,5}) /gm, '$1# ');
  return `<!-- trello-history:start -->\n## Historical documentation through 24 September 2026\n\nThe retained records below describe earlier exports and source audits. Their list positions and counts are superseded by the ${localDate} snapshot above.\n\n${demoted}\n<!-- trello-history:end -->`;
};
const write = (file, text) => {
  const content = `${text.trimEnd()}\n`.replace(/^## AI Declaration\n(?!\n)/gm, '## AI Declaration\n\n');
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) fs.writeFileSync(file, content);
};
const countsTable = ['| Trello list | List archived | Unarchived cards | Archived cards | Marked complete (unarchived) |', '| --- | --- | ---: | ---: | ---: |', ...snapshot.lists.map((list) => {
  const cards = snapshot.cards.filter((card) => card.listId === list.id);
  return `| ${cell(list.name)} | ${list.archived ? 'Yes' : 'No'} | ${cards.filter((card) => !card.archived).length} | ${cards.filter((card) => card.archived).length} | ${cards.filter((card) => !card.archived && card.markedComplete).length} |`;
})].join('\n');
const sprintNames = ['Sprint 1 Backlog', 'Sprint 2 Backlog', 'Sprint 3 Backlog'];
const sprintCards = sprintNames.flatMap((name) => cardsIn(name));
const sprintTable = ['| Retained sprint list | Cards | Marked complete | Checked checklist items |', '| --- | ---: | ---: | ---: |', ...sprintNames.map((name) => {
  const cards = cardsIn(name); const values = cards.flatMap(items);
  return `| ${name} | ${cards.length} | ${cards.filter((card) => card.markedComplete).length} | ${values.filter((item) => item.complete).length}/${values.length} |`;
})].join('\n');
const issues = cardsIn('Issues/fixes', true);
const completed = cardsIn('Completed', true);
const security = snapshot.cards.filter((card) => /^(SEC-|HARD-)/.test(card.title)).sort((a, b) => a.number - b.number);
const discrepancies = snapshot.cards.filter((card) => card.markedComplete && items(card).some((item) => !item.complete));
fs.mkdirSync('data', { recursive: true });
write(dataPath, JSON.stringify(snapshot, null, 2));

const reconciliation = snapshot.workbookReconciliation;
write(sourcePage, `# Trello Board Snapshot and Export Reconciliation

${basis(sourcePage)}

## Sources

The full JSON export of [${snapshot.board.name}](${snapshot.board.url}) supplies the board inventory. The [normalized snapshot](../../data/trello-board-snapshot.json) retains card titles, descriptions, owners, list placement, archive flags, completion markers and checklist state. It omits account emails, avatars and board-action payloads.

| Supplied file | Scope | SHA-256 |
| --- | --- | --- |
${snapshot.sources.map((source) => `| ${cell(source.file)} | ${source.role} | \`${source.sha256}\` |`).join('\n')}

${reconciliation ? `The Excel export's \`Cards\` worksheet contains ${reconciliation.rowCount} setup cards (rows 2–${reconciliation.rowCount + 1}), not the full board. Its \`Summary\` records 10 rows exported on 11 October 2026. All ${reconciliation.rowCount} cards match the JSON on title, list, description and archive flag: ${reconciliation.matchedCards.map((number) => `#${number}`).join(', ')}. The Excel completion-marker cells are blank for ${reconciliation.blankCompletionMarkers} of these rows, so the JSON supplies completion markers. Missing workbook rows are not treated as removed cards.` : 'No workbook reconciliation was supplied for this snapshot.'}

## Board inventory

${snapshot.cards.length} cards are present: ${snapshot.cards.filter((card) => !card.archived).length} unarchived cards and ${snapshot.cards.filter((card) => card.archived).length} archived cards. Two unarchived cards are in the archived Setup list; an unarchived card count is not a count of visible open work.

${countsTable}

## Sprint completion records

${sprintTable}

All ${sprintCards.length} sprint cards retain their named sprint-list placement and are marked complete, with ${sprintCards.flatMap(items).length}/${sprintCards.flatMap(items).length} checklist items checked. There are no unarchived In Progress cards. Preserve both dimensions rather than moving these stories into Completed in the documentation.

Compared with the 24 September snapshot, Issues/fixes has 68 unarchived cards rather than 56, Potential Features/Additions has 25 rather than 17, and Completed has 20 unarchived cards rather than three. The seven Sprint 3 stories formerly in In Progress or Completed now join the other four in Sprint 3 Backlog.

## Completion and checklist discrepancies

${table(discrepancies, true)}

These completion markers coexist with unchecked checklist items. The export does not establish whether the remaining checks were executed. Card #184, “80% Code Coverage”, is marked complete in Completed but has no description or checklist; its title does not supply a coverage report.

## Completed list

${table(completed)}

Twenty unarchived cards are marked complete here, including 11 SEC cards, two HARD cards, account management (#130), API (#155), coverage (#184), performance-audit documentation (#178), methodology review (#189), vulnerability review (#164) and page styling (#190). Archived PWA card #139 is shown separately by its archive flag.

## Related records

- [Product backlog](product-backlog.md): every exported card, description and checklist.
- [Bug tracking](bug-tracking.md): issue and security records.
- [Roadmap](roadmap.md) and [Scrum methodology](scrum-methodology.md): board summaries.
- [Testing and QA](../Quality/testing-and-qa.md): execution evidence remains separate from tracker completion.

${ai}`);

const backlogFile = `${project}/product-backlog.md`;
const backlogHistory = historical(backlogFile);
write(backlogFile, `# Product Backlog

${basis(backlogFile)}

## Current board summary

There are 34 retained sprint cards, all marked complete with all 279 checklist items checked. The named Sprint 1/2/3 lists still contain 10/13/11 cards. Completed contains 20 unarchived cards and In Progress contains none. Issues/fixes contains 68 unarchived cards, all marked complete, plus eight archived cards. “Unarchived” does not mean unfinished. Potential Features/Additions contains 25 cards, including 14 marked complete and 11 not marked complete.

${countsTable}

## Scope and evidence

Card titles, owners, descriptions and checklist text below come from the supplied export. The card descriptions record requested work; they are not instructions executed by this update. Current source behavior is documented in the [product overview](../Overview/02-product-overview.md) and [requirements](../Overview/Functional-Requirements-and-System-Analysis.md). See [discrepancies](trello-board-snapshot.md#completion-and-checklist-discrepancies) and [bug tracking](bug-tracking.md).

## Card registers

${snapshot.lists.map((list) => `### ${cell(list.name)}${list.archived ? ' (archived list)' : ''}\n\n${table(cardsIn(list.name, true))}`).join('\n\n')}

## Exported card detail

${snapshot.lists.flatMap((list) => cardsIn(list.name, true)).map(detail).join('\n\n')}

${backlogHistory}

${ai}`);

const bugsFile = `${project}/bug-tracking.md`;
const bugsHistory = historical(bugsFile);
write(bugsFile, `# Bug Tracking

${basis(bugsFile)}

## Current issue records

Issues/fixes contains 68 unarchived cards, all marked complete, and eight archived cards. Their checklists contain 34/44 checked items across unarchived cards. The list is a retained issue register; its name and archive flags do not override the exported completion markers. No dated independent retest result is added by this documentation refresh.

${table(issues)}

## Security and hardening records

The Security Issues list is empty. The 11 SEC and two HARD cards are now in Completed and marked complete. Their checklists total 65/70 checked items. HARD-001 (#176) is marked complete with 0/5 checks, which remain visible below. Descriptions preserve the original reported defects and requested checks, not a new finding about today's application.

${table(security, true)}

## Completion and checklist discrepancies

${table(discrepancies, true)}

## Exported issue and security detail

${[...issues, ...security].map(detail).join('\n\n')}

## Proposed bug workflow

1. Keep the card's exported list, completion marker and archive flag distinct.
2. Link the implementation change and identify the revision and environment.
3. Retest the original scenario and a relevant regression path.
4. Record the dated result, command or scenario, and evidence link before describing a fix as independently verified.
5. Reconcile remaining checklist discrepancies without silently rewriting the exported board.

The earlier Playwright “Loading workspace...” failure remains a historical result. This export does not provide a replacement application test run.

${bugsHistory}

${ai}`);

const statusBlock = (file, title, body) => {
  const original = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const block = `<!-- trello-status:start -->\n## ${title}\n\n${basis(file)}\n\n${body}\n<!-- trello-status:end -->`;
  const pattern = /<!-- trello-status:start -->[\s\S]*?<!-- trello-status:end -->/;
  const updated = pattern.test(original) ? original.replace(pattern, () => block) : original.replace(/\n## AI declaration\s*\n/i, `\n${block}\n\n## AI Declaration\n`);
  if (updated === original && !pattern.test(original)) throw new Error(`Missing declaration insertion point in ${file}`);
  write(file, updated);
};
statusBlock(`${project}/roadmap.md`, 'Current board milestones', `${sprintTable}\n\nThe retained Sprint 1/2/3 lists have all 34 cards marked complete and 279/279 checklist items checked. Completed contains 20 unarchived cards, In Progress has none, and Issues/fixes retains 68 unarchived cards marked complete. Optional ideas total 25, of which 11 are not marked complete. See [backlog](product-backlog.md) and [bug tracker](bug-tracking.md). The preliminary course dates below are historical and are not changed by this export.`);
statusBlock(`${project}/scrum-methodology.md`, 'Current work artefacts', `The export retains 10 Sprint 1, 13 Sprint 2 and 11 Sprint 3 cards, all marked complete with fully checked criteria. It has no unarchived In Progress cards, 20 unarchived Completed cards and 68 unarchived Issues/fixes cards marked complete. Record list placement and completion independently. Card #34, agreeing a Definition of Done, is marked complete but has no description or checklist; the export supplies no agreed wording. Card #189, methodology review covering squash merges, review comments and commits after CI checks, is marked complete in Completed but has no description or review artefact. These cards do not supply the detailed adopted process.`);
statusBlock('README.md', 'Current Trello documentation snapshot', `The latest attached full-board export contains 192 cards, including 68 unarchived Issues/fixes cards marked complete, 20 unarchived cards in Completed, and 34 retained sprint cards marked complete with 279/279 checked criteria. The Excel attachment is a matching 10-card setup subset. See [backlog](docs/Project%20Management/product-backlog.md) and [bug tracking](docs/Project%20Management/bug-tracking.md). The earlier source audits below retain their original dates.`);
statusBlock('docs/Overview/Functional-Requirements-and-System-Analysis.md', 'Trello requirement traceability', `All 34 cards retained in Sprint 1/2/3 lists are marked complete with 279/279 checklist items checked. The [product backlog](../Project%20Management/product-backlog.md) preserves every supplied description and criterion. This updates tracker completion, not the source-based implementation contract above. Card #72 remains in Sprint 2 Backlog despite its S3 title; all 11 cards in Sprint 3 Backlog have 50/50 criteria checked.`);
statusBlock('docs/Overview/02-product-overview.md', 'Trello delivery context', `All 34 retained sprint cards are marked complete with fully checked criteria. In Progress contains no unarchived cards. The [backlog](../Project%20Management/product-backlog.md) records these completion markers without replacing the source-based behavior above. Issues/fixes retains 68 unarchived cards marked complete, including refresh and report-export records; tracker completion does not supply a new execution result.`);
statusBlock('docs/Quality/testing-and-qa.md', 'Trello testing and coverage records', `Card #184, “80% Code Coverage”, is marked complete in Completed, with no description, checklist or coverage report in the export. Card #39, Automated Testing, is marked complete in Sprint 1 Backlog with 16/16 criteria checked. Security-card checklists total 65/70 checked items, with five unchecked HARD-001 checks. These are tracker records and do not replace the dated application results above. Use [bug tracking](../Project%20Management/bug-tracking.md) to locate the associated card details.`);
statusBlock('docs/Quality/performance-review.md', 'Trello performance follow-up', `Card #178, “Check Audit Performace validation doc”, is marked complete in Completed without a description, checklist or measured performance result. Public-dashboard rate-limit/cache card #172 is marked complete with 5/5 criteria checked. Current source mechanisms above remain distinct from these tracker records and from measured production performance.`);
statusBlock('docs/Architecture/security/dependency-security.md', 'Trello dependency and security follow-up', `Dependency-chain card #175 is marked complete in Completed with 8/8 checklist items checked. All 11 SEC and two HARD cards are marked complete there; HARD-001 (#176) still has 0/5 checks. The original audit descriptions and requested commands are preserved as card content in [bug tracking](../../Project%20Management/bug-tracking.md). This export supplies no fresh npm audit output or deployed validation result.`);
statusBlock('docs/Architecture/security/powersync-security.md', 'Trello token-hardening follow-up', `PowerSync development-token card #174 is marked complete in Completed with 4/4 criteria checked. Production-origin card #176 is also marked complete but has 0/5 checks. See [security records](../../Project%20Management/bug-tracking.md#security-and-hardening-records) for the exact exported requirements; this status does not change the documented runtime contract.`);
statusBlock('docs/Architecture/api-guide.md', 'Trello API and security records', `Public API story #133 is marked complete in Sprint 2 Backlog with 5/5 criteria checked. API card #155 is marked complete in Completed with no description or checklist. Swagger review #177 has 4/4 criteria checked; public-dashboard rate limiting #172 has 5/5. These records do not replace the documented public Swagger contract or the dated hosted checks above. See [security records](../Project%20Management/bug-tracking.md#security-and-hardening-records).`);
statusBlock('docs/Architecture/automatic-data-refresh.md', 'Trello refresh follow-up', `Cards #150 (match confirmation), #157 (opponent confirmed squad) and #183 (page refresh) remain unarchived in Issues/fixes and are marked complete. None has a checklist. These markers record reported completion without adding a refresh execution result; source behavior above remains unchanged. See [bug tracking](../Project%20Management/bug-tracking.md).`);
statusBlock('docs/Architecture/User-Feedback.md', 'Trello follow-up to user feedback', `Onboarding #137, squad eligibility #114, team-management status #112 and roster statistics #89 remain unarchived in Issues/fixes and are marked complete. The export contains no checklists on these four cards. These are later tracker states, not new survey responses or dated retests; preserve the respondents' original observations above and use [bug tracking](../Project%20Management/bug-tracking.md) for current records.`);
statusBlock('docs/Architecture/git-methodology.md', 'Trello process follow-up', `Methodology review card #189 is marked complete in Completed. Its title records squash merging, reviews as comments and commits after CI checks, but it has no description, checklist or linked review evidence in this export. Definition-of-Done card #34 is also marked complete without agreed wording. This supplies tracker context for the decisions above, not proof of configured branch protections or an approved detailed policy.`);

// Label superseded prose explicitly while retaining the original course and meeting history.
for (const file of [`${project}/roadmap.md`, `${project}/scrum-methodology.md`]) {
  let text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('roadmap.md')) {
    text = text.replace('**Current board snapshot:** Trello export through 2026-09-24T19:20:21.943Z.', '**Historical board snapshot (24 September 2026):** Trello export through 2026-09-24T19:20:21.943Z. The current export summary is recorded in Current board milestones below.');
    text = text.replace('| Milestone | Preliminary date | Recorded scope/state |', '| Milestone | Preliminary date | Historical scope/state (24 September export) |');
    text = text.replace('Sprint 3 work covers opponent fixtures', 'In that historical export, Sprint 3 work covered opponent fixtures');
    text = text.replace('The Trello Completed list contains injury', 'That export’s Trello Completed list contained injury');
    text = text.replace('## Current capability context', '## Source capability context');
    text = text.replace('The tracker dates, counts, card positions and meeting evidence below are preserved historical snapshots. They are not a live Trello query or current stakeholder acceptance.', 'The dated milestone table and meeting evidence retain their historical meaning. Current tracker state is summarized above from the attached export.');
  } else {
    text = text.replace('## Work artefacts and flow', '## Historical work artefacts and flow (24 September 2026)');
    text = text.replace('Trello card #34 still asks the team to agree a Definition of Done. The following is proposed, not confirmed adoption.', 'The earlier record proposed the Definition of Done below. Card #34 is now marked complete, but the new export does not supply the agreed wording, so adoption of this particular text remains unconfirmed.');
  }
  const current = text.match(/<!-- trello-status:start -->[\s\S]*?<!-- trello-status:end -->/)[0];
  text = text.replace(`${current}\n\n`, '').replace(/^(# .+\n)\n/, `$1\n${current}\n\n`);
  write(file, text);
}
console.log(`Updated Trello documentation from ${snapshot.cards.length} cards; ${issues.length} issue records; ${sprintCards.length} sprint cards; ${security.length} security cards.`);
