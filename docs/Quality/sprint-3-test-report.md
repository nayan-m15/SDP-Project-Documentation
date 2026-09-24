# Sprint 3 test record

**Audit date:** 24 September 2026. **Application commit:** `ef2880ad0018536c2b933754148e285b2a325ec7`. The current checkout contains backend unit/integration tests, domain tests, Playwright UI and PWA specs. Presence of test files does not establish a pass.

| Evidence | Observation | Limit |
| --- | --- | --- |
| Supplied Playwright failure artifact, `main-flow.spec.ts` | `getByRole('heading', { name: 'Dashboard' })` was not visible after 15 seconds; captured page text was `Loading workspace...`. | Root cause and whether other tests passed are unknown. This run is a failure. |
| `backend/test/offline-sync.e2e-spec.ts`, `backend/test/injuries.e2e-spec.ts`, `backend/test/competitions.e2e-spec.ts` | Test source exists. | No dated passing execution result recorded by this audit. |
| `e2e/offline-event-logging.spec.ts`, `e2e/pwa-production.spec.ts`, `e2e/injury-recovery.spec.ts` | Browser specs exist. | No dated passing execution result recorded by this audit. |
| Physical Android/iOS offline field test | Checklist in application `docs/offline-field-test.md`. | Checklist is not a completed field run. |

Before claiming a pass, record the exact command, commit, environment, isolated database, date, totals, failure artifacts and CI run URL. Keep CI configuration, deployment verification and stakeholder acceptance distinct. [Testing and QA](testing-and-qa.md) gives the commands.
