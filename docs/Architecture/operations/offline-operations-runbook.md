# Offline Collaboration Runbook

This guide describes prerequisites and recovery procedures for the browser queue, authenticated upload, reconciliation and PowerSync replication. It does not establish which migrations or configuration are installed on a hosted service. Telemetry carries queue counts and timings, not match-event payloads.

## Deployment prerequisites and compatibility

Back up the target database and retain the active frontend/backend/sync-rule versions before an operational release. Use the application's journal-aware `backend/scripts/migrate.mjs` (`db:migrate`) and the full ordered migration journal, not a single old hardening migration. The migration planner recognizes recorded content hashes, including line-ending equivalents, without rewriting historical records merely because merged journal timestamps moved.

Current requirements include the shared-session foundations and migrations through `0067_single_coach_competition_reports.sql`: `0057` report approvals/amendments; `0058` duplicate lifecycle; `0059` manual unknown-player candidates; `0060` end/resume; `0061` roster identity comparison; `0062` auth rate limits; `0063` scheduling timezone; `0064` friendly formats; `0065`/`0066` competition archive/hide and settings guard; `0067` single-coach competition publication. Earlier journal prerequisites remain necessary. Schema declarations alone do not install SQL functions/triggers.

Configure the replication publication/grants with the source's `db:configure:powersync` tool after reviewing its target. Apply compatible `powersync/sync-config.yaml` rules and the intended signing trust; deploy a compatible backend before the dependent frontend. Logical replication, publication tables, participant membership and signing audience must agree. See [schema](../data/database-schema.md) and [signing/access policy](../security/powersync-security.md).

## Rollout controls

| Setting | Behavior |
| --- | --- |
| `TWO_SIDED_LIVE_LOGGING_ENABLED=true` | Enables shared-session logging and the token claim used by shared subscriptions. |
| `OFFLINE_SYNC_ENABLED=false` | Uploads return dependency-pending without deleting local work. |
| `OFFLINE_SYNC_MATCH_IDS=id1,id2` | Enables uploads for listed matches; empty/unset enables all matches. |
| `VITE_DEPLOYMENT_ENV` | Separates local queue deployment scope; preserve account/deployment identity during recovery. |
| `OPERATIONS_HEALTH_TOKEN` | Dedicated bearer credential for `/health/operations`. |

Use the upload allowlist to control exposure while keeping queue and receipt compatibility. Do not turn off `/sync/upload` while devices may hold queued work. Turning off the two-sided flag does not safely convert an already enrolled shared fixture to a legacy sheet; writes to that identity can be rejected.

## Fixture and health monitoring

`GET /events/:eventId/link-diagnostic` is a read-only member-scoped diagnostic. It returns fixture/session IDs, participant IDs/sides and linked sheet IDs; manual/unlinked events report `status: "unlinked"`. It exposes no lineup, tactics or notes, and unrelated teams receive 404. Both linked sheets must identify the same exact fixture/session with complementary sides. Do not use the endpoint to relink history.

The protected operations health endpoint reports queue age, rejection ratios, reconciliation timings, open reviews and replication/WAL indicators. The repository's `offline-sync-health.yml` uses `OPERATIONS_HEALTH_URL` and `OPERATIONS_HEALTH_TOKEN` and schedules checks every five minutes; its presence does not prove a live monitor is running.

Investigate actively reporting devices whose oldest pending item exceeds 15 minutes, rejected uploads above 1% over 24 hours, p95 processing over two seconds, sustained review growth over 30 minutes, and missing in-match telemetry over 15 minutes. Dormant queues remain visible as `stale_pending_devices`/`stale_pending_items`; the pending-age check considers devices reporting within the last 15 minutes. Replication lag, slot activity and retained WAL may be null when the application role cannot inspect slots. Use provider monitoring for those metrics and the deployment's WAL limit.

## Recover unsent work

1. Distinguish waiting/dependency-pending, rejected and access-blocked items from accepted receipts and replicated state.
2. Export unsent observations to recovery JSON before clearing storage, reinstalling or resetting a device. Restore only to the original account/deployment scope.
3. Restore a missing causal parent or enable the relevant rollout scope, then retry the unchanged ID and payload. A response lost after commit is safe to retry.
4. Inspect `safe_error_code` for rejection. Changed content/user with the same ID is `ID_REUSED`; do not manually rewrite immutable observations.
5. For revoked membership, retain the export or restore legitimate membership. Cached data is not authorization; do not import as another user.
6. Confirm receipts and authoritative projection/session convergence separately from peer replication. A healthy upload connection alone is insufficient.

## Recover replication and WAL

Confirm database connectivity and logical replication, publication membership/grants, the PowerSync source connection and checkpoint. Restore an inactive consumer before altering database slots. Pause expansion of rollout if WAL approaches the provider limit; restore the consumer and involve the provider. Dropping/recreating a slot or publication can require a resnapshot and must be assessed with pending-client exports preserved. Never delete evidence or local queues to make monitoring green.

## Signing-key rotation

Publish the new trusted public JWKS key before changing the backend private signer and `POWERSYNC_KID`. Retain old verification trust longer than the five-minute client token lifetime, then remove it. Keep `/sync/jwks`, `/sync/token` audience/endpoint and service trust compatible during overlap; do not expose private keys or tokens in recovery records.

## Safe updates and rollback

Keep local SQLite additions and upload contracts backward-compatible. With pending work, the service worker holds the update and displays a prompt. Drain or export work before updating devices, then reconcile clock/projection revisions. Roll back UI independently when possible; retain schema/functions, stable IDs, receipts and upload support required by queued older clients. A browser reset is a data-loss operation, not a rollback procedure.

## Result amendments

Before shared finalisation a coach can withdraw a pending confirmation and review changed revisions. A published shared result cannot be reopened directly. Propose `add`, `correct` or `void` with a reason and expected session revision; the applicable coach approvals govern acceptance. Rejection, requested changes, withdrawal and stale proposals leave the published result intact. Only an accepted amendment changes the result and related projections/fixture standings. A confirmed report cannot resume play through the end/resume control.

See [collaboration lifecycle](../offline-collaboration.md), [contracts and permissions](../contracts-and-authorization.md) and [refresh](../automatic-data-refresh.md).

Sources: [backend/scripts/migrate.mjs](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/scripts/migrate.mjs), [backend/drizzle/meta/_journal.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/drizzle/meta/_journal.json), [backend/src/sync/sync.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync.controller.ts), [backend/src/matches/matches.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/matches/matches.service.ts), [backend/scripts/check-offline-health.mjs](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/scripts/check-offline-health.mjs).

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
