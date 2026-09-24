# Gaffer Public API Reference

> **Availability status — verified 14 September 2026:** implemented and tested in application source at commit `e7285f533b854c4da753c73e22a2a38f580588dc`; deployment verification is pending. The four documented deployed route URLs returned HTTP 404, and the deployed OpenAPI JSON contained neither these routes nor the `Public API` tag. Do not describe this API as live or externally available yet.

## Which API is this?

This page began as the small unauthenticated reference catalog for third-party/rubric use. The 24 September source also exposes an anonymous public dashboard:

- `GET /v1/formations`
- `GET /v1/tactics`
- `GET /v1/public-dashboard/filters`
- `GET /v1/public-dashboard/matches`
- `GET /v1/public-dashboard/players`
- `GET /v1/public-dashboard/team-statistics`

The formations/tactics routes return static coaching reference data. The public dashboard routes expose filtered match, player and team statistics from the service, so their privacy scope needs review before production confirmation. The separate [application REST API guide](api-guide.md) covers the broader first-party API used by the frontend; most of those routes require a Better Auth cookie and team-scoped authorisation. Neither API is the Open-Meteo external integration used by Gaffer for place search and weather.

## Public dashboard source contract

`GET /v1/public-dashboard/filters` returns `{success:true,data}`. `GET /matches` accepts optional UUID `teamId`, `competitionId`, `seasonId`, `status` (`scheduled`, `cancelled`, `completed`), integer `limit` 1–100 (default 50) and nonnegative `offset` (default 0). `GET /players` accepts the UUID filters, `limit` 1–500 (default 200) and `offset` (default 0). Both return `{success,count,limit,offset,data}`. `GET /team-statistics` accepts the UUID filters and returns `{success,count,data}`. Query validation rejects malformed values; the service decides which source fields are public. See [source controller](https://github.com/nayan-m15/Gaffer/blob/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/public-api/public-dashboard.controller.ts), [query schemas](https://github.com/nayan-m15/Gaffer/blob/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/public-api/public-api.schemas.ts) and [privacy policy](privacy-policy.md).

## Intended base URLs

| Route path | Backend (direct) | Frontend proxy |
| --- | --- | --- |
| `/v1/formations` | `https://gaffer-api-ynaf.onrender.com/v1/formations` | `https://gaffer-virid.vercel.app/api/v1/formations` |
| `/v1/tactics` | `https://gaffer-api-ynaf.onrender.com/v1/tactics` | `https://gaffer-virid.vercel.app/api/v1/tactics` |

All four returned 404 on 14 September 2026. These are intended URLs, not currently verified endpoints.

## Source contract

- No authentication or credentialed CORS is intended for these two GET-only routes.
- Source config returns `Access-Control-Allow-Origin: *` on public-API paths while retaining the normal credentialed allow-list for the application API.
- Listing returns all records. Supplying `?id=` returns a one-record `data` array.
- An empty `id` returns 400; an unknown identifier returns 404.

```json
{ "success": true, "count": 1, "data": [{ "...": "record" }] }
```

## `GET /v1/formations`

Returns eight supported formation records, or one when `id` is supplied. `PublicFormation` fields are `id`, `name`, `shape` and `description`, all strings.

| Parameter | Type | Required | Behaviour |
| --- | --- | ---: | --- |
| `id` | string | No | For example `4-3-3`; empty returns 400 and unknown returns 404. |

```json
{
  "success": true,
  "count": 1,
  "data": [{
    "id": "4-3-3",
    "name": "4-3-3",
    "shape": "4-3-3",
    "description": "A balanced formation with width in attack and a three-player midfield that can dominate possession."
  }]
}
```

## `GET /v1/tactics`

Returns defensive and offensive tactical-style records, or one when `id` is supplied. `PublicTactic` fields are `id`, `name`, `category` (`defensive` or `offensive`), `description` and `formationId` (currently `null`).

| Parameter | Type | Required | Behaviour |
| --- | --- | ---: | --- |
| `id` | string | No | For example `possession`; empty returns 400 and unknown returns 404. |

```json
{
  "success": true,
  "count": 1,
  "data": [{
    "id": "possession",
    "name": "Possession",
    "category": "offensive",
    "description": "Short passing and support runs to keep the ball rather than break early.",
    "formationId": null
  }]
}
```

## Errors

| Status | Meaning |
| ---: | --- |
| 400 | `id` was present but empty. |
| 404 | The identifier is unknown. At present, a deployed-route 404 may instead mean the deployed revision lacks the route. |
| 500 | Unhandled server error. |

## Deployment verification gate

After a newer backend is deployed, record its exact revision and date, then verify list and filtered requests, empty-filter 400 and unknown-ID 404 responses, direct and proxy URLs, unauthenticated CORS, and Swagger/OpenAPI inclusion under `Public API`. Only then should this page claim live availability.
