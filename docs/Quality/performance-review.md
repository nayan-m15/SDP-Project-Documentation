# Application performance mechanisms

This page explains the inspected source mechanisms, not measured speedups, current production load or device readiness. See the [source basis](../Architecture/tech-stack/architecture-overview.md#source-basis). Older landing audit measurements are not results for the current plain-background fallback or this checkout.

## Public dashboard and database work

Player filters (team, competition, season, literal name substring and position category) run before pagination. The server selects a bounded athlete page and computes completed-match/event statistics with grouped SQL restricted to those player IDs, retaining zero totals for players without history. It avoids loading complete histories for every public player into application memory.

The UI initially requests 40 players and 100 matches, then loads more only on user action. Search debounces for 300 ms and obsolete requests can be cancelled. A failed extra page preserves existing rows and allows manual retry; 429 responses do not trigger automatic page retries. Complete filtered match totals/clean sheets come from a separate summary in the existing matches response, not from downloading every page.

Validated query keys use a per-instance 30-second cache and share concurrent in-flight database work. Default cache capacity is 500 with oldest-first eviction; match summaries are shared across offsets. Player/match queries disable the five-second default interval, use a 30-second stale period and refresh on focus; standings poll every 30 seconds. Limits and throttling bound anonymous work but do not guarantee latency. See [public API](../Architecture/Gaffer-Public-API-Reference.md) and [refresh](../Architecture/automatic-data-refresh.md).

## Optional landing scene and fallback

The landing page retains a plain fixed background while the optional scene is loading or unavailable. Reduced motion, save-data and reported device memory ≤2 GB choose fallback without constructing the scene. A worker probes capabilities where OffscreenCanvas/Worker are available; known software rendering chooses fallback. Unknown capability follows regular initialization/failure handling. The renderer also rejects detected software GPUs and cleans up.

The heavy scene module is dynamically imported after a yielded browser task. Scene construction yields between batches via MessageChannel (timer fallback), waits while the document is hidden and responds to cancellation. Geometry/material work and prewarming are staged rather than holding one continuous construction task. This reduces blocking opportunities; no startup-time claim is made here.

Small/constrained devices use lower geometry/texture/shadow settings. Resize computes device-pixel-ratio caps and pixel budgets: low-power about 760,000 pixels/cap 1.05; middle width about 1,250,000/cap 1.28; wider about 1,750,000/cap 1.45, with source minimum-ratio bounds. Unchanged dimensions/ratio avoid repeating resize work. These budgets describe source choices, not a guaranteed frame rate.

Document visibility and the pause control stop animation scheduling. Camera easing uses elapsed milliseconds rather than a fixed per-frame step and clamps long gaps to 100 ms, keeping catch-up behavior consistent across frame rates. Lights remain visible while intensity changes, including zero intensity, so scroll transitions do not repeatedly change shader light-count variants. Shader-error diagnostics remain enabled in development and are disabled in production via `import.meta.env.DEV` to avoid synchronous driver log queries.

Cancellation/unmount disconnects observers/listeners, stops frames, terminates capability workers and disposes scene/model geometries, materials, textures and WebGL resources. Context-loss handling and failed asset loading retain a usable fallback instead of treating the decorative scene as required product data.

## Other mechanisms

| Area | Source mechanism and limit |
| --- | --- |
| Route loading | Major React routes use lazy imports; actual bundle/startup impact depends on build and browser. |
| Sync upload | At most 50 items; up to four independent items processed concurrently, with same-match/ID and causal-parent ordering safeguards. |
| Live clock | Separate clock display and elapsed reference reduce parent state churn; authoritative newer revisions rebase local time. |
| Weather | Bounded process-local TTL cache, shared in-flight work and recent stale fallback; each server instance owns its cache. |
| Hashed assets | `frontend/vercel.json` sets `/assets/*` to `public, max-age=31536000, immutable`. Vite-generated hashes allow new assets to use new URLs; this is not a blanket cache rule for unversioned HTML or all public files. |
| Browser caching | PWA/service-worker asset/runtime caching aids prepared/offline views; protected authorization failures do not grant access to cached private data. |
| Reports | A captured report scope and one-operation guard prevent overlapping PDF/print/share work. Temporary resources and aborted operations are cleaned up. |

Grouped player SQL and incremental server-filtered public loading are implemented, so they are not outstanding work. Deep offset costs, index effectiveness, actual route-load/scene cost and multi-device sync throughput remain measurement questions rather than confirmed bottlenecks. Retain future measurements with explicit revision, device/environment and dataset context outside this explanation; this page imports no audit/benchmark artifacts.

Sources: [backend/src/public-api/public-dashboard.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard.service.ts), [backend/src/public-api/public-dashboard-cache.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard-cache.service.ts), [frontend/src/pages/PublicDashboard.tsx](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/pages/PublicDashboard.tsx), [frontend/src/components/landing/LandingScene.tsx](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/components/landing/LandingScene.tsx), [frontend/src/components/landing/landing-scene.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/components/landing/landing-scene.ts), [frontend/src/components/landing/scene-motion.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/components/landing/scene-motion.ts), [frontend/src/components/landing/scene-scheduler.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/components/landing/scene-scheduler.ts), [frontend/vercel.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/vercel.json).
