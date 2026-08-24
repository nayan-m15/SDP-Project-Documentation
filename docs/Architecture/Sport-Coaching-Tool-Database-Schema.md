# Sport Coaching Tool Database Schema


## Sport Coaching Tool - Database Schema   Page 1


## Sport Coaching Tool


## Database Schema

Current relational schema for authentication, teams, athletes, events, competitions, matches,

statistics and standings.


## Database   PostgreSQL (Neon)


## ORM / migrations   Drizzle ORM / drizzle-kit


## Total tables   12


## Authentication tables   4


## Application tables   8


## Enums   5

Scope note.   This document reflects the current repository schema at the time of analysis. It separates Better Auth

infrastructure from Sport Coaching Tool application data.


---


## Sport Coaching Tool - Database Schema   Page 2


## 1. Schema Overview

The database is centered around   users   and   teams . Better Auth manages identity, sessions, authentication accounts

and verification records. Application tables then model team membership, athletes, scheduled events, competitions,

match details, per-athlete match statistics and competition standings.

A user may belong to multiple teams through the   team_members   junction table. Each team owns its athletes, events

and competitions. Match-specific data extends an event through a one-to-one   matches   record. Athlete statistics are

captured per match through   athlete_match_stats .


## Entity Relationship Diagram

Diagram labels show primary keys (PK), foreign keys (FK), unique keys (UK), and high-level relationship cardinalities.


---


## Sport Coaching Tool - Database Schema   Page 3


## 2. Better Auth Tables

These tables support authentication and identity. The   user   table is extended by the application with profile fields for

phone number, sex and date of birth.


## user

Purpose:   Registered users and core identity data, extended with profile information.


## Column   Type   Key   Nullable   Description


## id   text   PK   No   Better Auth user identifier


## name   text   -   No   Display name


## email   text   Unique   No   Login identifier

email_verified   boolean   -   No   Email verification status


## image   text   -   Yes   Avatar URL

phone_number   text   -   Yes   Profile phone number

sex   sex enum   -   Yes   male / female / prefer_not_to_say

date_of_birth   date   -   Yes   Profile date of birth

created_at   timestamptz   -   No   Created timestamp

updated_at   timestamptz   -   No   Updated timestamp


## session

Purpose:   Active authentication sessions associated with a user.


## Column   Type   Key   Nullable   Description


## id   text   PK   No   Session identifier

expires_at   timestamptz   -   No   Session expiry


## token   text   Unique   No   Session token


## ip_address   text   -   Yes   Client IP


## user_agent   text   -   Yes   Browser user agent

user_id   text   FK -> user.id   No   Session owner


## account

Purpose:   Credential and OAuth account information associated with a user.


## Column   Type   Key   Nullable   Description


## id   text   PK   No   Account identifier

account_id   text   -   No   External/provider account id


## provider_id   text   -   No   credential / google

user_id   text   FK -> user.id   No   Account owner


## access_token   text   -   Yes   OAuth token

refresh_token   text   -   Yes   OAuth refresh token

password   text   -   Yes   Password hash for credential provider


## verification


---


## Sport Coaching Tool - Database Schema   Page 4

Purpose:   One-time verification records such as email verification tokens.


## Column   Type   Key   Nullable   Description


## id   text   PK   No   Verification record id

identifier   text   -   No   Usually the email address


## value   text   -   No   Verification token/hash


## expires_at   timestamptz   -   No   Expiry time


---


## Sport Coaching Tool - Database Schema   Page 5


## 3. Sport Coaching Tool Application Tables

These tables represent the operational domain of the coaching platform.


## teams

Purpose:   A football team and the central organizational entity in the application.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Team id


## name   text   -   No   Team name

created_at   timestamptz   -   No   Created timestamp

updated_at   timestamptz   -   No   Updated timestamp


## team_members

Purpose:   Junction table linking users to teams and assigning coach/assistant roles.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Membership row id


## team_id   uuid   FK -> teams.id   No   Team


## user_id   text   FK -> user.id   No   User

role   team_role enum   -   No   coach / assistant


## athletes

Purpose:   Players belonging to a team, with soft archive support.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Athlete id

team_id   uuid   FK -> teams.id   No   Owning team


## first_name   text   -   No   First name


## last_name   text   -   No   Last name


## date_of_birth   date   -   Yes   Date of birth


## position   text   -   Yes   Playing position


## squad_number   integer   -   Yes   Jersey number

archived_at   timestamptz   -   Yes   Soft-delete/archive timestamp


---


## Sport Coaching Tool - Database Schema   Page 6


## events

Purpose:   Scheduled team activities such as matches, training sessions and meetings.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Event id

team_id   uuid   FK -> teams.id   No   Owning team


## title   text   -   No   Event title

type   event_type enum   -   No   match / training / meeting

