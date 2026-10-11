# PowerSync authentication and access

## Backend-issued client tokens

Clients authenticate to `GET /sync/token` with their Better Auth session. The backend issues a five-minute JWT whose audience is the configured `POWERSYNC_URL`, with authenticated user, resolved team/role and two-sided feature claims. Missing endpoint, signer or key ID returns 503. `GET /sync/jwks` supplies public RSA verification keys when configured; it does not provide private signing material.

Use `POWERSYNC_PRIVATE_KEY` and `POWERSYNC_KID` with trusted JWKS for production. Source also supports `POWERSYNC_SHARED_SECRET` for an HS256 development signer; its existence is not a production recommendation. Keep credentials server-side. The service must trust the intended signer and audience, and tokens must be refreshed as they expire.

## Authorized reads and writes

PowerSync rules select data using authenticated identity and current team membership. Shared streams also require the two-sided claim and actual session participation. Public opponent lineup/geometry/timeline projections do not grant access to private game plans, notes, injuries or roster identifiers. The backend independently checks membership, role, exact fixture/session identity and report locks for every upload. A signed replication token is not permission to mutate arbitrary rows.

## Production signing trust

Both tracked service templates set `client_auth.allow_temporary_tokens: false`. Production must disable temporary/development tokens on its effective instance and trust only approved production signers. Changing a template does not change a running instance. The main template still contains inline development signing trust; it must be excluded from production configuration. Keep any local signing key or temporary-token convenience isolated to a separate non-production instance and database.

**Configuration limit:** this documentation review did not inspect the effective hosted endpoint, its applied authentication settings or operator membership. The template alone does not establish that production is hardened. Identify the effective endpoint from the production backend's `POWERSYNC_URL`, rather than an instance name, before verifying applied trust.

## Operators and key rotation

Application coach/admin roles do not control PowerSync dashboard or CLI permissions. Maintain an approved list of production operators, minimize broad owner/deployer access, review all assigned roles and invitations, and revoke unused personal/automation credentials. Separate development access from production. Production temporary-token generation must stay disabled even for operators.

Publish a new public key before changing the private signer, allow overlap beyond the five-minute token lifetime, and retire old trust after legitimate clients refresh. See the [operations runbook](../operations/offline-operations-runbook.md) for rotation and recovery, and [authorization](../contracts-and-authorization.md) for role boundaries.

Sources: [backend/src/sync/sync.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync.controller.ts), [backend/src/sync/sync-jwks.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync-jwks.controller.ts), [powersync/sync-config.yaml](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/powersync/sync-config.yaml), [powersync/service.yaml](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/powersync/service.yaml), [powersync-recovery/service.yaml](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/powersync-recovery/service.yaml).

<!-- trello-status:start -->
## Trello token-hardening follow-up

**Board snapshot: 11 October 2026.** Latest recorded action: `2026-10-11T21:28:12.474Z` (UTC). See [export sources and reconciliation](../../Project Management/trello-board-snapshot.md). List placement, the card completion marker (Trello `dueComplete`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.

PowerSync development-token card #174 is marked complete in Completed with 4/4 criteria checked. Production-origin card #176 is also marked complete but has 0/5 checks. See [security records](../../Project%20Management/bug-tracking.md#security-and-hardening-records) for the exact exported requirements; this status does not change the documented runtime contract.
<!-- trello-status:end -->

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
