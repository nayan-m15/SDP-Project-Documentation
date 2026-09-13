# Third-party Code and Assets

## Scope and licence method

Versions below are direct manifest ranges from the inspected repositories; lockfiles are the authority for an installed resolution. Licences are the packages' commonly declared upstream licences and should be rechecked from the exact locked package before distribution. Transitive dependencies retain their own terms.

## Application runtime libraries

| Name / version range | Purpose and source | Licence |
| --- | --- | --- |
| React / React DOM `^19.2.8` | UI runtime, npm/GitHub Meta | MIT |
| Vite `^8.2.0`, TypeScript `~6.0.2` frontend | Build/dev server and type checking | MIT; Apache-2.0 |
| React Router `^7.18.2` | SPA routing | MIT |
| TanStack Query `^5.101.4` | Server-state requests/cache | MIT |
| Tailwind CSS `^4.3.3`, `@tailwindcss/vite` | Utility CSS/build integration | MIT |
| Base UI `^1.7.0`, shadcn `^4.17.0` | UI primitives and copied/generated component source | MIT; MIT. Generated local components can be modified and must retain applicable notices. |
| class-variance-authority, clsx, tailwind-merge, tw-animate-css | Component variants/class composition/animation utilities | Apache-2.0; MIT; MIT; MIT |
| Lucide React `^1.31.0`, React Icons `^5.7.0` | Icons | ISC; MIT (individual bundled icon sets may have their own licences—confirm selected set attribution). |
| Inter variable font `^5.3.0` | Locally packaged application font via Fontsource | SIL OFL 1.1 |
| date-fns `^4.4.0`, React Day Picker `^10.0.1` | Date calculation and calendar control | MIT; MIT |
| Recharts `^3.10.1` | Statistics charts | MIT |
| qrcode.react `^4.2.0` | Invitation/claim QR rendering | ISC |
| NestJS packages `^11.x`, RxJS `^7.8.1`, reflect-metadata `^0.2.2` | API framework, reactive/runtime metadata support | MIT; Apache-2.0; Apache-2.0 |
| Better Auth `^1.6.27` backend / `^1.6.29` frontend / root `^1.7.1` | Authentication/session client and server | MIT |
| Drizzle ORM `^0.45.2`, Drizzle Kit `^0.31.10` (resolved `0.45.2`/`0.31.10`) | Typed persistence and migration tooling | Apache-2.0 / MIT, from installed metadata |
| Neon serverless `^1.1.0` (resolved `1.1.0`) | PostgreSQL HTTP driver | MIT, from installed metadata |
| Zod `^4.4.3` | Runtime validation | MIT |
| Swagger packages `@nestjs/swagger ^11.4.6`, `swagger-ui-express ^5.0.1` | OpenAPI generation/UI | MIT; MIT wrapper (bundled Swagger UI is Apache-2.0) |
| Socket.io/client `^4.8.3`, Nest WebSockets/Socket.io platform | Installed real-time scaffolding | MIT. Not evidence of delivered broadcasting. |
| Brevo SDK `^6.0.3` (resolved `6.0.3`) | Transactional verification email | Installed metadata does not declare a licence; confirmation required. |
| dotenv `^17.4.2` | Local environment loading | BSD-2-Clause |

## Test and developer tools

| Name | Purpose | Licence |
| --- | --- | --- |
| Jest 30, ts-jest 29 | Unit/integration runner and TypeScript transform | MIT |
| Supertest 7 | HTTP API assertions | MIT |
| Playwright 1.62 | Chromium browser automation | Apache-2.0 |
| ESLint 9 / typescript-eslint | Backend linting | MIT |
| Oxlint `^1.75.0` | Frontend linting | MIT |
| Prettier 3 | Formatting | MIT |
| concurrently 10 | Root parallel dev servers | MIT |

## External services

| Service | Use | Terms/data note |
| --- | --- | --- |
| Open-Meteo | Geocoding and weather data, with displayed attribution | Provider terms/licence and attribution must be checked for the deployment's usage class. No API key is stored. |
| Google OAuth | Social authentication | Google API terms/privacy apply; client secret remains server-side. |
| Brevo | Verification email | Brevo terms/data processing apply to recipient email. |
| Neon | Hosted PostgreSQL | Service terms and regional/data-retention settings require team confirmation. |
| Vercel / Render / GitHub Pages | Frontend/API/documentation hosting | Platform terms and deployment settings require team confirmation. |

## Application assets

| Asset(s) | Purpose | Provenance/licence |
| --- | --- | --- |
| `Logo.png`, public `logo.png`, favicons and mobile icons | Gaffer identity/PWA/browser icons | Project asset; original creator/source and licence **require confirmation**. |
| `hero-stadium-bg.png`, `features-stadium-bg.png/.jpg`, `dugout-bg.png`, `SignUp-bg.png` | Landing/auth decorative photography/art | Source and commercial reuse rights **require confirmation**. Duplicate PNG/JPG content should not be assumed to have separate provenance. |
| `johannesburg-line-art.svg`, `icons.svg`, `hero.png` | Decorative/vector/application imagery | Original source/generator and licence **require confirmation**. |
| `react.svg`, `vite.svg` | Starter/framework logos | Upstream trademark/licence conditions apply; apparently unused in current product pages and should be confirmed before distribution. |
| `site.webmanifest`, privacy/terms HTML, `loading-screen.css` | Web app metadata/legal/static styling | Project-authored status requires team confirmation; legal text is not legal approval evidence. |

## Documentation portal dependencies and assets

The portal loads Google Fonts (Inter, Outfit, JetBrains Mono), Highlight.js 11.9.0, Mermaid 10, Marked (unpinned `latest`), Lucide (unpinned `latest`), and on the upload page Mammoth 1.6.0, PDF.js 3.11.174 and Turndown (unpinned). These projects use open-source licences (fonts: SIL OFL; Highlight.js: BSD-3-Clause; Mermaid/Marked/Mammoth/PDF.js/Turndown: MIT or Apache-2.0 as declared upstream; Lucide: ISC). Pinning the unversioned CDN dependencies and recording integrity hashes/licence notices are recommended supply-chain follow-ups.

Portal mockups, wireframes, UML SVGs, screenshots, logo and meeting screenshots live under `assets/`. Existing design pages declare Figma and named AI-assisted generation. The underlying image provenance/licence was not available in the repositories; reuse rights **require confirmation**. Meeting assets were preserved and not audited for this task.

## AI declaration preservation

Existing repository declarations and commit trailers are historical evidence supplied by the team. This audit does not guess additional tools/models or independently verify every declared model name. Future declarations should identify the tool only when supported by a record and describe human review without claiming approval that did not occur.

For the documentation update dated 13–14 September 2026, **OpenAI Codex (GPT-5)** was used to inspect the documentation/application repositories and supplied Trello export, draft Markdown updates, adjust viewer navigation and run local checks. This records tool and purpose; it does not claim stakeholder or human approval.
