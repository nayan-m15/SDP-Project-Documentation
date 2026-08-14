# Sprint Planning Meeting


## AMATEUR FOOTBALL COACHING


## PLATFORM

Product & Systems Design — How It Works, Why It Works That Way,


## and How Far It Could Go

This document specifies the core application — how a coach, an assistant, and an athlete actually use it, the

logic that makes offline, live, multi-user logging trustworthy — and then lays out, in three honest tiers, how far

the platform could be pushed toward what a professional club would expect, including what is realistic to build

and what is not.

Prepared for   COMS3011A Project 2 — Sport Coaching Tool (Soccer)

Scope   Basic, Intermediate, and Advanced tiers, plus stretch/impressive features

Design stance   Grassroots-first, offline-first, human-confirmed, stats built from zero


---


## 1   What This Application Is

In one sentence: a tool for an amateur coach and their helpers to run a team day to day — plan matches and

training, capture what happens during a game as it happens, and watch every statistic build itself up from that

captured data over a season — without needing signal at the pitch, a video crew, or an enterprise budget.

It is deliberately not a scaled-down copy of a professional analytics platform. Professional systems assume

fixed camera rigs, dedicated analysts, and years of imported history. This platform assumes one phone, one

volunteer, and a first match that starts every player's record at zero. That constraint is the design, not a

limitation to apologise for — and it is what section 8 pushes against later in this document.

Three commitments run through every decision below:

•   Nothing is imported.   A player's statistics exist only because someone logged an event, in this app, during

a match played on this platform — starting from their very first game.

•   The system computes, the coach confirms.   Every derived number — a result, a season total, a

suggestion — is a starting point a human can see, question, and override, never a silent final answer.

•   It has to work with no signal and one volunteer.   Logging has to survive a dead phone signal at a field

with no wifi, and it has to be simple enough that a parent roped in as an assistant coach can use it with zero

training.


---


## 2   The Core Loop — How a Match Actually Works

Every feature in this document sits around one loop. Understanding this loop is understanding the whole

application.

1. Set up the fixture   Coach creates the match — date, time, venue, opponent. If the opposing coach is also

on the platform the fixture links to their team; if not, the opponent is just a name.

2. Assign who logs   Coach or an assistant is assigned to run the live log. That person only ever logs events

for their own roster.

3. Kick off   Whoever is logging taps “Kickoff.” This starts that device's own match clock — an

approximate, best-effort timer, not an official record synced to the referee.

4. Log live, as it happens   Goals, cards, substitutions, key passes are tapped in the moment, each timestamped

and tied to a player. Every entry is instantly editable or undoable.


## 5. Capture survives no


## signal

Entries save to the device immediately. If there is no connection, nothing is lost — it

syncs automatically once signal returns.

6. Two logs, one match   If the opponent is also logging on their own device, both logs merge into one shared

match record without either side needing to coordinate in the moment.


## 7. Match ends, result locks


## in

Coach marks the event final. The score is already known from the logged goals —

nothing is re-entered, only reviewed and corrected if needed.

8. Stats update themselves   Season totals, per-player numbers, comparisons and charts are simply a count over

everything logged since that player's first match — never typed in separately.


## The logic behind the trickiest parts of this loop

Why the match clock does not need to match the referee's watch

No amateur match has a synced digital feed from the referee. The app's clock is a best-effort marker for

context — “roughly the 34th minute” — not a legal record. Two things are kept separate on purpose: the   real

wall-clock timestamp   on every entry, which is what the merge logic uses to order events and catch

near-duplicates; and the   displayed minute , which is just elapsed time since that device's own kickoff tap,

editable by the coach if it looks off. Two devices will have slightly different clocks — the duplicate-detection

window (roughly a one to two minute tolerance) exists precisely to absorb that.

Why offline logging is scoped to the event log only

Everything else — roster edits, fixture creation, viewing stats — assumes connectivity. Only live match logging

runs through an on-device store (SQLite, synced in the background once signal returns) because that is the

one moment data capture genuinely cannot wait for a connection. Widening offline support further would

multiply the sync surface area for very little real benefit.

Why duplicate entries are flagged, not silently merged

When two devices both log the same match, a duplicate is defined as: same player, same event type, same

match, within the timing tolerance above. The system flags these as “possible duplicates” for a coach to

resolve rather than silently auto-merging them — silent merging risks quietly dropping a real second event (two

different players fouled in the same minute, for instance). This is the single hardest requirement in the whole

build, and it is solved with a sync engine (PowerSync) handling the mechanics, plus this explicit

human-resolution rule handling the judgment calls the mechanics cannot make.


---


## 3   What Is Manual and What Updates Itself

One rule sits underneath the whole platform:   anything that changes an official record — a result, a card,

who is on the roster — always has a human confirm it , even when the system computed or suggested the

value first.


## Manual


## Area   What a human must do

