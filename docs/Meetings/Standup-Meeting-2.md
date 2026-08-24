# Daily Standup Meeting 2

**Date:** Tue, 18 August 2026

## Announcements

- Sprint 1 development is ongoing.
- Team members are working on their individually assigned Sprint 1 user stories and integrating their work through the agreed Git workflow.
- Features are being developed on separate feature branches before integration into the `development` branch.
- The team is continuing to update the project documentation alongside implementation.

## Updates

### Team Progress

- Core project setup and architecture are in place.
- Authentication work is underway to support protected application functionality.
- Work is progressing on the main dashboard and application interface.
- Team-management functionality is being developed to support coaches and their teams.
- Event-management functionality is being developed for creating and managing team activities.
- Athlete Roster functionality is being developed to allow coaches to manage the players belonging to their team.
- The athlete data model supports information including:
  - First name
  - Last name
  - Date of birth
  - Position
  - Squad number
- Athlete records are scoped to teams so that coaches only access athletes belonging to the appropriate team.
- Athlete archiving is being implemented as a soft delete, allowing archived athletes to be restored rather than permanently deleting their records.
- Frontend work is being integrated with the backend functionality as Sprint 1 progresses.

## Development Workflow

The team is following the agreed Git workflow:

- Development is performed on feature branches.
- Feature work is integrated into `development` before being merged into `main`.
- Changes should be tested before integration.
- Commits follow the team's agreed naming conventions.
- Database changes are handled using Drizzle migrations rather than manually editing the Neon database.
- Team members are expected to pull recent changes before continuing work to reduce integration conflicts.

## Current Sprint Focus

The team's immediate Sprint 1 focus includes:

- Completing authentication and protected access.
- Completing athlete roster management.
- Completing event-management functionality.
- Completing team-management functionality.
- Integrating frontend and backend features.
- Testing completed user stories.
- Resolving integration and UI issues as features are combined.
- Keeping Sprint 1 documentation aligned with implementation progress.

## Blockers / Risks

- Integration between independently developed frontend and backend features may require additional debugging.
- Authentication is a dependency for features that need to be scoped to the currently logged-in coach or team.
- Team-scoped data must be handled carefully to prevent users from accessing another team's information.
- Database changes need to be coordinated through migrations to prevent inconsistencies between team members' environments.
- More advanced functionality may need to be deferred if the core Sprint 1 requirements are not completed first.

## Client Discussion / Feedback

- Continue prioritising the core Sprint 1 functionality before moving on to more advanced features.
- Ensure that implemented functionality can be demonstrated reliably.
- Keep project documentation updated as development progresses.
- Maintain clear evidence of Sprint progress through the team's work tracker and repository.

## Action Items

### Team

- Continue completing assigned Sprint 1 user stories.
- Complete and test athlete roster functionality.
- Continue authentication, event-management and team-management integration.
- Test frontend/backend integration as features are completed.
- Keep feature branches updated with recent development changes.
- Follow the agreed Git and database-migration workflow.
- Update Sprint documentation and work-tracker progress.
- Identify functionality that cannot realistically be completed during Sprint 1 and move it to later backlog work where appropriate.

### Before the Next Client Standup

- Review progress against the Sprint 1 backlog.
- Identify completed, in-progress and outstanding user stories.
- Prepare any blockers or technical issues that require client feedback.

## Proof of Meeting

*Meeting commenced at:** 15:30 on 18/08/2026*

Discord voice call

<img src="https://github.com/nayan-m15/SDP-Project-Documentation/blob/main/assets/StandUp_2_Meeting.png?raw=true" alt="Stand Up Meeting 2">
