# Sport Coaching Tool – Functional Requirements and System Analysis

*Formal Analysis of the Proposed Web Application*

---

## 1. Introduction

The Sport Coaching Tool is a web application intended to give football coaches a single platform for managing athletes, organising events, recording match and training activity, and reviewing performance over time. The system is designed around the practical needs of a coach who may need to record information during an event, often in circumstances where internet connectivity is unreliable.

The specification is divided into Basic, Intermediate and Advanced requirements. These levels should be treated as stages of development rather than as three unrelated systems. The core design should support the later requirements while allowing the initial implementation to remain manageable.

## 2. Purpose and Scope

The primary purpose of the application is to replace fragmented methods of managing a football squad and recording match information with one integrated system. The application should support the full cycle of coaching activity: managing the squad, planning events, recording what happens during those events, and using the resulting information to understand performance.

The system should therefore provide the following broad areas of functionality:

- Athlete and squad management.
- Competition and training event management.
- Live event and match tracking.
- Automatic calculation of athlete and event statistics.
- Historical records and performance analysis.
- User accounts, roles and permissions.
- Fixture planning, RSVPs and shared scheduling.
- Offline-first event recording and background synchronisation.
- Collaborative event recording across multiple devices.
- League, reporting and season-planning functionality.

## 3. Recommended Sport: Football

Although the specification is intended to be adaptable to different sports, football is the most appropriate choice for this project. It provides a clear set of athletes, events, statistics and match actions while being sufficiently complex to demonstrate the required functionality.

For football, the application can distinguish between two primary event types:

- Matches or competitions, which have an opponent, result and match statistics.
- Training sessions, which can record attendance, training activity and related notes.

A suitable initial set of live football actions is:

- Goal
- Assist
- Shot
- Shot on target
- Foul
- Yellow card
- Red card
- Substitution
- Save

## 4. Functional Requirements

### 4.1 Athlete Management

The coach must be able to create and maintain a roster of athletes. Athlete information should remain editable so that changes can be reflected throughout the system.

- Add an athlete to the squad.
- View the current roster.
- Edit athlete information.
- Deactivate an athlete who is no longer part of the active squad.
- View an individual athlete's profile and statistics.

A football athlete profile may contain:

- Full name
- Date of birth
- Position
- Squad number
- Preferred foot
- Contact information
- Active or inactive status
- Profile photograph, where appropriate

### 4.2 Event Management

Coaches must be able to create and manage both matches and training sessions. Events should contain at least a date, time and location.

- Create an event.
- Specify whether the event is a match or training session.
- Set the date, time and location.
- Edit event details.
- Cancel an event.
- View upcoming and completed events.
- Record notes and relevant event information.

For matches, additional information should include the opponent, competition and home/away status.

### 4.3 Live Event Tracking

Live event tracking is the central feature of the application. The coach or an authorised assistant should be able to record actions as they happen instead of entering statistics after the match.

- Start an event in live mode.
- Display a live event timer or match clock.
- Record actions against the responsible athlete.
- Display actions in chronological order.
- Edit incorrectly recorded actions.
- Undo or remove an incorrect action.
- Display the current result while the event is in progress.
- Complete the event and preserve its final record.

### 4.4 Event Log as the Source of Truth

The system should treat the event log as the primary source of match information. Rather than maintaining manually entered totals for goals, shots or cards, the application should derive these statistics from the individual recorded actions.

For example, if five valid goal entries exist for an athlete, the athlete's goal total should be five. This approach reduces inconsistencies and provides a complete history of what occurred during an event.

### 4.5 Results and Penalties

Each completed match should retain a permanent record of its result and penalties. For football, the final score should be calculated from the recorded goal events where possible.

- Final score.
- Goals and goal times.
- Cards and other penalties.
- Relevant player actions.
- Date, venue and opponent.
- A complete event timeline.

### 4.6 Dashboard

The dashboard should change according to the user's current context. During a live event it should prioritise immediate event information. Outside an event it should provide a summary of the squad, upcoming events and recent performance.

- Live event view when a match or training session is active.
- Upcoming events.
- Recent results.
- Roster summary.
- Per-athlete performance summaries.
- Important season statistics.

## 5. Intermediate Requirements

### 5.1 Multiple Users, Roles and Permissions

The application must support more than one person working with a squad. Coaches, assistants and helpers should have accounts, with permissions controlling what they are allowed to do.

A suitable initial permission model is:

- **Coach:** full control over the squad, events, users and records.
- **Assistant:** able to participate in event tracking and selected planning activities, but not modify the roster.
- **Helper:** primarily able to record or view event information.

Authentication determines who a user is, while authorisation determines which actions that user may perform.

### 5.2 Fixture Planning and RSVPs

