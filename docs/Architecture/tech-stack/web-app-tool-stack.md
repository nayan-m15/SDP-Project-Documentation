# Sport Coaching Tool — Technical Stack & System Architecture

**Project Documentation:** [https://nayan-m15.github.io/SDP-Project-Documentation/](https://nayan-m15.github.io/SDP-Project-Documentation/)  
**Version:** 2.0 (Milestone 1 & Production Architecture)  
**Target Sport:** Football (Soccer) Management Platform  

---

## 1. Executive Summary & Stack Overview

The **Sport Coaching Tool** is a decoupled, multi-tenant web platform designed for football coaches and assistant coaches to manage team rosters, schedule matches/trainings/meetings, track match statistics, and monitor team performance from a unified dashboard. 

The architecture strictly adheres to non-monolithic separation of concerns:
- **Client Tier**: Single-Page Application (SPA) built with React 19, Vite, and Tailwind CSS v4, delivering zero-latency UI interactions.
- **API Tier**: Enterprise-grade modular backend built on NestJS 11 and TypeScript, offering strict separation of business logic, dependency injection, and auto-generated OpenAPI 3.0 documentation.
- **Persistence Tier**: Cloud-native serverless PostgreSQL hosted on Neon, accessed through Drizzle ORM for type-safe query compilation and zero-overhead schema migrations.
- **Hosting & Infrastructure**: Render for backend container execution, Vercel for global frontend delivery, and GitHub Pages for the team documentation portal.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT / FRONTEND                               │
│  React 19 + TypeScript + Vite | Tailwind CSS v4 | shadcn/ui + Base UI       │
│  TanStack Query v5 (Server State) | Socket.io Client (Real-time Live Sync)  │
└───────────────────────┬─────────────────────────────▲───────────────────────┘
                        │ HTTPS (REST API)            │ WebSocket (WSS)
                        ▼                             │
┌─────────────────────────────────────────────────────┴───────────────────────┐
│                             BACKEND SERVICES                                │
│  NestJS 11 + Express + TypeScript | Zod Validation | Swagger OpenAPI Docs   │
│  Better Auth (Auth Engine) | Brevo (Transactional Email Service)            │
└───────────────────────┬─────────────────────────────────────────────────────┘
                        │ Drizzle ORM (Type-Safe SQL Engine)
                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PERSISTENCE LAYER                                │
│  Neon Serverless PostgreSQL (Branching, Relational Models, Role Isolation)   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Quick Reference Matrix

| Layer / Concern | Technology Selection | Justification & Purpose | Talks Directly To |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React 19 + Vite + TypeScript** | Client-only SPA ensuring strict non-monolithic decoupling; fast HMR and compile-time type safety. | Backend REST API & Socket.io Gateway |
| **Styling & Design System** | **Tailwind CSS v4 + shadcn/ui + Base UI** | Utility-first CSS engine paired with headless, accessible primitives (ARIA & keyboard navigation compliant). | Browser DOM / React Components |
| **Icons & Typography** | **Lucide React + Inter Variable** | Lightweight, scalable vector iconography and clean modern typography. | React UI Layer |
| **Frontend State & Fetching**| **TanStack Query v5** | Declarative data fetching, intelligent cache invalidation, and mutation state management. | Backend REST Endpoints |
| **Backend Framework** | **NestJS 11 + Express + TypeScript** | Enforced modular enterprise architecture (`Module → Controller → Service`), built-in DI, and decorators. | Postgres, Auth, Socket.io, External Services |
| **Validation & Type Inference**| **Zod v4** | Single source of truth for runtime payload validation and shared static TypeScript types. | Controller DTOs & Request Guards |
| **API Documentation** | **@nestjs/swagger + Swagger UI** | Auto-generated OpenAPI 3.0 interactive specification served live at `/api/docs`. | Backend Controllers & DTOs |
| **Authentication & Sessions** | **Better Auth** | Open-source, self-hosted auth engine supporting email/password, email verification, and Google OAuth without third-party vendor lock-in. | Postgres `user`, `session`, `account`, `verification` tables |
| **Database Engine** | **PostgreSQL (Neon Serverless)** | Relational data integrity, multi-tenant team isolation, ACID compliance, and database branching. | Backend Drizzle Client |
| **ORM & Migrations** | **Drizzle ORM + Drizzle Kit** | Compile-time SQL query safety, lightweight execution overhead, and deterministic migration diffing. | Neon PostgreSQL |
| **Real-time Engine** | **Socket.io + @nestjs/platform-socket.io** | Bidirectional event-driven communication for live match updates and dashboard broadcasts. | Frontend Socket.io Client ↔ NestJS Gateway |
| **Transactional Email** | **Brevo (@getbrevo/brevo)** | Automated transactional email delivery for account verification and password management. | NestJS Email Service ↔ User Inbox |
| **Unit & Integration Tests** | **Jest 30 + Supertest + @nestjs/testing** | Comprehensive backend unit testing and in-memory HTTP integration testing. | NestJS Modules & API Controllers |
| **End-to-End (E2E) Tests** | **Playwright** | Full-stack automated browser testing (Chromium, Firefox, WebKit) validating user journeys and UI flows. | Live Frontend & Backend Instances |
| **Linting & Code Quality** | **Oxlint (Frontend) / ESLint 9 + Prettier (Backend)** | Lightning-fast static analysis, syntax validation, and uniform code formatting. | CI/CD Pipeline & Local Dev |
| **Frontend Hosting** | **Vercel** | High-performance edge CDN network with automatic Git deployments. | Public Internet / End Users |
| **Backend Hosting** | **Render** | Managed cloud container service hosting the NestJS Node.js runtime environment. | Neon DB, Vercel Frontend, Brevo |
| **Database Hosting** | **Neon** | Serverless cloud PostgreSQL with point-in-time recovery and PR branch isolation. | Render Backend |
| **Documentation Site** | **Custom Docs on GitHub Pages** | Dedicated team documentation portal hosting sprint logs, architecture records, and guides. | Public / Evaluators & Team |
| **Work & Bug Tracking** | **Trello** | Agile Scrum board managing sprint backlogs, task assignments, and bug/issue tracking. | Engineering Team |
| **CI/CD & Source Control** | **GitHub Actions + Git** | Automated build, test, and lint validation on Pull Requests, with Conventional Commits. | Repository & Hosting Providers |

---

## 3. Detailed Architectural Breakdown

### 3.1 Frontend Architecture

* **React 19 & Vite 8**: The frontend is strictly built as a client-side Single Page Application (SPA). By leveraging Vite's esbuild-powered development server and Rollup production bundler, the application maintains sub-second Hot Module Replacement (HMR) and optimized static asset chunking.
* **Tailwind CSS v4 & shadcn/ui**: Styling utilizes the latest Tailwind v4 engine (`@tailwindcss/vite`), eliminating legacy CSS configuration files. shadcn/ui components (based on `@base-ui/react` primitives) provide accessible, keyboard-navigable UI components (modals, dropdowns, forms, buttons) that adhere to WCAG accessibility guidelines.
* **Client Routing & Guards**: `react-router-dom` (v7) provides client-side declarative routing with dedicated higher-order guards:
  * `<ProtectedRoute>`: Enforces active session validation, redirecting unauthenticated visitors to `/login`.
  * `<RequireTeam>`: Ensures coaches complete initial team creation before accessing team-scoped modules (`/athletes`, `/events`, `/statistics`).
* **Server State & Data Fetching**: `@tanstack/react-query` manages remote data caching, background re-validation, request deduplication, and optimistic mutations.

### 3.2 Backend Architecture

* **NestJS 11 Core**: Structured according to enterprise domain modules (`AuthModule`, `TeamsModule`, `AthletesModule`, `EventsModule`, `StatisticsModule`, `DashboardModule`, `EmailModule`, `DatabaseModule`). Each module isolates business logic across dedicated layers:
  * **Controllers**: Expose REST endpoints, apply route-level guards, handle request routing, and annotate OpenAPI documentation.
  * **Services**: Contain pure business logic and database orchestration.
  * **Guards & Decorators**: Custom `AuthGuard` extracts session tokens and validates them via Better Auth; `@CurrentUser()` injects authenticated user context into route handlers.
* **Data Validation with Zod**: Incoming payloads are validated against strict Zod schemas. This guarantees runtime safety, automatically rejects malformed requests with 400 Bad Request responses, and generates TypeScript typings across the API boundary.
* **Interactive OpenAPI (Swagger)**: Using `@nestjs/swagger` and `swagger-ui-express`, documentation is dynamically generated from controller metadata and DTO schemas, accessible at `/api/docs`.

### 3.3 Database & ORM Strategy

* **PostgreSQL on Neon**: A cloud-native serverless PostgreSQL instance hosts all application state. Database branching allows isolated staging environments for migration testing.
* **Drizzle ORM**: Selected over traditional heavyweight ORMs (e.g., TypeORM, Prisma) due to its zero-overhead query compilation, SQL-native syntax, and seamless compatibility with Neon's serverless connection pool.
* **Multi-Tenant Schema Design**:
  * `user`, `session`, `account`, `verification`: Authentication state managed in compliance with Better Auth standards.
  * `teams` & `team_members`: Defines multi-tenant boundaries and role-based permissions (`coach`, `assistant`).
  * `athletes`: Roster storage scoped strictly by `team_id` with soft-archiving support (`archived_at`).
  * `events`, `matches`, `athlete_match_stats`, `competitions`, `standings`: Relational structure for match fixtures, player statistics, and competition tracking.

### 3.4 Authentication & Communication Services

* **Better Auth Engine**: A modern, self-hosted authentication library integrated directly into PostgreSQL via Drizzle. Eliminates vendor subscription lock-in while providing secure session cookies, token rotation, and Google OAuth credentials.
* **Transactional Email Delivery**: Brevo API (`@getbrevo/brevo`) is configured for reliable automated delivery of email verification tokens and onboarding communication.
* **Real-time WebSockets**: Built on Socket.io, enabling room-based event broadcasting so live match events update simultaneously across multiple coach and assistant devices.

---

## 4. Hosting, Infrastructure & Operations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DEPLOYMENT INFRASTRUCTURE                          │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Service Component              │ Platform & Operational Role                │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Frontend SPA                   │ Vercel (Edge CDN, SSL, Continuous Deploy)  │
│ Backend API & WebSockets       │ Render (Node.js Container Runtime)         │
│ Relational Database            │ Neon (Serverless PostgreSQL)               │
│ Documentation Site             │ GitHub Pages (Static Documentation Portal) │
│ Backlog & Issue Tracker        │ Trello (Kanban Board & Sprint Management)  │
│ Source Control & CI Pipeline   │ GitHub Actions (Lint, Test, Build, Deploy) │
└────────────────────────────────┴────────────────────────────────────────────┘
```

* **Frontend on Vercel**: Automated preview and production builds linked to Git repository pushes. Static assets are served globally with low latency.
* **Backend on Render**: Deployed as a persistent Node.js web service running the compiled NestJS application, configured with zero-downtime health check endpoints and secure environment variable injection (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BREVO_API_KEY`).
* **Documentation on GitHub Pages**: Hosted at [https://nayan-m15.github.io/SDP-Project-Documentation/](https://nayan-m15.github.io/SDP-Project-Documentation/) as a centralized knowledge base for academic markers, team guidelines, and sprint retrospectives.
* **Task & Bug Tracking on Trello**: Trello serves as the primary Scrum management board, organizing product backlogs, sprint tasks, in-progress reviews, and bug/issue tracking.

---

## 5. Testing & Quality Assurance Framework

The repository implements a comprehensive testing pyramid ensuring reliability across all architectural layers:

```
                  ┌──────────────────────┐
                  │   Playwright (E2E)   │  ◄── Full-stack browser journeys
               ┌──┴──────────────────────┴──┐
               │    Supertest (Integration) │  ◄── Real API HTTP endpoint tests
            ┌──┴────────────────────────────┴──┐
            │       Jest 30 (Unit Tests)       │  ◄── Isolated services & business logic
         ┌──┴──────────────────────────────────┴──┐
         │     Oxlint & ESLint 9 (Static Analysis)│  ◄── Syntax, types & formatting
         └────────────────────────────────────────┘
```

1. **Static Analysis & Linting**:
   * Frontend: `oxlint` for high-speed syntax checking.
   * Backend: `eslint` (v9) paired with `prettier` for style consistency.
2. **Backend Unit Tests (`npm test`)**: Powered by Jest 30 and `@nestjs/testing`, validating business logic, service calculations, and controller guards with mocked dependencies.
3. **Backend Integration Tests (`npm run test:e2e`)**: Powered by Supertest, bootstrapping the NestJS application context against real database test instances to verify endpoint status codes, authentication headers, and payload serialization.
4. **End-to-End Browser Tests (`npm run test:e2e:ui`)**: Powered by Playwright, executing automated headful and headless user journeys across Chromium, Firefox, and WebKit to validate critical paths (e.g., authentication, team onboarding, athlete creation, event scheduling).

---

## 6. Development Workflow & Engineering Standards

### 6.1 Local Setup

```bash
# 1. Clone repository
git clone https://github.com/nayan-m15/SportCoachingTool.git
cd SportCoachingTool

# 2. Configure environment
cp .env.example .env

# 3. Install all workspace dependencies
npm install
npm --prefix frontend install
npm --prefix backend install

# 4. Start concurrent development environment
npm run dev
```
* **Frontend**: `http://localhost:5173`
* **Backend**: `http://localhost:3000`
* **Swagger API Docs**: `http://localhost:3000/api/docs`

### 6.2 Standard Tooling Commands

| Script | Working Context | Action Executed |
| :--- | :--- | :--- |
| `npm run dev` | Root | Concurrently runs NestJS backend and Vite frontend dev servers |
| `npm run build` | Root | Validates TypeScript types and generates production build bundles |
| `npm run lint` | Root | Runs Oxlint (frontend) and ESLint (backend) |
| `npm test` | Root / Backend | Runs backend Jest unit tests |
| `npm run test:e2e` | Root / Backend | Runs Supertest integration test suite against NestJS routes |
| `npm run test:e2e:ui` | Root | Runs Playwright full-stack browser E2E test suite |
| `npm run db:generate` | Backend | Generates PostgreSQL migration SQL files from Drizzle schema |
| `npm run db:migrate` | Backend | Applies pending schema migrations to Neon PostgreSQL |

### 6.3 Team Git & AI Attribution Policies

* **Conventional Commits**: Commit messages follow strict semantic guidelines:
  * `feat(<scope>): <description>`
  * `fix(<scope>): <description>`
  * `docs(<scope>): <description>`
  * `test(<scope>): <description>`
* **Branching Strategy**: Trunk-based short-lived feature branches (`feature/<name>`, `fix/<name>`), merged via reviewed pull requests.
* **AI Attribution Standard**: In compliance with course integrity policies, all AI-assisted contributions include commit trailers:
  ```text
  Co-authored-by: Antigravity AI <antigravity@google.com>
  ```
  or
  ```text
  Assisted-by: Claude Code [claude-sonnet-5]
  ```