status   event_status enum   -   No   scheduled / cancelled / completed


## scheduled_at   timestamptz   -   No   Start time


## location   text   -   No   Venue/address


## notes   text   -   Yes   Optional notes


## competitions

Purpose:   Leagues, cups or friendlies associated with a team and season.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Competition id

team_id   uuid   FK -> teams.id   No   Owning team


## name   text   -   No   Competition name


## type   competition_type


## enum


## -   No   league / cup / friendly


## season   text   -   Yes   Season label


## matches

Purpose:   Extended match data linked one-to-one with an event.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Match id

event_id   uuid   FK + Unique   No   1:1 link to event

competition_id   uuid   FK   Yes   Optional competition


## opponent_name   text   -   No   Opponent


## is_home   boolean   -   No   Home/away flag


## team_score   integer   -   No   Own score

opponent_score   integer   -   No   Opponent score


---


## Sport Coaching Tool - Database Schema   Page 7


## athlete_match_stats

Purpose:   Per-athlete statistics for a specific match.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Stat row id


## match_id   uuid   FK -> matches.id   No   Match

athlete_id   uuid   FK -> athletes.id   No   Athlete


## started   boolean   -   No   Started match

minutes_played   integer   -   Yes   Minutes played


## goals   integer   -   No   Goals


## assists   integer   -   No   Assists


## yellow_cards   integer   -   No   Yellow cards


## red_cards   integer   -   No   Red cards


## standings

Purpose:   Competition standings rows entered for league/cup tables.


## Column   Type   Key   Nullable   Description


## id   uuid   PK   No   Standing row id

competition_id   uuid   FK -> competitions.id   No   Competition


## team_name   text   -   No   Free-text team name


## position   integer   -   No   Table position


## played   integer   -   No   Played


## won   integer   -   No   Won


## drawn   integer   -   No   Drawn


## lost   integer   -   No   Lost


## goals_for   integer   -   No   Goals for


## goals_against   integer   -   No   Goals against


## points   integer   -   No   Points

is_own_team   boolean   -   No   Highlights own team


---


## Sport Coaching Tool - Database Schema   Page 8


## 4. Relationships and Delete Behavior

The following relationships are enforced through foreign keys. Most child records use   ON DELETE CASCADE   so

dependent data is removed when a parent is deleted. The competition link on matches is the exception: deleting a

competition sets   matches.competition_id   to NULL so the match record is retained.


## Parent   Child FK   Cardinality   On delete


## user.id   session.user_id   1-to-many   CASCADE


## user.id   account.user_id   1-to-many   CASCADE

user.id   team_members.user_id   1-to-many   CASCADE

teams.id   team_members.team_id   1-to-many   CASCADE


## teams.id   athletes.team_id   1-to-many   CASCADE


## teams.id   events.team_id   1-to-many   CASCADE

teams.id   competitions.team_id   1-to-many   CASCADE

events.id   matches.event_id   1-to-0..1   CASCADE

competitions.id   matches.competition_id   1-to-many   SET NULL

competitions.id   standings.competition_id   1-to-many   CASCADE

matches.id   athlete_match_stats.match_id   1-to-many   CASCADE

athletes.id   athlete_match_stats.athlete_id   1-to-many   CASCADE

Implicit many-to-many relationships:   users and teams are many-to-many through   team_members ; matches and

athletes are many-to-many through   athlete_match_stats , which also stores performance data.


---


## Sport Coaching Tool - Database Schema   Page 9


## 5. Enumerations


## Enum   Allowed values   Used in


## sex   male, female, prefer_not_to_say   user.sex


## team_role   coach, assistant   team_members.role

event_type   match, training, meeting   events.type

event_status   scheduled, cancelled, completed   events.status

competition_type   league, cup, friendly   competitions.type


## 6. Design Notes

Athlete soft archive.   The   athletes.archived_at   column is the only soft-delete field in the current schema. A non-null

value indicates an archived athlete; restoring an athlete clears the timestamp.

Match extension.   matches.event_id   is unique, enforcing at most one match row per event. This allows common

scheduling information to remain in   events   while match-specific score/opponent data is separated.

Standings.   standings.team_name   is stored as free text rather than a foreign key to   teams . This supports recording

opponents that are not registered as teams in the application.

Profile data.   The Better Auth   user   table is extended with phone number, sex and date of birth. The existing   image

field is reused for avatar URLs.

Authentication.   The schema supports email/password and Google OAuth through Better Auth. Session/account

child rows cascade when a user is deleted.


## Implementation note

Repository analysis identified an orphan migration file named   0002_absent_the_stranger.sql   that is not listed in the

Drizzle migration journal and appears to duplicate a later migration. This should be reviewed by the development

team before cleanup; it is not represented as part of the applied schema in this document.