Coaches should be able to arrange fixtures with other users of the platform. A fixture may be sent to another coach for acceptance, and athletes should be able to indicate their availability.

- Create fixture invitations.
- Accept or decline fixtures.
- Propose changes where supported.
- Collect athlete RSVPs.
- Show available, unavailable and pending athletes.
- Use availability when preparing a squad.

### 5.3 Shared Calendar

All relevant events should be displayed on a shared calendar. The calendar should provide a clear view of matches, training sessions and other planned activities.

### 5.4 Statistics, Trends and Comparisons

The statistics system should progress beyond individual event totals and provide season-level analysis.

- Season totals.
- Per-event statistics.
- Performance trends.
- Charts showing changes over time.
- Athlete-versus-athlete comparisons.
- Squad-versus-opponent comparisons.
- Team performance across a season.

### 5.5 External Services

External services may be integrated where they provide practical value to the coach.

- Weather information for an upcoming event.
- Map and venue information.
- Directions or location information where appropriate.
- Event reminders and notifications.

## 6. Offline-First Operation

Offline operation is a significant requirement because live sporting events may take place in locations with poor or unavailable connectivity. Event logging must therefore not depend on a continuous internet connection.

The web application should store live event entries locally on the device. When connectivity is restored, the application should synchronise the locally stored information with the central server in the background.

A suitable architecture is:

1. The user records an event.
2. The event is immediately saved to local storage.
3. The event appears in the live timeline without waiting for the server.
4. The event is placed into a synchronisation queue.
5. When connectivity becomes available, the queue is uploaded.
6. The server confirms the synchronisation.
7. The local record is marked as synchronised.

For a web application, IndexedDB is a suitable technology for storing event records locally. The interface should clearly indicate whether the device is online and whether there are pending records waiting to synchronise.

## 7. Advanced Collaborative Logging

The most technically demanding requirement is allowing several assistants to record the same event at the same time, potentially while some devices are offline. When devices reconnect, their records must be merged without losing valid entries or creating incorrect results.

The architecture should therefore treat individual event entries as independent records with unique identifiers, timestamps and information about their origin. Statistics should then be calculated from the resulting event log.

A key design objective is consistency. If several users record actions during the same match, every connected device should eventually arrive at the same event history, score and penalty totals.

## 8. Advanced Analytics and Platform Features

### 8.1 League and Standings

The platform should provide a league or standings view where appropriate. Football standings can include matches played, wins, draws, losses, goals for, goals against, goal difference and points.

### 8.2 Automated Performance Summaries

The system should be able to analyse recorded statistics and produce useful summaries. This does not require an AI model; rule-based statistical analysis can provide meaningful results.

- Identify athletes with strong recent performances.
- Highlight changes in performance over time.
- Identify scoring or assisting streaks.
- Summarise recent team performance.
- Identify areas where performance has improved or declined.

### 8.3 Selection Suggestions

Where appropriate, the system may recommend a squad or starting lineup based on recorded performance, availability and player positions. Recommendations should support the coach's decision rather than replace it.

### 8.4 Public Squad Page

The coach should be able to publish selected information about the squad on a public page. The coach must control which information is visible.

- Squad name and summary.
- Selected athlete information.
- Recent results.
- Season statistics.
- Shareable event results.

### 8.5 Reports and Exports

The system should provide exportable reports for matches, athletes and seasons. A formal match report could contain the final result, goals, penalties, event timeline and relevant statistics.

- PDF match reports.
- CSV or spreadsheet exports for statistical data.
- Season summaries.

### 8.6 Season Planning

The season planner should assist the coach in arranging training and competitive fixtures. It should identify scheduling conflicts and other problems that may affect the planned season.

- Generate or assist with a season schedule.
- Identify overlapping events.
- Highlight athlete availability conflicts.
- Identify venue conflicts.
- Provide an overview of the planned season.

## 9. Recommended System Architecture

The system should be designed around a clear separation between the user interface, application logic, central database and local offline storage.

A high-level structure is:

- **Web interface:** dashboard, roster, event management, live tracking and analytics.
- **Application/API layer:** authentication, permissions, event processing, statistics and synchronisation.
- **Central database:** users, teams, athletes, events, event logs, fixtures and results.
- **Local device storage:** offline event records and pending synchronisation operations.
- **External services:** weather, maps and notifications.

## 10. Core Data Model

The following entities provide a reasonable foundation for the application:

