# User Feedback and Assessment Evidence

This document summarises the supplied feedback workbook and retains each participant’s recorded answers in a readable format.

**Source:** `Gaffer – Formal User Feedback & Assessment Evidence.xlsx`, sheet `Form Responses 1`. **Coverage:** 33 responses, P001–P033, with session dates from 15 August to 11 October 2026.

**Read this page:** [Summary](#feedback-summary) · [Findings](#findings-from-the-recorded-responses) · [Task outcomes](#task-outcomes) · [Evidence limits](#evidence-limits) · [Registers](#feedback-registers) · [Delivery checklist](#delivery-evidence-checklist) · [Workflow](#how-to-use-this-pack) · [Tracker follow-up](#trello-follow-up-to-user-feedback) · [Participant responses](#participant-responses)

## Feedback summary

Most recorded task outcomes were successful. The responses also identify problems with signing in, finding prerequisites and completing actions, plus specific reports about mobile team selection, formations and roster statistics. These findings need to be read alongside the incomplete and failed outcomes below.

| Measure | Recorded result |
| --- | --- |
| Responses | 33 |
| Self-described roles | 12 football fans/supporters; 9 players; 6 coaches/assistant coaches; 5 with no regular football involvement; 1 other |
| Mean overall ease-of-use rating | 4.73 (recorded scale 1–5; 33 answers) |
| Mean overall satisfaction rating | 4.61 (recorded scale 1–5; 33 answers) |
| Mean likelihood of use or recommendation | 4.70 (recorded scale 1–5; 33 answers) |
| Error/bug question | 7 answered “Yes”; 24 “No”; 2 “Not sure” |

A “Yes” answer is not a count of confirmed defects: P001 and P031 answered “Yes” but described the error as “None”. Task results, severity selections and comments sometimes disagree; all are retained in the participant records.

## Findings from the recorded responses

The themes below are editorial summaries of the responses. They do not assign new severity ratings, owners, sprint commitments or acceptance decisions.

**Team setup and navigation.** P002, P010 and P013 did not realise that a team was required before accessing roster features. P004 suggested tooltips for locked tabs and a pointer cursor for clickable elements. P026 found navigation harder to remember; P027 requested an optional first-use guide and could not locate the Task 04 action. Compare the [onboarding card](https://trello.com/c/3w1GG5Qf) with a dated retest.

Participant evidence: [P002](#p002), [P004](#p004), [P010](#p010), [P013](#p013), [P026](#p026), [P027](#p027).

**Signing in and loading.** P004 reported a database timeout during getting started. P024 reported Google sign-in not working; P027 reported a slow or unexpected Google sign-in flow and explicitly allowed that the cause might be on their side. P028 reported rejected test credentials and slow page loading/Google sign-in. P012 raised login time, P017 requested password reset from the sign-in page, and P023 requested “remember me”. The comments do not establish a shared root cause.

Participant evidence: [P004](#p004), [P012](#p012), [P017](#p017), [P023](#p023), [P024](#p024), [P027](#p027), [P028](#p028).

**Roster entry.** Participants raised the time or effort needed to enter players, including adding them one by one. Assess a faster entry workflow; no bulk-entry implementation or commitment is established by the workbook.

Participant evidence: [P002](#p002), [P010](#p010), [P013](#p013), [P014](#p014), [P015](#p015).

**Team selection, injury eligibility and mobile use.** P013 reported that injured players could still be selected. P017 reported that players could not be dragged into a team sheet on mobile. P019 reported the RAM position not auto-filling for 4-2-3-1, 4-1-4-1 and 3-5-2, and suggested smaller cards while dragging. Compare injury behaviour with the [squad eligibility](https://trello.com/c/Ea2RUO8v) and [team-management status](https://trello.com/c/poV9l0zN) cards; verify device-specific and formation behaviour separately.

Participant evidence: [P013](#p013), [P017](#p017), [P019](#p019).

**Roster statistics after live logging.** P014 reported that player statistics did not update on the roster page after logging a live game. Compare the [roster statistics card](https://trello.com/c/UyOQVbi7) with a reproduction on an identified build.

Participant evidence: [P014](#p014).

**Injury logging during a session.** P025 wanted injuries to be shown more clearly. P029 requested a shorter injury form with fewer required fields and suggested separate on-field and off-field modes, so the coach could record an injury quickly during play.

Participant evidence: [P025](#p025), [P029](#p029).

**Additional football features.** Requests include passes, tackles, goalkeeper saves and defensive statistics (P003, P013, P021), offline support (P010), adding/joining leagues (P014), match-based player ratings (P016), player profile images (P019), and custom or five/seven-a-side formations plus better opponent logging (P022). These are participant expectations to compare with the brief and backlog.

Participant evidence: [P003](#p003), [P010](#p010), [P013](#p013), [P014](#p014), [P016](#p016), [P019](#p019), [P021](#p021), [P022](#p022).

**Positive observations.** Participants praised team management, tactics, live logging, event planning, visual design and straightforward workflows. P005 also praised light/dark modes and tactic reminders. Positive comments do not override the separately reported failures or prove accessibility.

Participant evidence: [P005](#p005), [P007](#p007), [P014](#p014), [P017](#p017), [P018](#p018), [P020](#p020), [P021](#p021), [P022](#p022).

## Task outcomes

Counts use the selected result field for each of the 33 responses. “Trial and error” is recorded as a completed task. “Partial” means the feature was found but the task was not finished. “Failure” means the task could not be completed.

| Task | Without help | Trial and error | Partial | Failure |
| --- | ---: | ---: | ---: | ---: |
| 01 — Get started | 24 | 5 | 3 | 1 |
| 02 — Squad / players | 24 | 7 | 2 | 0 |
| 03 — Coaching workflow | 29 | 3 | 1 | 0 |
| 04 — Complete a realistic action | 23 | 6 | 2 | 2 |

Task 04 actions differ between respondents. Times are reproduced as entered, including missing values and numbers without units; they are not averaged or used as performance benchmarks.

## Evidence limits

- Results, ratings, severity and timings are self-reported. The workbook does not establish a controlled environment, build hash, timing method, facilitator, recruitment method, follow-up retest or stakeholder acceptance.
- Roles are self-described. This is user feedback, not a client sign-off or an accessibility audit.
- Related tracker cards show follow-up context. A completion marker does not independently verify a fix, deployment or retest.
- The attached workbook is the source for this revision. Its 33 participant records replace the duplicate older 14-response table and earlier 25-response transcription.
- Participant wording, selected results, severity and time strings are preserved. Dates and numeric ratings are formatted for reading, trailing whitespace is removed, and blank cells are shown as “Not provided”. The credential text in P028’s error comment is redacted in this document; the source workbook remains unchanged.

## Feedback registers

### Formal Feedback Register

**Source state: no entries yet.** The workbook contains column headings but no completed feedback records.

Each future record has these fields:

- **Identity and observation:** Feedback ID, Participant ID, Date, Task attempted, Success / failure, Time taken, Severity, Verbatim feedback.
- **Decision and responsibility:** Linked Gitea issue, Decision, Owner, Target sprint.
- **Follow-up evidence:** Outcome, Status, Evidence / screenshot / log, Notes.

### Feedback Integration Log

**Source state: no entries yet.** The workbook contains column headings but no completed integration records.

Each future grouped finding has these fields:

- **Finding and supporting responses:** Finding ID, Feedback theme / problem, Participant evidence, No. of participants affected, Severity.
- **Decision and responsibility:** Linked Gitea issue, Decision, Owner, Target sprint.
- **Change and verification:** Change implemented / planned, Outcome after retest, Before evidence, After evidence, Status, Rationale / notes.

## Delivery & Evidence Checklist

**Workbook state:** All seven listed requirements (sequences 9–15) are “Not started”. Owner, evidence/link and notes fields are blank. This reproduces the workbook’s assessment checklist, rather than verifying current delivery state.

### 9. Configure the Gitea runner, branch protections, environments and secrets.

**Evidence to capture:** Screenshots of runner online status, protected branch settings, environment configuration and secret names. Never expose secret values.

### 10. Make the test database available to CI.

**Evidence to capture:** CI configuration plus successful database connection, migration or test log.

### 11. Implement and validate ci.yml.

**Evidence to capture:** ci.yml plus screenshot or log of a successful Gitea workflow run.

### 12. Create isolated Render staging and Vercel staging targets.

**Evidence to capture:** Staging URLs and screenshots/settings showing staging is separate from production.

### 13. Implement staging deployment and smoke tests.

**Evidence to capture:** Successful staging deployment workflow and smoke-test output.

### 14. Implement production approval, deployment, verification and rollback steps.

**Evidence to capture:** Approval step, production deployment log, verification result and documented rollback procedure.

### 15. Add testing and feedback documentation, then capture screenshots/logs of successful Gitea workflow runs as assessment evidence.

**Evidence to capture:** User-testing form/responses, formal feedback register, Gitea issues, feedback integration evidence, workflow screenshots/logs and final testing documentation.

## How to use this pack

The workbook describes the following feedback and assessment workflow. These are instructions included in the source pack, not a record that the actions have been performed.

1. Send the Google Form link to independent usability-test participants. Their anonymous Participant ID is generated automatically.
2. For every task, collect success/failure, time taken, severity and verbatim participant feedback.
3. Keep the original Form Responses sheet unchanged as evidence of formal feedback collection.
4. Transfer actionable findings into the Formal Feedback Register. Use one issue or task finding per row.
5. Create a Gitea issue for actionable blocker, major and relevant minor findings. Paste the Gitea issue link into the register.
6. Record the decision, owner and target sprint. If feedback is rejected or deferred, document the reason.
7. After implementing a change, retest it and record the outcome. Add before/after screenshots, logs or commit evidence where possible.
8. Use the Feedback Integration Log to group repeated findings across multiple participants.
9. Complete the Delivery &amp; Evidence Checklist as CI/CD work is completed.
10. For assessment, show BOTH formal feedback collection and evidence that feedback influenced development decisions and implementation.

<!-- trello-status:start -->
## Trello follow-up to user feedback

**Board snapshot: 11 October 2026.** Latest recorded action: `2026-10-11T21:28:12.474Z` (UTC). See [export sources and reconciliation](../Project%20Management/trello-board-snapshot.md). List placement, the card completion marker (Trello `dueComplete`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.

Onboarding #137, squad eligibility #114, team-management status #112 and roster statistics #89 remain unarchived in Issues/fixes and are marked complete. The export contains no checklists on these four cards. These are later tracker states, not new survey responses or dated retests; preserve the respondents' original observations above and use [bug tracking](../Project%20Management/bug-tracking.md) for current records.
<!-- trello-status:end -->

## Participant responses

Each section shows the participant’s profile and task outcomes. Open **Full response** to read the task comments, ratings and remaining answers. Result labels are shortened using the definitions above; severity and timing are shown exactly as recorded.

**Jump to a participant:** [P001](#p001) · [P002](#p002) · [P003](#p003) · [P004](#p004) · [P005](#p005) · [P006](#p006) · [P007](#p007) · [P008](#p008) · [P009](#p009) · [P010](#p010) · [P011](#p011) · [P012](#p012) · [P013](#p013) · [P014](#p014) · [P015](#p015) · [P016](#p016) · [P017](#p017) · [P018](#p018) · [P019](#p019) · [P020](#p020) · [P021](#p021) · [P022](#p022) · [P023](#p023) · [P024](#p024) · [P025](#p025) · [P026](#p026) · [P027](#p027) · [P028](#p028) · [P029](#p029) · [P030](#p030) · [P031](#p031) · [P032](#p032) · [P033](#p033)

### P001

**Session date:** 14 September 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Very often.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 1 | No issue |
| 02 — Squad / players | Completed without help | 1 | No issue |
| 03 — Coaching workflow | Completed without help | 1 | No issue |
| 04 — Complete a realistic action | Completed without help | 2 | No issue |

<details>
<summary>Full response for P001</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 09:03:48.959000

#### First impressions

- **Confidence using websites or web apps:** 2
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> coach

**What first caught your attention on the landing page?**

> good

#### Task comments (verbatim)

**Task 01 — Get started:**

> Nothing

**Task 02 — Squad / players:**

> Good

**Task 03 — Coaching workflow:**

> Good

**Task 04 — Complete a realistic action:**

> Good

**Task 04 feature or action chosen:**

> Team management

**Where did you feel confused, stuck or unsure?**

> none

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team

**Weakest or most frustrating part:**

> Nothing

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Tactical pitch

**One change before release:**

> Nothing

**Final comments or suggestions:**

> *Not provided*

</details>

### P002

**Session date:** 13 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 00:30 | No issue |
| 02 — Squad / players | Completed with trial and error | 01:25 | Minor |
| 03 — Coaching workflow | Completed without help | 00:50 | No issue |
| 04 — Complete a realistic action | Completed without help | 02:20 | No issue |

<details>
<summary>Full response for P002</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 09:19:32.767000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> It is to help the user manage a team

**What first caught your attention on the landing page?**

> The background image

#### Task comments (verbatim)

**Task 01 — Get started:**

> The google sign up worked with no issue and was fast

**Task 02 — Squad / players:**

> The roster was blocked to click till i added a team, however i didn't know i was supposed to add my team first

**Task 03 — Coaching workflow:**

> Pages are easy to navigate between

**Task 04 — Complete a realistic action:**

> I had no issue, scheduling meetings for matches training were easy

**Task 04 feature or action chosen:**

> I added events

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The team section where i can setup my team

**Weakest or most frustrating part:**

> Adding players 1 by 1

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Visual design, Mobile / touchline usability

**One change before release:**

> UI Design

**Final comments or suggestions:**

> None

</details>

### P003

**Session date:** 12 September 2026. **Football experience:** Player. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed with trial and error | 10 seconds | Minor |
| 02 — Squad / players | Completed with trial and error | N/A | Minor |
| 03 — Coaching workflow | Completed without help | N/A | Minor |
| 04 — Complete a realistic action | Completed without help | N/A | No issue |

<details>
<summary>Full response for P003</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 09:37:53.887000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Help amature football team record match stats

**What first caught your attention on the landing page?**

> The Live Logger

#### Task comments (verbatim)

**Task 01 — Get started:**

> N/A

**Task 02 — Squad / players:**

> N/A

**Task 03 — Coaching workflow:**

> N/A

**Task 04 — Complete a realistic action:**

> N/A

**Task 04 feature or action chosen:**

> Create event

**Where did you feel confused, stuck or unsure?**

> N/A

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 4 |
| Overall ease of use | 5 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Not sure

**Error or bug description:**

> N/A

**Strongest or most useful part:**

> Live Logger

**Weakest or most frustrating part:**

> Nothing

**Expected football-coaching feature not found:**

> Passes, goalkeeper saves and tackles to be recorded

**Areas needing improvement (selected answers):**

> Visual design, Speed / performance, Feedback after completing actions, Error handling

**One change before release:**

> Passes, goalkeeper saves and tackles to be recorded

**Final comments or suggestions:**

> Nothing

</details>

### P004

**Session date:** 14 September 2026. **Football experience:** No regular football involvement. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed with trial and error | 2  minutes | Major |
| 02 — Squad / players | Completed with trial and error | 1 minute | No issue |
| 03 — Coaching workflow | Completed without help | 15 secs | No issue |
| 04 — Complete a realistic action | Completed with trial and error | 01:00 | No issue |

<details>
<summary>Full response for P004</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 11:40:38.550000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage your team and track matches

**What first caught your attention on the landing page?**

> The graphics

#### Task comments (verbatim)

**Task 01 — Get started:**

> Received error "Database connection timed out or is unreachable. Please check your network connection and try again.

**Task 02 — Squad / players:**

> Maybe add a small tooltip for the locked tabs that tells users what they need to do or where they need to go to unlock them. It would make the navigation a bit clearer.
>
> Also, it would be nice if the cursor changed to a hand/pointer when hovering over anything clickable, just so it’s more obvious that you can click it

**Task 03 — Coaching workflow:**

> n/a

**Task 04 — Complete a realistic action:**

> n/a

**Task 04 feature or action chosen:**

> add competition

**Where did you feel confused, stuck or unsure?**

> none

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Not sure

**Error or bug description:**

> none

**Strongest or most useful part:**

> User friendly (esp as someone that doesn't know much about soccer)

**Weakest or most frustrating part:**

> none

**Expected football-coaching feature not found:**

> no

**Areas needing improvement (selected answers):**

> Speed / performance

**One change before release:**

> mentioned in task 1 feedback

**Final comments or suggestions:**

> nice

</details>

### P005

**Session date:** 31 August 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 20 seconds | No issue |
| 02 — Squad / players | Completed without help | 1 minute | No issue |
| 03 — Coaching workflow | Completed without help | 1 minute | No issue |
| 04 — Complete a realistic action | Completed without help | 2 minutes | No issue |

<details>
<summary>Full response for P005</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 11:52:41.275000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Gaffer is designed to help a coach run their team. Build the squad. Set the lineup, log what happens during and after matches.

**What first caught your attention on the landing page?**

> The headline “engineered for the realties of amateur football” caught my attention first and immediately told me what the product of for.

#### Task comments (verbatim)

**Task 01 — Get started:**

> No issues, logged in and verified my email with no issues.

**Task 02 — Squad / players:**

> I was surprised by how easy it was to add player information, and dragging players into position or swapping in substitutes felt smooth and intuitive.

**Task 03 — Coaching workflow:**

> I love being able to select my set-piece takers, and even if a coach isn't that experienced, the app quietly helps by offering different styles to choose from. I also love that it includes reminders during the game to keep the tactics on track

**Task 04 — Complete a realistic action:**

> Adding player info was easy, dragging players into position and swapping subs felt smooth, and I loved being able to pick set-piece takers with built-in tactic reminders during the game.

**Task 04 feature or action chosen:**

> Team management tile, tactics rules and instructions.

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team management, tactics roles and instructions

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Other

**One change before release:**

> Nothing

**Final comments or suggestions:**

> I love the small touches like having both dark mode and light mode. I love how easily I can manage my team and even track rival standings, and I think the event calendar will be really useful for keeping everything organized.

</details>

### P006

**Session date:** 25 August 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 45 second | No issue |
| 02 — Squad / players | Completed without help | 30 seconds | No issue |
| 03 — Coaching workflow | Completed without help | 10 seconds | No issue |
| 04 — Complete a realistic action | Completed with trial and error | 1 minute | No issue |

<details>
<summary>Full response for P006</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 12:09:49.011000

#### First impressions

- **Confidence using websites or web apps:** 3
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Management

**What first caught your attention on the landing page?**

> Clean sleek visuals

#### Task comments (verbatim)

**Task 01 — Get started:**

> Smoothly done

**Task 02 — Squad / players:**

> Went well

**Task 03 — Coaching workflow:**

> Nice and easy

**Task 04 — Complete a realistic action:**

> Easy to complete

**Task 04 feature or action chosen:**

> Adding

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Easy to use, visually appealing, a lot of fun

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Speed / performance

**One change before release:**

> None

**Final comments or suggestions:**

> Lovely work gaffs

</details>

### P007

**Session date:** 15 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:45 | Suggestion |
| 02 — Squad / players | Completed with trial and error | 02:37 | Suggestion |
| 03 — Coaching workflow | Completed without help | 05:23 | No issue |
| 04 — Complete a realistic action | Completed without help | 01:20 | No issue |

<details>
<summary>Full response for P007</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 12:46:50.110000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Allow a sports team coach to view, manage and optimize their team

**What first caught your attention on the landing page?**

> The modern and sleek aesthetic of the entire site, its ease of access and layout of info

#### Task comments (verbatim)

**Task 01 — Get started:**

> Email verification worked well, sign up process was seamless. Not many issues to report

**Task 02 — Squad / players:**

> Player selection/creation performed extremely well

**Task 03 — Coaching workflow:**

> Site's layout allows the manager to clearly plan a game tactic, no issues were encountered

**Task 04 — Complete a realistic action:**

> No issues encountered

**Task 04 feature or action chosen:**

> Creating a team

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The data visualisation

**Weakest or most frustrating part:**

> Nothing to note

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Squad / player management

**One change before release:**

> N/A

**Final comments or suggestions:**

> Nothing to note

</details>

### P008

**Session date:** 15 August 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Partial | 1:38 | No issue |
| 02 — Squad / players | Partial | 1:43 | No issue |
| 03 — Coaching workflow | Completed without help | 1:31 | No issue |
| 04 — Complete a realistic action | Completed without help | 1:34 | No issue |

<details>
<summary>Full response for P008</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 12:48:38.587000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 3

**What is Gaffer designed to help a user do?**

> Gain research and clarity

**What first caught your attention on the landing page?**

> The font

#### Task comments (verbatim)

**Task 01 — Get started:**

> Nothing was confusing

**Task 02 — Squad / players:**

> Everything worked perfectly

**Task 03 — Coaching workflow:**

> Everything worked smoothly without any issues

**Task 04 — Complete a realistic action:**

> Excellent services

**Task 04 feature or action chosen:**

> I can’t remember

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Every part had its own strengths

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Visual design

**One change before release:**

> None

**Final comments or suggestions:**

> None

</details>

### P009

**Session date:** 13 September 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 1 minute | No issue |
| 02 — Squad / players | Completed without help | 5 minutes | No issue |
| 03 — Coaching workflow | Completed without help | 1:30 minute | No issue |
| 04 — Complete a realistic action | Completed without help | 1:30 | No issue |

<details>
<summary>Full response for P009</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-14 20:59:22.817000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Help local coaches take care of teams better

**What first caught your attention on the landing page?**

> The colour scheme

#### Task comments (verbatim)

**Task 01 — Get started:**

> I just love how everything worked so well - and I love all the ideas

**Task 02 — Squad / players:**

> I thought it was creative and was super obvious to use.

**Task 03 — Coaching workflow:**

> No issue

**Task 04 — Complete a realistic action:**

> No issue

**Task 04 feature or action chosen:**

> Goal

**Where did you feel confused, stuck or unsure?**

> Not at all

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Everything

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Other

**One change before release:**

> Nothing I love it

**Final comments or suggestions:**

> *Not provided*

</details>

### P010

**Session date:** 10 September 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Very often.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:20 | No issue |
| 02 — Squad / players | Completed with trial and error | 01:40 | Minor |
| 03 — Coaching workflow | Completed without help | 02:20 | No issue |
| 04 — Complete a realistic action | Completed without help | 05:30 | No issue |

<details>
<summary>Full response for P010</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 12:04:04.025000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> To help me manage my team

**What first caught your attention on the landing page?**

> The big text

#### Task comments (verbatim)

**Task 01 — Get started:**

> Everything worked well

**Task 02 — Squad / players:**

> Didn't add a team at first

**Task 03 — Coaching workflow:**

> Everything worked well

**Task 04 — Complete a realistic action:**

> everything is fine

**Task 04 feature or action chosen:**

> Live logger

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team Management

**Weakest or most frustrating part:**

> Adding players one by one

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Tactical pitch

**One change before release:**

> Offline support

**Final comments or suggestions:**

> None

</details>

### P011

**Session date:** 14 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed with trial and error | 2 minutes | Minor |
| 02 — Squad / players | Completed without help | 2 minutes | No issue |
| 03 — Coaching workflow | Completed without help | 2 minutes | No issue |
| 04 — Complete a realistic action | Completed without help | 2 minutes | No issue |

<details>
<summary>Full response for P011</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 12:46:00.564000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Efficient

**What first caught your attention on the landing page?**

> The design

#### Task comments (verbatim)

**Task 01 — Get started:**

> It was not an issue or confusing

**Task 02 — Squad / players:**

> Nothing was confusing

**Task 03 — Coaching workflow:**

> Not confusing

**Task 04 — Complete a realistic action:**

> Not confusing

**Task 04 feature or action chosen:**

> Don’t recall

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 4 |
| Overall ease of use | 4 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The efficiency

**Weakest or most frustrating part:**

> Clarity

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Speed / performance, Analytics / performance tracking

**One change before release:**

> Make a it a bit more clear

**Final comments or suggestions:**

> *Not provided*

</details>

### P012

**Session date:** 15 September 2026. **Football experience:** Player. **Sports/coaching app use:** Very often.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 2 minute | No issue |
| 02 — Squad / players | Completed without help | 1 minute | No issue |
| 03 — Coaching workflow | Completed without help | 3 minutes | No issue |
| 04 — Complete a realistic action | Completed without help | 1 minute | No issue |

<details>
<summary>Full response for P012</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 12:52:25.433000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> It’s a website to help to football coach’s be more organised and thorough

**What first caught your attention on the landing page?**

> The UI

#### Task comments (verbatim)

**Task 01 — Get started:**

> The live logger worked well and the website was generally well designed and user friendly

**Task 02 — Squad / players:**

> No issues, was easy to find

**Task 03 — Coaching workflow:**

> It was easy to use and access

**Task 04 — Complete a realistic action:**

> Worked perfectly

**Task 04 feature or action chosen:**

> Athlete roster

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team construction

**Weakest or most frustrating part:**

> Login time

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Navigation / finding features, Speed / performance

**One change before release:**

> Login time

**Final comments or suggestions:**

> Would recommend to all coachs

</details>

### P013

**Session date:** 31 August 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 30 seconds | Minor |
| 02 — Squad / players | Completed with trial and error | 2 minutes | Minor |
| 03 — Coaching workflow | Completed without help | 01:00 | Minor |
| 04 — Complete a realistic action | Completed without help | 05:00 | Minor |

<details>
<summary>Full response for P013</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 12:53:10.420000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage a team properly and look at stats and events

**What first caught your attention on the landing page?**

> User interface

#### Task comments (verbatim)

**Task 01 — Get started:**

> No issue really, Google sign up is working well

**Task 02 — Squad / players:**

> Was not clear to add a team beforehand to access other features

**Task 03 — Coaching workflow:**

> I think the flow is very good, navigating through the pages is simple

**Task 04 — Complete a realistic action:**

> Nothing really confusing about selecting and choosing players in the team management

**Task 04 feature or action chosen:**

> Saving players to a team plan

**Where did you feel confused, stuck or unsure?**

> Not really stuck, but injured players could still be selected part of the team

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> Nonw

**Strongest or most useful part:**

> Team management

**Weakest or most frustrating part:**

> Long process for adding the players to a team

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Speed / performance, Live match workflow, Feedback after completing actions

**One change before release:**

> Add stats for defensive players also

**Final comments or suggestions:**

> None

</details>

### P014

**Session date:** 04 September 2026. **Football experience:** Player. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 00:45 | No issue |
| 02 — Squad / players | Completed without help | 02:00 | No issue |
| 03 — Coaching workflow | Completed without help | 02:00 | No issue |
| 04 — Complete a realistic action | Completed with trial and error | 05:00 | No issue |

<details>
<summary>Full response for P014</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 13:02:38.625000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Keep track of events, players and plan games with tactics

**What first caught your attention on the landing page?**

> I liked how good it looked

#### Task comments (verbatim)

**Task 01 — Get started:**

> Signing up was very easy and intuitive

**Task 02 — Squad / players:**

> Can take a bit long adding all of the players to a team

**Task 03 — Coaching workflow:**

> Easy to use, the assistants and player invites seem to be easy to use also

**Task 04 — Complete a realistic action:**

> Live logger works really well, simple to use

**Task 04 feature or action chosen:**

> Simulated a live match

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> when logging what happened in a live game, the player stats didn't update on the roster page

**Strongest or most useful part:**

> Live logger

**Weakest or most frustrating part:**

> Adding players

**Expected football-coaching feature not found:**

> Yes, league features aren't really established right now

**Areas needing improvement (selected answers):**

> Mobile / touchline usability, Analytics / performance tracking

**One change before release:**

> Adding and joining leagues

**Final comments or suggestions:**

> None

</details>

### P015

**Session date:** 03 September 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Very often.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:00 | No issue |
| 02 — Squad / players | Completed without help | 01:00 | Minor |
| 03 — Coaching workflow | Completed with trial and error | 30seconds | No issue |
| 04 — Complete a realistic action | Completed without help | 2 minutes | No issue |

<details>
<summary>Full response for P015</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 14:03:25.083000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Record their athletes information during games

**What first caught your attention on the landing page?**

> The colour scheme

#### Task comments (verbatim)

**Task 01 — Get started:**

> The UI looks amazing

**Task 02 — Squad / players:**

> All good.

**Task 03 — Coaching workflow:**

> All good

**Task 04 — Complete a realistic action:**

> All good

**Task 04 feature or action chosen:**

> Roster

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The live logger

**Weakest or most frustrating part:**

> Athlete roster input

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Navigation / finding features, Error handling

**One change before release:**

> Nothing

**Final comments or suggestions:**

> None

</details>

### P016

**Session date:** 30 August 2026. **Football experience:** Player. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 1 minute | No issue |
| 02 — Squad / players | Completed without help | 1.5 min | No issue |
| 03 — Coaching workflow | Completed without help | 50s | No issue |
| 04 — Complete a realistic action | Completed with trial and error | 1.5 min | No issue |

<details>
<summary>Full response for P016</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-15 14:20:57.334000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> It helps a squad manage their managerial matters as well as track their games and performance

**What first caught your attention on the landing page?**

> The G as a pitch. Very cool

#### Task comments (verbatim)

**Task 01 — Get started:**

> No issues, was intuitive sign up

**Task 02 — Squad / players:**

> No issue, it makes sense and follows real life protocol

**Task 03 — Coaching workflow:**

> Same as above

**Task 04 — Complete a realistic action:**

> No issue, just got used to the UI though

**Task 04 feature or action chosen:**

> It’s d

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 4 |
| Overall ease of use | 5 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Selecting squads/managing the formation

**Weakest or most frustrating part:**

> Could be a bit more cohesive.

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Navigation / finding features, Readability / wording

**One change before release:**

> Ratings systems for players based off of matches

**Final comments or suggestions:**

> *Not provided*

</details>

### P017

**Session date:** 26 September 2026. **Football experience:** Player. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 15 seconds | No issue |
| 02 — Squad / players | Completed without help | 20 seconds | No issue |
| 03 — Coaching workflow | Completed without help | 15 seconds | No issue |
| 04 — Complete a realistic action | Completed without help | 1 minute | No issue |

<details>
<summary>Full response for P017</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-26 09:55:25.101000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Check their stats and keep up to date with fixtures, team sheets and seeing scores

**What first caught your attention on the landing page?**

> I like the simplicity of the landing page and the fact that it has all upcoming events and fixtures to inform players and managers of the games

#### Task comments (verbatim)

**Task 01 — Get started:**

> The page was easy to navigate and control without any issues in navigating or using the features of the page

**Task 02 — Squad / players:**

> The overall player management system for the squad page is quite good as it is easy to use and adding players is quick

**Task 03 — Coaching workflow:**

> The idea of the live logger works really well as you can track live changes per minute and see what the key events of the fixture were per player

**Task 04 — Complete a realistic action:**

> The addition of a player worked well. It was easy to add with all necessities needed to add the player present. Cant think of anything else to change

**Task 04 feature or action chosen:**

> I added an athlete to the roster

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> On mobile the players cannot be dragged into the team sheet. You can only do so on PC

**Strongest or most useful part:**

> The ability to track statistics

**Weakest or most frustrating part:**

> To reset your password you need to be signed in

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Mobile / touchline usability, Squad / player management, Accessibility

**One change before release:**

> Adding a reset password link on the sign in page

**Final comments or suggestions:**

> Great work on the design. Definitely something that can be looked at for future tournaments and leagues

</details>

### P018

**Session date:** 26 September 2026. **Football experience:** Player. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 1 minute | No issue |
| 02 — Squad / players | Completed without help | 30 seconds | No issue |
| 03 — Coaching workflow | Completed without help | 30 seconds | No issue |
| 04 — Complete a realistic action | Completed without help | 30 seconds | No issue |

<details>
<summary>Full response for P018</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-26 10:54:10.473000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Track performance

**What first caught your attention on the landing page?**

> How neat, transparent, and well designed it is

#### Task comments (verbatim)

**Task 01 — Get started:**

> Loading screens and animations are amazing

**Task 02 — Squad / players:**

> Easy to find

**Task 03 — Coaching workflow:**

> Easy to find

**Task 04 — Complete a realistic action:**

> Easy to find

**Task 04 feature or action chosen:**

> Viewer team performance

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The simplicity

**Weakest or most frustrating part:**

> Nothing tbh

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Analytics / performance tracking, Error handling

**One change before release:**

> Nothing

**Final comments or suggestions:**

> *Not provided*

</details>

### P019

**Session date:** 26 September 2026. **Football experience:** Player. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Partial | 1 minute | Suggestion |
| 02 — Squad / players | Completed without help | 5 seconds | No issue |
| 03 — Coaching workflow | Completed with trial and error | 30 seconds | No issue |
| 04 — Complete a realistic action | Completed with trial and error | 1 minute | No issue |

<details>
<summary>Full response for P019</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-26 15:46:58.845000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage your football team's performance and data.

**What first caught your attention on the landing page?**

> The scrolling animation.

#### Task comments (verbatim)

**Task 01 — Get started:**

> No issue - Everything works well

**Task 02 — Squad / players:**

> A cool feature would be to allow the user to add profile images for each player so user can visually see their player's of their team rather than just see their names.

**Task 03 — Coaching workflow:**

> The colours worked well in this section.

**Task 04 — Complete a realistic action:**

> No issue - Everything worked well

**Task 04 feature or action chosen:**

> Added new event.

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> On the "Team Management" section - the RAM position does not auto-fill for some formations, such as:
>
> 4-2-3-1
> 4-1-4-1
> 3-5-2
>
> I also feel with regards to this section that when the user drags the player cards it should shrink slightly, making it easier to place the card on the position that the user wants to place them on.

**Strongest or most useful part:**

> The Live Logger section is useful

**Weakest or most frustrating part:**

> Nothing really.

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Readability / wording, Tactical pitch

**One change before release:**

> Nothing much

**Final comments or suggestions:**

> Great app and very well designed.

</details>

### P020

**Session date:** 27 September 2026. **Football experience:** No regular football involvement. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 2 min | No issue |
| 02 — Squad / players | Completed without help | 2 minutes | No issue |
| 03 — Coaching workflow | Completed without help | 5 min | No issue |
| 04 — Complete a realistic action | Completed without help | 4 min | No issue |

<details>
<summary>Full response for P020</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-28 19:43:47.352000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Be your football management assistant

**What first caught your attention on the landing page?**

> The animated background 🔥

#### Task comments (verbatim)

**Task 01 — Get started:**

> The sign in process was quick and efficient and made easy with the availability of the sign in with google feature

**Task 02 — Squad / players:**

> There were no issues, easy to understand how to use and what to do

**Task 03 — Coaching workflow:**

> There were no issues, easy to understand how to use and what to do

**Task 04 — Complete a realistic action:**

> There were no issues, easy to understand how to use and what to do

**Task 04 feature or action chosen:**

> Live logger

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The event planner and squad manager

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Mobile / touchline usability

**One change before release:**

> Nothing, it worke as is

**Final comments or suggestions:**

> None

</details>

### P021

**Session date:** 25 September 2026. **Football experience:** Player. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:00 | No issue |
| 02 — Squad / players | Completed without help | 03:00 | No issue |
| 03 — Coaching workflow | Completed without help | 02:00 | No issue |
| 04 — Complete a realistic action | Completed without help | 01:00 | No issue |

<details>
<summary>Full response for P021</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 11:24:40.145000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> A coach can track their players and matches

**What first caught your attention on the landing page?**

> The interactive background

#### Task comments (verbatim)

**Task 01 — Get started:**

> Everything worked properly

**Task 02 — Squad / players:**

> Was pretty straightforward to add players. Can see there's also an option to send invites to players for them to maybe view their stuff

**Task 03 — Coaching workflow:**

> Workflow is very intuitive and works well

**Task 04 — Complete a realistic action:**

> Event planning looks like it makes it very easy for the coach to track things

**Task 04 feature or action chosen:**

> Adding a match

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The live logger

**Weakest or most frustrating part:**

> I wouldn't say weak but there are small things that can be improved

**Expected football-coaching feature not found:**

> Yes tracking defensive contributions and goalkeeper saves

**Areas needing improvement (selected answers):**

> Live match workflow, Analytics / performance tracking, Feedback after completing actions

**One change before release:**

> Add goalkeeper saves and maybe defensive tackles

**Final comments or suggestions:**

> Very good work

</details>

### P022

**Session date:** 26 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:00 | No issue |
| 02 — Squad / players | Completed without help | 02:30 | No issue |
| 03 — Coaching workflow | Completed without help | 05:00 | No issue |
| 04 — Complete a realistic action | Completed without help | 04:00 | No issue |

<details>
<summary>Full response for P022</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 11:32:15.961000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage teams and players

**What first caught your attention on the landing page?**

> Background

#### Task comments (verbatim)

**Task 01 — Get started:**

> Easy to sign up

**Task 02 — Squad / players:**

> Nothing confusing, adding players to roster is easy

**Task 03 — Coaching workflow:**

> Coaching tools seems like it has everything that a coach would need to use

**Task 04 — Complete a realistic action:**

> No issue, from creating players to using them in the formation

**Task 04 feature or action chosen:**

> Team management

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team management

**Weakest or most frustrating part:**

> Live logger, can still use a little more work especially from opponents side

**Expected football-coaching feature not found:**

> The coach to have the ability to make their own formation

**Areas needing improvement (selected answers):**

> Mobile / touchline usability, Live match workflow

**One change before release:**

> Add 5 and 7 a side formations and allow a coach to make their own

**Final comments or suggestions:**

> None

</details>

### P023

**Session date:** 25 September 2026. **Football experience:** No regular football involvement. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:00 | Suggestion |
| 02 — Squad / players | Completed without help | 02:00 | No issue |
| 03 — Coaching workflow | Completed without help | 02:00 | No issue |
| 04 — Complete a realistic action | Completed without help | 01:00 | No issue |

<details>
<summary>Full response for P023</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 11:42:39.167000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Helps a coach to keep track of their responsibilities

**What first caught your attention on the landing page?**

> The ordered reading blocks

#### Task comments (verbatim)

**Task 01 — Get started:**

> Include a remember me button for future use

**Task 02 — Squad / players:**

> Looks all good

**Task 03 — Coaching workflow:**

> App flow seems easy to use and keep track of everything

**Task 04 — Complete a realistic action:**

> The feature looks so cool and is quite unique

**Task 04 feature or action chosen:**

> Injuries

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Event planning

**Weakest or most frustrating part:**

> Nothing really in my opinion

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Readability / wording, Accessibility

**One change before release:**

> Include remember me function

**Final comments or suggestions:**

> No

</details>

### P024

**Session date:** 27 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Rarely.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Failure | 03:00 | Blocker |
| 02 — Squad / players | Completed without help | 02:00 | No issue |
| 03 — Coaching workflow | Completed without help | 01:00 | No issue |
| 04 — Complete a realistic action | Completed without help | 01:00 | No issue |

<details>
<summary>Full response for P024</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 11:49:20.847000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Help coaches coach their players and team

**What first caught your attention on the landing page?**

> Background

#### Task comments (verbatim)

**Task 01 — Get started:**

> The google log in wasn't working

**Task 02 — Squad / players:**

> Players added easily, can see what they have done

**Task 03 — Coaching workflow:**

> Events show up clearly on the planner

**Task 04 — Complete a realistic action:**

> Nothing confusing, works well, format of the cups look cool

**Task 04 feature or action chosen:**

> Create a cup competition

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 3 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> Logging in with google

**Strongest or most useful part:**

> Live logger

**Weakest or most frustrating part:**

> Signing in

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Mobile / touchline usability, Accessibility

**One change before release:**

> Google Sign in

**Final comments or suggestions:**

> No

</details>

### P025

**Session date:** 22 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 01:00 | No issue |
| 02 — Squad / players | Completed without help | 01:00 | No issue |
| 03 — Coaching workflow | Completed without help | 01:00 | No issue |
| 04 — Complete a realistic action | Completed without help | 01:00 | Suggestion |

<details>
<summary>Full response for P025</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 12:02:11.416000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage and plan around your teams

**What first caught your attention on the landing page?**

> Background

#### Task comments (verbatim)

**Task 01 — Get started:**

> Works well

**Task 02 — Squad / players:**

> Adding a team and players is easy

**Task 03 — Coaching workflow:**

> Has everything a coach could need

**Task 04 — Complete a realistic action:**

> Injuries could be shown a bit better

**Task 04 feature or action chosen:**

> Adding an injury

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Team management

**Weakest or most frustrating part:**

> None really

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Visual design

**One change before release:**

> Improved injury plan

**Final comments or suggestions:**

> None

</details>

### P026

**Session date:** 29 September 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 2 minutes | No issue |
| 02 — Squad / players | Completed without help | 1 minute | No issue |
| 03 — Coaching workflow | Completed without help | 3 minutes | Minor |
| 04 — Complete a realistic action | Completed without help | 3 minutes | No issue |

<details>
<summary>Full response for P026</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-09-29 13:33:44.533000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> Manage a team and coordinate team logistics in a well organised way

**What first caught your attention on the landing page?**

> The organisation of each section, it is clearly labelled and well defined

#### Task comments (verbatim)

**Task 01 — Get started:**

> Everything worked well

**Task 02 — Squad / players:**

> Everything worked well

**Task 03 — Coaching workflow:**

> I had a minor issue navigating but I got it

**Task 04 — Complete a realistic action:**

> No issue

**Task 04 feature or action chosen:**

> I changed the position of a player as that might change in different scenarios

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> No, it did buffer but I think that was my internet connection

**Strongest or most useful part:**

> Being organised

**Weakest or most frustrating part:**

> Remember where certain sections are

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Accessibility

**One change before release:**

> The background image is sometimes distracting

**Final comments or suggestions:**

> It was really great

</details>

### P027

**Session date:** 08 October 2026. **Football experience:** Other. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 00:05 | Suggestion |
| 02 — Squad / players | Completed without help | 00:30 | No issue |
| 03 — Coaching workflow | Completed without help | 00:45 | No issue |
| 04 — Complete a realistic action | Failure | 1:30 | Minor |

<details>
<summary>Full response for P027</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-08 15:58:46.806000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> It is for football coaches in order to manage their teams.

**What first caught your attention on the landing page?**

> The opening page is satisfying

#### Task comments (verbatim)

**Task 01 — Get started:**

> It's seemless and functions as any other "Get Started" page would
> I'm not sure if it was my side but sign in with Google was not quick, it wanted me to manually add the password and email etc might be my side though
> So I just signed in with my details and verification was easy

**Task 02 — Squad / players:**

> Was seamless and self-explanatory

**Task 03 — Coaching workflow:**

> It was relatively easy to find.

**Task 04 — Complete a realistic action:**

> I don't know where to complete the task

**Task 04 feature or action chosen:**

> Calandar and creating an event

**Where did you feel confused, stuck or unsure?**

> Unsure at task 04

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Its theme/design and layout is strong, would be useful for coach's to review the stats of prior games since trendlines are made and there are diffrent stats to compare from.

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Readability / wording, Other

**One change before release:**

> An on screen guide on how to use each feature, allow the user to either skip or view if it's their first time using

**Final comments or suggestions:**

> None

</details>

### P028

**Session date:** 11 October 2026. **Football experience:** No regular football involvement. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed with trial and error | &lt;1min | Minor |
| 02 — Squad / players | Completed without help | &gt;1min | No issue |
| 03 — Coaching workflow | Completed without help | &lt;1min | Minor |
| 04 — Complete a realistic action | Failure | &gt;5min | Blocker |

<details>
<summary>Full response for P028</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 11:37:36.314000

#### First impressions

- **Confidence using websites or web apps:** 1
- **Clarity of Gaffer’s purpose from the landing page:** 3
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> I have no idea upon first impressions

**What first caught your attention on the landing page?**

> The green colour accent

#### Task comments (verbatim)

**Task 01 — Get started:**

> N/A

**Task 02 — Squad / players:**

> Clearly stated instructions and buttons compared to the previous step

**Task 03 — Coaching workflow:**

> N/A

**Task 04 — Complete a realistic action:**

> Could not complete this

**Task 04 feature or action chosen:**

> N/A

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 5 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 2 |
| Could use efficiently at training or on the touchline | 3 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 3 |
| Likelihood of use or recommendation when coaching | 3 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> \[Credentials redacted\] … did not allow this

**Strongest or most useful part:**

> The live leaderboard

**Weakest or most frustrating part:**

> Page loading speed and Google account sign in took ages

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Navigation / finding features, Mobile / touchline usability

**One change before release:**

> Nothing obvious but maybe the colour scheme

**Final comments or suggestions:**

> No

</details>

### P029

**Session date:** 11 October 2026. **Football experience:** No regular football involvement. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 5s | No issue |
| 02 — Squad / players | Completed without help | 2 minutes | No issue |
| 03 — Coaching workflow | Completed without help | 2:47 | No issue |
| 04 — Complete a realistic action | Completed without help | 1:30s | No issue |

<details>
<summary>Full response for P029</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 19:05:22.933000

#### First impressions

- **Confidence using websites or web apps:** 5
- **Clarity of Gaffer’s purpose from the landing page:** 3
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Used to help a coach gain useful insights of their tea.

**What first caught your attention on the landing page?**

> The visuals

#### Task comments (verbatim)

**Task 01 — Get started:**

> Everything worked well

**Task 02 — Squad / players:**

> Everything worked well

**Task 03 — Coaching workflow:**

> Everything well

**Task 04 — Complete a realistic action:**

> Everything worked well

**Task 04 feature or action chosen:**

> Injury logger

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 4 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 3 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Events tracker and injury logger

**Weakest or most frustrating part:**

> Actual real world usability as it takes quite some time to log things I would say maybe implement 2 different modes such as on field and off field where on field is more short answers which can be elaborated on
> , off the pitch

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Navigation / finding features, Live match workflow

**One change before release:**

> Injury logger make it shorter and not require all the fields to be filled so that the coach can log it in real time and continue with training or the match without wasting a lot of time

**Final comments or suggestions:**

> No

</details>

### P030

**Session date:** 11 October 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 2:00 | Blocker |
| 02 — Squad / players | Completed with trial and error | 1:36 | Minor |
| 03 — Coaching workflow | Partial | 1:28 | Minor |
| 04 — Complete a realistic action | Partial | 2:56 | Minor |

<details>
<summary>Full response for P030</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 21:12:22.862000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> help amateur coaches

**What first caught your attention on the landing page?**

> Instagram

#### Task comments (verbatim)

**Task 01 — Get started:**

> Everything was as expected

**Task 02 — Squad / players:**

> Worked very well

**Task 03 — Coaching workflow:**

> worked very well

**Task 04 — Complete a realistic action:**

> It was great

**Task 04 feature or action chosen:**

> Choosing players

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 3 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 3 |
| Could use efficiently at training or on the touchline | 5 |
| Visual design was consistent | 5 |
| Overall ease of use | 4 |
| Overall satisfaction | 3 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Organising

**Weakest or most frustrating part:**

> None

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Feedback after completing actions

**One change before release:**

> None

**Final comments or suggestions:**

> No

</details>

### P031

**Session date:** 11 October 2026. **Football experience:** Football fan / supporter. **Sports/coaching app use:** Never.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Partial | 1 min | Major |
| 02 — Squad / players | Partial | 1:30 | Blocker |
| 03 — Coaching workflow | Completed without help | 2mins | Suggestion |
| 04 — Complete a realistic action | Completed with trial and error | 1:45 | No issue |

<details>
<summary>Full response for P031</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 21:14:10.599000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 4
- **Professional and visually appealing first impression:** 5

**What is Gaffer designed to help a user do?**

> All good

**What first caught your attention on the landing page?**

> The background

#### Task comments (verbatim)

**Task 01 — Get started:**

> Nothing

**Task 02 — Squad / players:**

> Nothing

**Task 03 — Coaching workflow:**

> All good

**Task 04 — Complete a realistic action:**

> Nothing

**Task 04 feature or action chosen:**

> Nothing

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 4 |
| Platform was responsive and quick enough | 5 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** Yes

**Error or bug description:**

> None

**Strongest or most useful part:**

> Home page

**Weakest or most frustrating part:**

> All good

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Speed / performance, Other

**One change before release:**

> None

**Final comments or suggestions:**

> None

</details>

### P032

**Session date:** 11 October 2026. **Football experience:** Player. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed with trial and error | 1:45 minutes | Minor |
| 02 — Squad / players | Completed without help | 2 minutes | No issue |
| 03 — Coaching workflow | Completed with trial and error | 1:20 minutes | No issue |
| 04 — Complete a realistic action | Partial | 2 minutes | No issue |

<details>
<summary>Full response for P032</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 21:19:07.127000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Help coaches in integrating

**What first caught your attention on the landing page?**

> The creativity

#### Task comments (verbatim)

**Task 01 — Get started:**

> It was good

**Task 02 — Squad / players:**

> nothing

**Task 03 — Coaching workflow:**

> It was all good

**Task 04 — Complete a realistic action:**

> nothing

**Task 04 feature or action chosen:**

> none

**Where did you feel confused, stuck or unsure?**

> no everything was clear

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 3 |
| Information was organised logically | 5 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 5 |
| Overall ease of use | 5 |
| Overall satisfaction | 4 |
| Likelihood of use or recommendation when coaching | 5 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> Technology integration with coaching

**Weakest or most frustrating part:**

> None everything was smooth

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Live match workflow

**One change before release:**

> None

**Final comments or suggestions:**

> none

</details>

### P033

**Session date:** 11 October 2026. **Football experience:** Coach / assistant coach. **Sports/coaching app use:** Sometimes.

| Task | Result | Time entered | Severity entered |
| --- | --- | --- | --- |
| 01 — Get started | Completed without help | 2 minutes | No issue |
| 02 — Squad / players | Completed without help | 1:56 | No issue |
| 03 — Coaching workflow | Completed without help | 1:48 | Blocker |
| 04 — Complete a realistic action | Completed without help | 1:39 | No issue |

<details>
<summary>Full response for P033</summary>

**Submission timestamp (source value; timezone unspecified):** 2026-10-11 21:54:47.019000

#### First impressions

- **Confidence using websites or web apps:** 4
- **Clarity of Gaffer’s purpose from the landing page:** 5
- **Professional and visually appealing first impression:** 4

**What is Gaffer designed to help a user do?**

> Improve the way in which they view/play the sport

**What first caught your attention on the landing page?**

> -

#### Task comments (verbatim)

**Task 01 — Get started:**

> -

**Task 02 — Squad / players:**

> -

**Task 03 — Coaching workflow:**

> -

**Task 04 — Complete a realistic action:**

> -

**Task 04 feature or action chosen:**

> -

**Where did you feel confused, stuck or unsure?**

> None

#### Usability ratings

Numeric selections below are on the recorded 1–5 scale. No verbal endpoint labels are inferred.

| Statement | Recorded rating |
| --- | ---: |
| Navigation and menus were easy to understand | 4 |
| Buttons, icons and labels made the action clear | 5 |
| Information was organised logically | 3 |
| Platform was responsive and quick enough | 4 |
| Could use efficiently at training or on the touchline | 4 |
| Visual design was consistent | 4 |
| Overall ease of use | 4 |
| Overall satisfaction | 5 |
| Likelihood of use or recommendation when coaching | 4 |

#### Errors and final feedback

**Encountered errors, broken links, non-working buttons or unexpected behaviour?** No

**Error or bug description:**

> None

**Strongest or most useful part:**

> The user-friendly feel

**Weakest or most frustrating part:**

> -

**Expected football-coaching feature not found:**

> No

**Areas needing improvement (selected answers):**

> Live match workflow

**One change before release:**

> Nothing

**Final comments or suggestions:**

> Non

</details>

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
