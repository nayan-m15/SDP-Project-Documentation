# Offline and concurrent match logging

**Source review:** application commit `ef2880ad0018536c2b933754148e285b2a325ec7`, 24 September 2026. This page describes source implementation; production activation and physical-device verification are separate evidence.

The browser stores match-day work locally through `frontend/src/offline/`. Authenticated `GET /sync/token` supplies a short-lived PowerSync token. `POST /sync/upload` accepts observations and operations, processing items separately and returning receipts. The client retries a stable ID and unchanged payload; a reused ID with a changed payload or user is rejected. `POST /sync/telemetry` records queue counts and timing. `GET /sync/jwks` publishes verification keys when configured.

`backend/src/database/schema/index.ts` defines immutable event observations, event memberships and operations, clock operations, review records, projection state, upload receipts and client telemetry. The match service reconciles accepted work and updates projections. A dependency-pending receipt means the item must remain queued; rejected work needs explicit review or export. Role and team checks occur on the server during upload.

Deployment depends on Neon logical replication, the PowerSync publication and `powersync/sync-config.yaml`, backend signing and frontend configuration. `OFFLINE_SYNC_ENABLED` and `OFFLINE_SYNC_MATCH_IDS` stage uploads. Consult the application's `docs/offline-operations-runbook.md` before rollout or recovery. Its field-test checklist is a procedure, not evidence that device testing occurred. Do not clear browser storage or uninstall the PWA while unsent work remains; export it first.

Related source: `backend/src/sync/`, `backend/src/matches/`, `frontend/src/offline/`, `docs/contracts-and-authorization.md`, `docs/offline-collaborative-event-logging-plan.md` and `docs/offline-operations-runbook.md` in the application repository.
