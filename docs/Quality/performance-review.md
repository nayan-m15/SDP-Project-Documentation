# Performance Status Review

**Review date:** 29 September 2026  
**Application source reviewed:** checkout `03cfc17`  
**Evidence type:** externally reported source-code review. The documentation author did not have access to the application repository and did not independently verify these findings. No runtime profiles, load tests, database query plans, or before/after benchmarks were collected. These are code-level observations, not measured results. Source presence does not mean measured speedup or verified performance under production load.

## Performance improvements present in source

| Area | Current implementation reported | What this improves / limitation |
| --- | --- | --- |
| Frontend route loading | Major pages use React lazy imports. | Splits route code so every page module need not load up front. No bundle-size or load-time measurements were collected. |
| Public dashboard pagination | Match and player endpoints are paginated. The backend selects a page of player IDs before loading their match statistics. The frontend requests matches in pages of 100 and players in pages of 500, with player-page concurrency capped at three. | Bounds each request and addresses prior page-size/truncation problems. The client still fetches every page and holds all results in memory for dashboard filtering and search. |
| Offline sync uploads | The sync endpoint accepts bounded uploads and processes up to four independent items concurrently. It flushes items sharing a match or ID in order and processes operations with causal parents separately. | Reduces serial work for independent items while preserving ordering safeguards. Throughput under real deployment load was not measured. |
| Live match clock | The large live-match screen has a separate clock display that updates once per second. A 200 ms timer maintains the elapsed-time reference, while parent React state updates only when the match minute changes. | Reduces frequent whole-page renders compared with updating React state five times per second. The screen remains a large component; no React Profiler results were collected. |
| Weather/location requests | Forecasts use an in-memory time-based cache, share in-flight requests for the same location/day, bound cache size, and allow a recent stale response when the provider fails. | Can reduce repeated provider calls. The cache is process-local and has not been measured across multiple server instances. |
| Landing page 3D scene | Smaller/constrained devices and software renderers use reduced settings, including lower pixel ratio, fewer shadows and textures, and lower geometry detail. Reduced-motion preferences are respected, and rendering can stop or pause. | Adaptive rendering behavior, not benchmark evidence. |
| Asset caching | PWA configuration caches app-shell assets and sets runtime caches for images, models/WASM, and fonts. | Provides caching behavior; it does not guarantee a particular offline startup time. |
| Database indexes and bounded requests | Source includes indexes for common team, event, match, competition, sync, and injury lookups, plus explicit result limits on selected endpoints. | Intended to support common access patterns. Index effectiveness is unverified without query plans and realistic data. |

The review established that these behaviors were present in the reviewed source, not when they were added. No item above is a measured speedup or evidence of production deployment.

## Remaining performance work

These are follow-up opportunities, not confirmed production incidents.

1. **Aggregate public player statistics in the database.** Although player IDs are paged first, each page reportedly still loads per-athlete/per-match rows and computes several event counts through correlated subqueries before aggregating in application memory. For large match histories, investigate grouped SQL aggregation or another measured approach. Benchmark before changing query structure and preserve correctness.
2. **Avoid loading the complete public dataset at once.** The public dashboard reportedly fetches all match/player pages and holds the results in memory for local filtering and search. Consider server-side search/filtering, incremental page loading, or a bounded summary endpoint if representative measurements show this is a bottleneck.
3. **Use query-plan evidence for database tuning.** Review high-volume queries with realistic data and `EXPLAIN ANALYZE`; verify whether existing indexes are used and add indexes only when query plans justify them.
4. **Profile the live-match interface.** The 200 ms interval still runs while the clock is active, and the screen remains large. Use React Profiler and browser performance tools to identify expensive renders before splitting components or changing update frequency.
5. **Measure 3D performance on target devices.** Test low-end Android, iOS, desktop, software rendering, reduced-motion settings, and long sessions. Record frame rate, memory, startup time, context loss, and battery impact before tuning scene quality.
6. **Establish repeatable baselines.** Record representative cold/warm route-load times, production bundle sizes, public-dashboard query latency at several dataset sizes, sync latency by batch size, and live-match rendering behavior. State the environment, dataset, revision, command/scenario, and results.
7. **Review pagination at scale.** Offset pagination is simple and bounded per request, but may become expensive for deep pages. Consider cursor/keyset pagination only if measurements show deep offsets matter.

## Previously identified issues and current reported status

A later source review reported that these concerns from a prior targeted source audit are addressed in source. The documentation author did not independently recheck this status:

- Public player statistics are restricted to the selected player-ID page before the stats join.
- The public frontend pages match/player results, and player-page requests use capped concurrency.
- Sync upload processing uses batches of up to four independent items with ordering safeguards instead of processing every independent item serially.
- Location search type-checks its query value before trimming it.
- Competition form validation enforces the API's 100-character name and 20-character season bounds.
- The full-screen loading overlay no longer has the old fixed 700 ms minimum hold described by the earlier audit. App readiness can still wait for fonts/auth or the safety timeout; startup delay is not eliminated.

Keep prior audit findings and their dates intact wherever recorded. This dated status update does not establish when the changes were introduced, that they are deployed, or that their performance effect has been measured.

## Evidence and follow-up record

This page is a source-level status summary reported by an external review of checkout `03cfc17` on 29 September 2026. It is not a benchmark, profiling report, load test, or production performance assessment. No response times, frame rates, query-plan results, database sizes, bundle sizes, or speedup percentages were supplied.

For future performance claims, record the date, repository revision, environment/device, dataset, exact command or scenario, measurements, and comparison baseline. Keep source observations separate from runtime results, deployment evidence, and stakeholder acceptance.