Roster & accounts   Adding/editing/deactivating a player; inviting an assistant; assigning squad numbers and

roles.

Events   Creating, cancelling, or rescheduling a match/training session; marking an event live or

final; reopening a final event for correction.

Live logging   Every goal, card, sub, key-pass tap — inherently manual, it is a human watching the

match; resolving flagged duplicates; overriding a computed stat.

Selection   Confirming the actual starting lineup, even when the system suggests one.


## Automatic


## Area   What the system does on its own

Stats & results   Match result, season totals, per-player numbers, standings, trend charts — all counted

from the log, never re-entered.

Sync & real-time   Offline entries syncing once signal returns; live dashboard pushes to everyone watching;

duplicate flagging (the flag is automatic, the resolution is manual).

External data   Weather refreshed for a venue; coordinates geocoded from an address; reminders firing

on schedule.

Smart suggestions   Selection/highlight suggestions, schedule drafts, clash detection — generated

automatically but always presented as a suggestion a human approves.


---


## 4   Roles

Three roles, deliberately kept lean. Each additional role multiplies the permission checks needed across every

module — better to get three roles rock-solid than five roles half-built.


## Role   What they can do

Coach   Full access — roster, fixtures, live logging, stats overrides, inviting others. One squad has

exactly one owning coach.

Assistant   Can log live events during an assigned match/session. Cannot edit the roster or

cancel/delete events. Assigned per-team, not platform-wide.


## Athlete (optional,


## Intermediate+)

Read-only view of their own stats; can RSVP to events. No logging or roster access at all.

A public page (Advanced tier) is intentionally not a role — the shareable result/summary page is a public link,

not an account type.


---


## 5   The Three Build Tiers


## Basic

•   Roster management and event scheduling (matches and training, each editable/cancellable).

•   Live in-event logging timeline with editable/undoable entries.

•   Derived stats with manual override.

•   Dashboard: live view during an event in progress, roster/summary view otherwise.


## Intermediate

•   Multi-user accounts with the Coach/Assistant role split and per-team permissions.

•   Fixtures arranged between coaches, athlete RSVPs, shared calendar.

•   Deeper stats — season totals, per-event breakdowns, trend charts, player/opponent comparison.

•   Weather and venue-map lookups; reminders for upcoming events.

•   Offline-first logging for the live event log, syncing in the background.


## Advanced

•   Collaborative offline logging — several assistants logging the same event, merged conflict-free (the hardest

requirement; see section 2).

•   League/standings view derived from completed fixtures within a competition grouping.

•   Rules-based automated suggestions (selections, highlights) — explainable, never a black box.

•   Public shareable team/athlete page and exportable match reports.

•   Auto-generated season schedule with clash detection (same squad/venue double-booked).


---


## 6   A Worked Example: Scoping “Passing”

“Passing” is used throughout this document as the running example of how to turn an ambitious-sounding

requirement into something a volunteer can actually tap on a phone. A grassroots match has 300-600

individual passes — no sideline volunteer can log every one in real time, and that is not a coding problem, it is

a physical limit on human attention. The requirement is scoped instead to the passes that actually mattered:


## Layer   How it works

Key passes & assists   One more tappable event alongside goals/cards — used only for a pass that directly

sets up a shot or goal. Assists derive automatically from these.

Build-up chain tagging   Right after a goal is logged, an optional step tags who made the final pass (assist)

and, optionally, the pass before that (secondary assist).

Post-match coach note   A free-text, subjective note, kept explicitly separate from logged stats — never

blended into charts or comparisons.

This is the template for scoping every other ambitious feature in this document: identify the version a volunteer

can reliably do live, build that, and treat anything requiring frame-by-frame precision as a separate,

honestly-labelled layer rather than folding it into the trusted stat set.


---

7   Making It More Effective — Realistic Additions

These are additions that make the platform materially more useful without threatening the timeline — they

reuse data the core loop already captures, or extend an existing interaction pattern rather than inventing a new

one.


## Feature   What it does and why it's low-risk

Fitness & load monitoring   Track minutes played per match/session and flag players approaching an informal

overuse threshold. Pure arithmetic over data already logged — no new capture step

required.

Rules-based selection engine   Weight recent minutes, form, and card accumulation into a suggested starting XI. Fully

explainable to a coach (“suggested because low minutes over the last 3 matches”) —

deliberately not a black-box model.

Head-to-head / rivalry stats   Because fixtures link two platform teams, “last 5 meetings” views come almost free from

data already stored.

Weekly digest notification   A short auto-generated summary (“3 goals, 1 card this week, next fixture Saturday”) —

small to build, large effect on how finished the product feels.

Injury / availability status   A simple status flag per player (available, doubtful, out) set by the coach — not a medical

record, just an availability signal that feeds selection and RSVP views.

Season export / report   One-click PDF or CSV export of a season's stats for a player or squad — reuses the same

