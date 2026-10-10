# Automatic data refresh

The shared React Query client polls mounted pages and dialogs every **five seconds while visible**. Existing data stays on screen during background requests. These updates use polling and invalidation, not application-wide server push.

## Writes and other tabs

After a successful API write, including an assistant action outside a Query mutation, the shared fetch wrapper signals a data change. Refresh is coalesced and waits while mutations are pending so it does not interrupt optimistic updates. Active queries refresh; inactive queries become stale for their next mount. Disabled queries remain idle, and existing requests finish rather than being cancelled.

A same-origin `BroadcastChannel` sends only a change notification. Other tabs fetch through their own authenticated sessions; no private response data is broadcast. Polling continues when BroadcastChannel is unavailable. Listener, channel and timer cleanup runs when the connection is disposed.

## Visibility, connectivity and overrides

Mounting, focus and reconnection request fresh data. Ordinary network queries pause offline; match queries retain their feature-specific offline network policy and prepared local data. Hidden tabs suspend interval polling.

Feature overrides take precedence: shared live reports poll every second, opponent lineups every two seconds and private match sheets every ten seconds. Public player/match lists disable the five-second interval and use a 30-second stale period; standings refresh every 30 seconds. Weather keeps its own interval.

## Session and edit drafts

The signed-in session refreshes every **fifteen seconds** while visible and online, on focus/reconnection, and after local profile/team changes. Temporary background failures retain the current screen; an authoritative HTTP 401 clears the session and its protected scope.

Event and statistics edit forms initialize when opened and preserve unfinished drafts during background refresh. Close and reopen to load newer server values. Query refresh does not silently overwrite what the user is typing.

See [offline collaboration](offline-collaboration.md), [application structure](application-structure.md) and [public API caching](api-guide.md#caching-throttling-and-cors).

Source: [frontend/src/lib/query-client.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/lib/query-client.ts), [frontend/src/lib/api.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/lib/api.ts), [frontend/src/context/AuthContext.tsx](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/context/AuthContext.tsx).