- **User** – account and authentication information.
- **Team** – squad or club managed on the platform.
- **TeamMember** – relationship between users and a team, including their role.
- **Athlete** – player information and roster membership.
- **Event** – match or training session.
- **EventParticipant** – athletes participating in an event.
- **RSVP** – athlete availability for an event.
- **EventLog** – individual actions recorded during an event.
- **EventType** – supported football actions such as goals, cards and shots.
- **Season** – groups events and statistics into a season.
- **Fixture** – planned competitive fixture and opponent information.
- **Notification** – reminders and other user notifications.
- **SyncQueue** – local records waiting to be synchronised.

The most important relationship is between Event and EventLog. An event can contain many event-log entries, and each entry can be associated with an athlete. Athlete and team statistics can then be calculated from these records.

## 11. Recommended Application Structure

- **Dashboard** – overview of the squad, upcoming events and recent results.
- **Athletes** – roster management and individual profiles.
- **Events** – creation, editing and history of matches and training sessions.
- **Live Tracking** – real-time event recording.
- **Calendar** – shared schedule and fixture planning.
- **Statistics** – event and season performance.
- **Compare** – athlete and team comparisons.
- **League** – standings and competitive results.
- **Reports** – generated reports and exports.
- **Season Planner** – long-term scheduling and conflict detection.
- **Settings** – users, roles, team information and system preferences.

## 12. Recommended Development Plan

### Phase 1 – Foundation

- Set up the web application and database.
- Implement authentication.
- Create users, teams and team membership.
- Implement basic roles and permissions.

### Phase 2 – Athlete Management

- Create the athlete model.
- Build roster management.
- Build athlete profiles.
- Add editing and athlete activation/deactivation.

### Phase 3 – Event Management

- Create matches and training sessions.
- Add dates, times and locations.
- Implement editing and cancellation.
- Build upcoming and completed event views.

### Phase 4 – Live Event Tracking

- Build the live event interface.
- Implement the match timer.
- Implement football event recording.
- Add edit and undo functionality.
- Calculate the live score.

### Phase 5 – Statistics and History

- Derive athlete statistics from the event log.
- Build event summaries.
- Build athlete history.
- Build season totals.

### Phase 6 – Dashboard and Analysis

- Create the main dashboard.
- Add charts and performance trends.
- Implement athlete comparisons.
- Implement team-versus-opponent comparisons.

### Phase 7 – Intermediate Collaboration

- Add assistants and helpers.
- Implement detailed permissions.
- Add fixtures and RSVPs.
- Add the shared calendar.
- Integrate weather and mapping services.
- Add reminders.

### Phase 8 – Offline Operation

- Add IndexedDB storage.
- Implement offline event recording.
- Create the synchronisation queue.
- Implement background synchronisation.
- Test recovery from lost connectivity.

### Phase 9 – Advanced Collaboration

- Allow multiple devices to record the same event.
- Implement event merging.
- Handle duplicate and conflicting entries.
- Ensure consistent results across devices.

### Phase 10 – Advanced Features

- Add league standings.
- Add automated performance summaries.
- Add selection recommendations.
- Create public squad pages.
- Add reports and exports.
- Implement season planning and clash detection.

## 13. Recommended Minimum Viable Product

The first complete version should focus on a small but functional set of features rather than attempting to implement every advanced requirement immediately.

The recommended MVP consists of:

- User authentication.
- Coach and team management.
- Athlete roster and profiles.
- Match and training event management.
- Live football event tracking.
- Editing and undoing event entries.
- Automatically derived event and athlete statistics.
- Match results and event history.
- A dashboard.
- Basic user roles and permissions.
- Offline event recording.
- Synchronisation when connectivity returns.

Once this version is reliable, the intermediate and advanced requirements can be added without changing the fundamental concept of the application.

## 14. Key Design Principle

The most important architectural principle is that the event log should be treated as the source of truth. A goal, card, shot or other action should be recorded as an individual event. Scores, penalties and player statistics should be calculated from these records rather than maintained as unrelated manual totals.

This approach provides three major benefits. First, it preserves a detailed history of what happened. Second, it makes statistics easier to verify and correct. Third, it provides a strong foundation for offline synchronisation and collaborative event recording.

## 15. Conclusion

The Sport Coaching Tool is more than a standard athlete management or statistics application. Its central purpose is to provide coaches with a reliable system for managing a squad and recording sporting activity at the point when it happens.

The Basic requirements establish the core workflow: manage athletes, organise events, record live activity and preserve the resulting statistics and history. The Intermediate requirements introduce collaboration, planning, external information and offline operation. The Advanced requirements extend the system into a collaborative and analytical platform capable of handling multiple devices, league information, automated insights, public results and season planning.

For a football implementation, the most important technical decision is to build the application around an event log. If this foundation is designed correctly, the same records can support live scores, athlete statistics, historical records, comparisons, reports and future synchronisation. The project should therefore be developed incrementally, with a reliable live tracking system forming the foundation for the more advanced features.