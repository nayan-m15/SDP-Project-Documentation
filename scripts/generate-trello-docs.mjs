import fs from 'node:fs';
import path from 'node:path';

const exportPath = process.argv[2];
if (!exportPath) {
  console.error('Usage: node scripts/generate-trello-docs.mjs <trello-export.json>');
  process.exit(1);
}

const board = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
const lists = new Map(board.lists.map((list) => [list.id, list]));
const members = new Map(board.members.map((member) => [member.id, member.fullName]));
const checklists = new Map((board.checklists || []).map((list) => [list.id, list]));
const snapshot = '14 September 2026';
const sourceCommit = 'e7285f533b854c4da753c73e22a2a38f580588dc';

const selectedCards = (listName, includeArchived = true) => board.cards
  .filter((card) => lists.get(card.idList)?.name === listName && (includeArchived || !card.closed))
  .sort((a, b) => a.pos - b.pos);

const owners = (card) => card.idMembers.length
  ? card.idMembers.map((id) => members.get(id) || `Unknown member ${id}`).join(', ')
  : 'Unassigned';

const cardChecklists = (card) => card.idChecklists
  .map((id) => checklists.get(id))
  .filter(Boolean);

const progress = (card) => {
  const items = cardChecklists(card).flatMap((list) => list.checkItems || []);
  return items.length
    ? `${items.filter((item) => item.state === 'complete').length}/${items.length}`
    : 'No checklist';
};

const escapeCell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
const cleanDescription = (value) => value?.trim() || '_No description or user story recorded in the export._';
const checked = (state) => state === 'complete' ? '[x]' : '[ ]';

const evidence = new Map([
  [35, '[Authentication source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/auth)'],
  [36, '[Athletes source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/athletes)'],
  [37, '[Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events)'],
  [38, '[Dashboard source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/dashboard)'],
  [39, '[Testing guide](../Quality/testing-and-qa.md)'],
  [40, '[Documentation repository](https://github.com/nayan-m15/SDP-Project-Documentation)'],
  [44, '[Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)'],
  [52, '[Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)'],
  [53, '[Profile source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/profile)'],
  [54, '[Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)'],
  [66, '[Team access source](https://github.com/nayan-m15/Gaffer/blob/development/backend/src/common/team-access.ts)'],
  [67, '[Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches)'],
  [68, '[Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches)'],
  [69, '[Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)'],
  [70, '[Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)'],
  [71, '[Seasons source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/seasons)'],
  [72, '[Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)'],
  [74, '[Player and RSVP source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/player)'],
  [75, '[Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events)'],
  [76, '[Weather source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/weather)'],
  [77, '[Reminder UI source](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/features/reminders)'],
  [128, '[Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)'],
  [133, '[Public API source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/public-api)']
]);

const pbMap = new Map([
  [35, 'PB-01'], [36, 'PB-02'], [37, 'PB-03'], [38, '—'], [39, '—'], [40, '—'],
  [44, '—'], [52, '—'], [53, 'PB-05'], [54, '—'], [66, 'PB-06'], [67, 'PB-07'],
  [68, 'PB-08'], [69, 'PB-09'], [70, 'PB-10'], [71, 'PB-11'], [72, 'PB-12'],
  [73, 'PB-13'], [74, 'PB-14'], [75, 'PB-15'], [76, 'PB-16'], [77, 'PB-17'],
  [78, 'PB-18'], [79, 'PB-19'], [80, 'PB-20'], [81, 'PB-21'], [82, 'PB-22'],
  [83, 'PB-23'], [84, 'PB-24'], [85, 'PB-25'], [86, 'PB-26'], [133, '—']
]);

function detail(card, includeList = true) {
  const listName = lists.get(card.idList)?.name || 'Unknown';
  const lines = [
    `### [#${card.idShort} — ${card.name}](${card.url})`,
    '',
    `- **Current list:** ${listName}`,
    `- **Owner(s):** ${owners(card)}`,
    `- **Archived:** ${card.closed ? 'Yes' : 'No'}`,
    `- **Historical PB mapping:** ${pbMap.get(card.idShort) || '—'}`,
    `- **Exported checklist progress:** ${progress(card)}`,
    `- **Implementation/evidence:** ${evidence.get(card.idShort) || 'No card-specific repository evidence mapped in this audit.'}`,
    '',
    '**Exported description/user story**',
    '',
    cleanDescription(card.desc),
    '',
    '**Exported checklist state**',
    ''
  ];
  const listsForCard = cardChecklists(card);
  if (!listsForCard.length) lines.push('_No checklist recorded in the export._', '');
  for (const list of listsForCard) {
    lines.push(`_${list.name || 'Checklist'}_`, '');
    if (!(list.checkItems || []).length) lines.push('_No checklist items._', '');
    for (const item of list.checkItems || []) lines.push(`- ${checked(item.state)} ${item.name}`);
    lines.push('');
  }
  return lines.join('\n');
}

