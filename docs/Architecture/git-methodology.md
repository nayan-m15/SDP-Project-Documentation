# Git Methodology and Observed Workflow

## Evidence snapshot

The repositories do not contain a single enforceable workflow policy. Earlier documents conflict: some describe trunk-based work from `main` with squash merges, while the application has both `main` and `development` and its recent first-parent history contains merge commits from feature/fix branches into `development`. At the inspected snapshot, local `development` was one commit ahead of local `main`.

No `.github/workflows` files were found in the application or documentation repository. This means repository-hosted workflow evidence was not available; it does not rule out hosting-provider auto-deployment or externally configured automation. No inspected repository record proves branch protection, required reviews, a universal merge method or release tagging.

## Safe working convention pending confirmation

This is practical guidance, not a claim of team agreement:

1. Confirm the target branch on the tracker or pull request before starting; do not assume `main` or `development`.
2. Use the branch-naming convention below.
3. Keep commits scoped and explain behavioural/test/documentation impact.
4. Open a review request into the confirmed target. Include linked work item, screenshots/API notes as relevant, test commands/results, database impact and known limitations.
5. Choose squash, rebase or merge according to the explicitly confirmed repository policy. Current history shows merge commits and direct single-parent commits, so one method cannot be inferred.
6. Do not claim CI passed when no workflow/run link exists. Record locally run checks accurately.
7. Promote between `development` and `main` only through the team's confirmed release process.

## Branch naming convention

The requested convention is:

```text
<type>/<scope>-<short-description>
```

- `type` describes the change, commonly `feat`, `fix`, `docs`, `test`, `refactor` or `chore`.
- `scope` identifies the affected area; an issue/card number may be used when the work is tied to it.
- `short-description` is lowercase and hyphen-separated.

Preserved examples:

```text
feat/events-live-logging
fix/auth-session-expiry
feat/12-live-logging
docs/backlog-trello-sync
```

Create a branch when the work exceeds a trivial single-line change, or when two or more team members may edit overlapping files concurrently.

## Pull-request description

Every review request should state:

- what changed and why;
- testing performed, including exact commands and limitations;
- the related issue or Trello card;
- AI attribution where applicable.

This is documented policy. Whether a hosting platform enforces it automatically must be demonstrated separately with configuration or run evidence.

## Commit messages

Recent history commonly uses Conventional Commit-style prefixes (`feat`, `fix`, `docs`) with optional scopes. Continue that style where the team agrees, for example:

```text
docs(api): describe cookie authentication and OpenAPI limits
fix(events): reject duplicate opponent shirt numbers
feat(stats): add season comparison filters
```

AI assistance should follow the repository's existing evidence policy and commit trailers. Do not infer a tool/model after the fact.

## Review checklist

- [ ] Correct target/base branch confirmed
- [ ] Scope and acceptance criteria linked
- [ ] No secrets, generated junk or unrelated files
- [ ] Relevant build/lint/test commands and exact results recorded
- [ ] Stateful tests used a disposable database
- [ ] API/schema/migration and deployment impact explained
- [ ] Documentation and screenshots updated where behaviour changed
- [ ] Accessibility/security/team-isolation risks reviewed
- [ ] Merge method follows an explicit current decision

## Team decisions still required

- Is day-to-day integration into `development`, direct to `main`, or conditional by change type?
- Which merge methods are allowed, and when?
- What reviews/checks/branch protections are mandatory?
- Which system is authoritative for backlog/bugs: Trello, Gitea, GitHub, or another tracker?
- What promotion/tag/release/deployment evidence must be retained?

Until those answers are recorded, documentation should describe observed history and link actual pull requests/runs rather than presenting a proposed policy as fact.
