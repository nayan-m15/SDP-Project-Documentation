# Dependency security policy

The root, backend and frontend are separate npm projects with separate lockfiles. Review the resolved lockfile graph, installation mode and actual executed path together; a manifest category alone is not proof of reachability or safety.

## Classification and patching

Runtime dependencies include backend authentication/HTTP/persistence and frontend rendering, Query, PowerSync/SQLite, charts and PDF generation. Vite, TypeScript, Tailwind/Vite integration, PWA generation and the shadcn scaffolding CLI run during development/build. Test/coverage tools run in their respective workflows. Build tooling still needs security review where it handles external input or produces deployed artifacts.

Prefer compatible patched releases and review lockfile changes. Avoid forced major changes or downgrades solely to reduce an advisory count. For an override, record the parent chain, chosen version, affected path and compatibility reason; remove it when upstream resolves the dependency. Current backend overrides pin Swagger's `js-yaml` to `5.4.3` and constrain `proxy-addr`; frontend also constrains `proxy-addr`, and the root pins `shell-quote` to `1.11.0`. These choices are requirements in the checked manifests, not a fresh advisory-feed audit.

## Recorded exception and review policy

The recorded backend esbuild exception remains applicable to the locked chain: `drizzle-kit` ? `@esbuild-kit/core-utils` ? `esbuild 0.18.20`. The application security note identifies the affected development-server range as ?0.24.2 and accepts this path because migration tooling transpiles configuration instead of starting an esbuild development server. Revisit the decision when upstream replaces the loader, the locked version changes or server exposure changes. Optional peer edges can affect npm classification, so inspect the path rather than assuming it is absent from a runtime install.

Other installed development chains include shadcn glob tooling and ts-jest coverage tooling. Package presence alone does not establish that an old advisory still applies; this review does not renew those specific accepted exceptions without an advisory/version-range match. Build and tooling input exposure still needs assessment.

For every accepted advisory, record the affected resolved version/range, reachability, owner, compensating controls and reconsideration trigger in the application's security record. Revisit when lockfiles, installation mode, input sources or upstream fixes change. The current lockfiles were inspected, but no fresh live advisory audit was run; this guide makes no current vulnerability-count or zero-advisory claim.

## Installed sockets and implemented collaboration

Socket.io packages and Nest's adapter are installed, but no application gateway, frontend socket connection or room broadcast establishes a socket-based logging flow. Match collaboration uses local capture, authenticated HTTP upload, server reconciliation, authorized reads and configured PowerSync replication. Do not describe `engine.io` as a live-logger transport merely because it is installed.

See [technology stack](../tech-stack/web-app-tool-stack.md), [third-party provenance](../third-party-code-and-assets.md) and [offline collaboration](../offline-collaboration.md).

Sources: [package-lock.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/package-lock.json), [backend/package.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/package.json), [backend/package-lock.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/package-lock.json), [frontend/package.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/package.json), [frontend/package-lock.json](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/package-lock.json).