const backlogLists = ['Sprint 1 Backlog', 'Completed', 'Backlog'];
const backlogCards = backlogLists.flatMap((name) => selectedCards(name, false));
let backlog = `# Product Backlog\n\n`;
backlog += `> **Snapshot:** ${snapshot}. Source: Trello board export with activity through 2026-09-14T11:49:45.592Z. Trello is authoritative for list, assignment, archive and checklist state; application source at \`${sourceCommit}\` is authoritative for implementation. A checked Trello item is recorded board state, not independent acceptance or stakeholder approval.\n\n`;
backlog += `## Snapshot counts\n\n| List | Active cards |\n| --- | ---: |\n`;
for (const name of backlogLists) backlog += `| ${name} | ${selectedCards(name, false).length} |\n`;
backlog += `\nCards below preserve Trello list and card order. Trello card numbers are canonical; historical PB identifiers are secondary traceability only.\n\n`;
backlog += `## Register\n\n| Card | Current list | Owner(s) | Archived | Checklist | Historical PB | Implementation/evidence |\n| --- | --- | --- | --- | ---: | --- | --- |\n`;
for (const card of backlogCards) {
  backlog += `| [#${card.idShort} — ${escapeCell(card.name)}](${card.url}) | ${lists.get(card.idList).name} | ${escapeCell(owners(card))} | No | ${progress(card)} | ${pbMap.get(card.idShort) || '—'} | ${evidence.get(card.idShort) || 'Not mapped'} |\n`;
}
for (const name of backlogLists) {
  backlog += `\n## ${name}\n\n`;
  backlog += selectedCards(name, false).map((card) => detail(card)).join('\n');
}
fs.writeFileSync(path.join('docs', 'Project Management', 'product-backlog.md'), `${backlog.trimEnd()}\n`);

const completed = selectedCards('Completed', false);
let delivery = `# Sprint 2 Delivery Record\n\n`;
delivery += `> **Snapshot:** ${snapshot}. Trello records **${completed.length} active cards in Completed**, zero in Sprint 2 Backlog and zero active in In Progress. This is current board state, not proof of the original Sprint 2 commitment, independent acceptance, deployment, or stakeholder approval. Application source was inspected at \`${sourceCommit}\`.\n\n`;
delivery += `## Completed register\n\n| Card | Exact owner(s) | Checklist | Source evidence |\n| --- | --- | ---: | --- |\n`;
for (const card of completed) delivery += `| [#${card.idShort} — ${escapeCell(card.name)}](${card.url}) | ${escapeCell(owners(card))} | ${progress(card)} | ${evidence.get(card.idShort) || 'No card-specific mapping'} |\n`;
delivery += `\n## Interpretation notes\n\n- Card #72 is labelled and titled **S3: Performance Comparisons**. Its present location is Completed, but the export does not establish that it was part of the original Sprint 2 commitment.\n- Card #72 has a semantic mismatch: its title says “Performance Comparisons”, while its exported checklist describes competitions and standings. Both are reproduced without rewriting the Trello history.\n- Card #133 records the formations/tactics public API as Completed. Source and tests exist, but all four documented deployed route URLs returned HTTP 404 on 14 September 2026; deployment verification remains pending.\n- Checked items reproduce exported Trello state only. See [Sprint 2 Evidence](sprint-2-evidence.md) and [Testing and QA](../Quality/testing-and-qa.md) for separately classified evidence.\n`;
for (const card of completed) delivery += `\n${detail(card)}\n`;
fs.writeFileSync(path.join('docs', 'Project Management', 'sprint-2-delivery.md'), `${delivery.trimEnd()}\n`);

const issues = selectedCards('Issues/fixes', true);
let bugs = `# Bug Tracking\n\n`;
bugs += `> **Snapshot:** ${snapshot}. The Trello export contains **${issues.filter((card) => !card.closed).length} active and ${issues.filter((card) => card.closed).length} archived** cards in Issues/fixes. Titles below preserve exported spelling. List placement, implementation evidence and verified fix/retest are separate concepts.\n\n`;
bugs += `## Status definitions\n\n- **Current list state:** where Trello places the card and whether it is archived.\n- **Implementation evidence:** related code/configuration found in the application or documentation repository; this does not prove the reported issue is fixed.\n- **Verified fix/retest:** dated reproduction and retest evidence against an identified revision. None is inferred from code presence, checklist state or historical movement through Completed.\n\n`;
bugs += `## Issues/fixes register\n\n| Card | Quoted Trello title | Owner(s) | Current list state | Checklist | Implementation evidence | Verified fix/retest |\n| --- | --- | --- | --- | ---: | --- | --- |\n`;
for (const card of issues) {
  bugs += `| [#${card.idShort}](${card.url}) | “${escapeCell(card.name)}” | ${escapeCell(owners(card))} | ${card.closed ? 'Archived in Issues/fixes' : 'Active in Issues/fixes'} | ${progress(card)} | ${evidence.get(card.idShort) || 'Not assessed card-by-card'} | Not supplied |\n`;
}
bugs += `\n## Exported card detail\n\n`;
for (const card of issues) bugs += `${detail(card)}\n`;
bugs += `\n## Proposed verification workflow\n\n1. Record environment, identified revision and reproducible steps.\n2. Link a reviewed implementation change without changing the Trello title.\n3. Retest the original steps plus a relevant regression path.\n4. Record the exact result and evidence link; only then describe the issue as verified fixed.\n5. Archive or move the Trello card according to the team's agreed workflow.\n`;
fs.writeFileSync(path.join('docs', 'Project Management', 'bug-tracking.md'), `${bugs.trimEnd()}\n`);

console.log(`Generated ${backlogCards.length} backlog cards, ${completed.length} completed cards, and ${issues.length} issue cards.`);