derived-stats data already computed for the dashboard.


---


## 8   Building for the Top Coaches of the World

This section does not hold back on ambition, but it is deliberately honest about where the ceiling actually is.

Professional analytics providers (Stats Perform, Second Spectrum, and similar) built what you are picturing

with dedicated engineering teams over years, usually against fixed, purpose-built camera rigs — not a parent's

phone on the sideline. The features below are graded by how real that ceiling is.


## Genuinely buildable and high-impact

Video-linked highlight timeline.   This is the single most impressive-for-effort addition available. It does not

require computer vision at all: a coach uploads full match footage after the game, and because every

goal/card/sub was already logged with a timestamp during live logging, the app can auto-generate a clickable

list of moments — “goal, 34th minute   →   jump to 0:41:12 in the video.” To a professional coach this looks

exactly like an Opta-style highlight reel. To the build team it is a timestamp-offset calculation, not a detection

problem.

Fixed-camera movement analytics.   If a match is recorded from a single elevated, reasonably static angle, a

pretrained detector and tracker (for example YOLO plus a ByteTrack-style tracker) can produce rough

distance-covered and heatmap-style output per team region. This is the one part of “camera intelligence” that is

realistic in a single semester, provided expectations are capped at movement, not identity or events.

Opponent scouting reports.   Once several teams share the platform, an upcoming opponent's own logged

history (cards conceded, goals scored patterns, common scorers) can be aggregated into a pre-match scouting

summary — genuinely new value, built entirely from data the platform already has.

Benchmarking against age-group or league averages.   Once enough teams are on the platform, a player's

numbers can be shown against the average for their age group or division, not just their own history — a

feature real academies pay for, and here it falls out of aggregation queries you are already running for

standings.


## Ambitious, but scope it down hard

Automatic event detection from video   (goals, passes, cards, detected by the system rather than tagged by a

human) is the one idea in this whole document with a real chance of failure, and it is worth being specific about


## why:


## Pipeline step   Verdict   Why

Detect “a person is here”   Feasible   Pretrained models (e.g. YOLO) handle this well off the shelf.

Tell the two teams apart   Feasible   Cluster on jersey colour; workable with some error.

Track a person across frames   Feasible, with drift   Off-the-shelf trackers exist; lose lock during pile-ups or

occlusion.

Identify which player (number)   Hard   OCR on a small, blurred, fast-moving number is unreliable at

amateur video quality.

Track the ball   The real bottleneck   Small, fast, constantly occluded — unsolved at consumer

grade even by well-funded pro systems.


## Detect a pass / goal event   Not feasible without


## the above

Depends entirely on reliable ball tracking and camera

calibration this project cannot guarantee.

The honest conclusion: build the highlight timeline and the movement analytics — both real, both impressive,

both achievable. Do not attempt automatic goal/pass detection from amateur footage; keep those events


---

human-logged even on a recorded match, and treat any video-derived number as clearly labelled “estimated,”

never blended into the trusted stat set.


## Not recommended, even for the impressive tier

•   Predictive performance modelling   (“likely to score next match”) — with a handful of matches of data per

player, any prediction is statistically meaningless and reads as a gimmick to anyone who understands the

underlying sample size.

•   Full social features   (comments, likes on the public page) — pulls the product toward a social network and

away from a coaching tool; nothing in the brief calls for it.

•   Chasing broadcast-precision match timing   (GPS or whistle-sound sync) — solves a precision problem

nobody asked for; amateur football does not need it, and it is time better spent elsewhere.


---


## 9   Recommended Build Order

A suggested sequencing that keeps the hardest, most important requirement — trustworthy offline

collaborative logging — in view from week one, rather than bolted on at the end.


## Phase   What it covers

Foundation   Auth and roles, roster, basic event scheduling. Everything else depends on “who is this user,”

so this ships first even in rough form.

Core loop   Live logging (goals, cards, subs), derived stats, dashboard. This is the Basic tier and the spine

of the whole product.

Resilience   Offline capture and background sync for the event log; real-time push for live viewers.

Intermediate tier.

Collaboration   Multi-device concurrent logging with conflict flagging and resolution. Advanced tier's hardest

piece — start it early, it will not be quick.

Breadth   Fixtures, RSVPs, calendar, weather/maps, reminders, key-pass/assist tracking.

Polish & reach   League standings, rules-based suggestions, public pages, season scheduling, the

effectiveness-layer additions from section 7.

Stretch   Video-linked highlight timeline, fixed-camera movement analytics, scouting reports,

benchmarking — attempted only once everything above is solid, and each one individually

droppable without damaging the core deliverable.

The throughline across all nine sections: build the honest, human-confirmed, offline-proof core first.

Every impressive addition in sections 7 and 8 is valuable precisely because it sits on top of data that

core loop was already trustworthy enough to capture.