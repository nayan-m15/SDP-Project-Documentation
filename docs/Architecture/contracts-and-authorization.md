# Contracts and authorization

Backend **Zod request schemas** are canonical for bodies and query parameters validated with `zodValidate`. UUID route parameters use `ParseUUIDPipe`. The hidden/archive controllers explicitly validate their boolean body fields. Frontend request types and form constraints mirror these contracts; persistence and response types derive from Drizzle and service projections. Swagger metadata describes only the anonymous public API and does not replace runtime validation.

## Team scope and roles

The server resolves a caller's team from the authenticated session. A supplied resource ID identifies a resource to check, not permission to use another team's data. Controllers use `requireTeamId` for member access and `requireCoachTeamId` for managed-resource mutations; services scope queries and enforce state constraints. Frontend route guards and hidden buttons do not grant or enforce server authorization.

| Operation | Claimed player | Assistant | Coach |
| --- | --- | --- | --- |
| Player hub, schedule, RSVP | Own claimed athlete scope | Team experience | Team experience |
| Roster, events, game plans, statistics reads | Player-facing projections only | Own team | Own team |
| Capture match events, clock controls and finish | No | Yes | Yes |
| Amend/delete events, resolve/dispute reviews, resume, approve reports and amendments | No | No | Participating/owning coach, with state checks |
| Injury reads and new injury reports | No team injury API access | Yes | Yes |
| Injury amendment, closure, timeline entry and deletion | No | No | Yes |
| Roster, calendar, lineup, game-plan and season mutations | No | No | Yes |
| Assistant invitations | No | No | Own team |
| Profile and account actions | Own account | Own account | Own account |

Assistants can log a match and report an injury they observe. They cannot amend the clinical record or mutate other managed resources. Public events for either side are allowed in a linked shared session; private injuries remain on the originating sheet. Coach-only review/approval checks still apply after an offline queue reconnects. See [offline collaboration](offline-collaboration.md).

## Competition permissions

Competition administration is separate from team role. A coach creates a shared league/cup and becomes its `adminUserId`. That user manages settings, participant slots, invitations, fixture generation, manual results, deletion and global archive/restore. Administrative lookup deliberately returns 404 when the caller is not its administrator. Most mutations return a conflict for archived competitions until restored.

Signed-in users can search and read competition details without gaining membership. A participant can hide/unhide the competition for **their own user**; a nonparticipant is denied. This personal preference does not archive it for anyone else. Archive is global, administrator-only, and rejects an in-progress fixture.

For fixture scheduling, a linked team's coach accepts/proposes for that team's slot. The administrator can respond for an unconnected external slot by explicitly selecting its competition-team ID; that does not allow the administrator to act for a different linked team's coach. Schedule responses require the expected revision. Invitations have their own recipient/verification and admin checks. Legacy statistics competition/standing mutations additionally permit the founding team coach for older competitions with a null administrator; the main competition administrator routes use their explicit `adminUserId` check.

Two connected Gaffer teams require matching applicable coach decisions for cross-team reviews and bilateral final report approval. An unconnected competition opponent allows the participating coach's confirmation to publish subject to completion, revision and review checks. It is not approval by timeout. Published shared reports use approved amendments instead of direct edits.

## Errors and contract alignment

Invalid input returns 400; absent authentication returns 401. Depending on the service, forbidden access returns 403 or a scoped 404 to avoid exposing another team's resource. Stale clocks, locked competition changes and other conflicts use the implemented 400/409 paths; clients must refresh rather than inventing a new unseen approval. Uploads return per-item receipts, so HTTP success does not mean every queued operation was accepted.

See [API guide](api-guide.md), [database schema](data/database-schema.md) and [PowerSync security](security/powersync-security.md).

Sources: [backend/src/common/team-access.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/common/team-access.ts), [backend/src/injuries/injuries.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/injuries/injuries.controller.ts), [backend/src/matches/matches.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/matches/matches.service.ts), [backend/src/competitions/competitions.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competitions/competitions.service.ts).
