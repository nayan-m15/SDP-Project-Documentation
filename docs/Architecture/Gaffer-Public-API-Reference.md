# Gaffer Public API Reference

**Formations & tactics · read-only · no authentication**

**Version:** v1.0.0

---

## Overview

Gaffer publishes a small, externally accessible, read-only API of generic coaching reference content: supported football formations and tactical approaches.

It requires no login and returns no team, player, or account data.

### Base URLs

**Frontend (proxied)**

```text
https://gaffer-virid.vercel.app/api/v1/formations
```

**Backend (direct)**

```text
https://gaffer-api-ynaf.onrender.com/v1/formations
```

---

## Security & Access

- No authentication is required — every route documented here is public by design.
- `GET` only. There are no create, update, or delete endpoints on this API.
- CORS is open with `Access-Control-Allow-Origin: *` for these public routes specifically.
- Every other Gaffer endpoint keeps its normal cookie-authenticated, allow-listed CORS policy.
- Responses contain sanitized, static reference data only.
- No player, coach, team, email, or session data is returned.

---

## Response Envelope

Both endpoints use the same response envelope.

Listing an endpoint returns every record. Adding `?id=` narrows the response to one record while still returning the result inside a single-item `data` array.

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "...": "record"
    }
  ]
}
```

---

## Interactive Documentation

A live, testable Swagger UI is available on the backend:

```text
https://gaffer-api-ynaf.onrender.com/api/docs
```

The public routes are grouped under the **Public API** tag.

---

# Formations API

## `GET /v1/formations`

Returns the catalog of supported football formations, or a single formation when an `id` query parameter is supplied.

### Query Parameters

| Name | Type | Required | Description |
|---|---|---:|---|
| `id` | `string` | No | Formation ID to fetch, for example `4-3-3`. An empty string returns HTTP 400. |

### Example: List All Formations

#### Request

```http
GET https://gaffer-virid.vercel.app/api/v1/formations
```

#### Response

```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "id": "4-3-3",
      "name": "4-3-3",
      "shape": "4-3-3",
      "description": "A balanced formation with width in attack and a three-player midfield that can dominate possession."
    }
  ]
}
```

The complete response contains eight supported formations.

### Example: Get One Formation by ID

#### Request

```http
GET https://gaffer-virid.vercel.app/api/v1/formations?id=4-3-3
```

#### Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "4-3-3",
      "name": "4-3-3",
      "shape": "4-3-3",
      "description": "A balanced formation with width in attack and a three-player midfield that can dominate possession."
    }
  ]
}
```

---

# Tactics API

## `GET /v1/tactics`

Returns the catalog of supported defensive and offensive tactical styles, or a single tactic when an `id` query parameter is supplied.

`formationId` is always `null` because tactical styles apply across formations rather than to one specific formation shape.

### Query Parameters

| Name | Type | Required | Description |
|---|---|---:|---|
| `id` | `string` | No | Tactic ID to fetch, for example `possession`. An empty string returns HTTP 400. |

### Example: Get One Tactic by ID

#### Request

```http
GET https://gaffer-virid.vercel.app/api/v1/tactics?id=possession
```

#### Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "possession",
      "name": "Possession",
      "category": "offensive",
      "description": "Short passing and support runs to keep the ball rather than break early.",
      "formationId": null
    }
  ]
}
```

### Tactic Categories

The `category` field is either:

- `defensive`
- `offensive`

Supported defensive styles:

- Drop back
- Balanced
- Pressure on heavy touch
- Press after possession loss
- Constant pressure

Supported offensive styles:

- Possession
- Balanced
- Fast build up
- Long ball

---

# Errors

The following errors are shared across both endpoints.

| Status | Cause | Body |
|---:|---|---|
| `400` | `?id=` is present but empty | `{ statusCode, message, error: "Bad Request" }` |
| `404` | Unknown ID | `{ statusCode, message, error: "Not Found" }` |
| `500` | Unhandled server error | Nest's default internal error body |

---

# Data Dictionary

## `PublicFormation`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable identifier, e.g. `4-3-3`. Mirrors `FORMATION_IDS`. |
| `name` | `string` | Display name. |
| `shape` | `string` | Formation shape string, e.g. `4-3-3`. |
| `description` | `string` | One-line description of the formation. |

## `PublicTactic`

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable identifier, e.g. `possession`. |
| `name` | `string` | Display name. |
| `category` | `"defensive" \| "offensive"` | Which side of play the style applies to. |
| `description` | `string` | One-line description of the style's trade-off. |
| `formationId` | `string \| null` | Always `null` — styles are formation-agnostic. |

---

**Gaffer · The Football Coaching Platform**
