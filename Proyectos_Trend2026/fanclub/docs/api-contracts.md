# API contracts — FanClub

## `GET /api/v1/creators`

Creators

**Response:**
```json
{
  "creators": [
    {
      "handle": "@band",
      "fans": 8400,
      "tiers": [
        {
          "name": "bronze",
          "priceUSD": 5
        },
        {
          "name": "gold",
          "priceUSD": 20
        }
      ]
    }
  ]
}
```

## `GET /api/v1/events`

Eventos

**Response:**
```json
{
  "events": [
    {
      "id": "ev_1",
      "title": "Sesión Q&A",
      "date": "2026-05-26T19:00",
      "tier": "gold"
    }
  ]
}
```

## `POST /api/v1/join`

Unirse al evento

**Request:**
```json
{
  "eventId": "ev_1"
}
```

**Response:**
```json
{
  "rtcToken": "tk_001",
  "validUntilSec": 3600
}
```

## `POST /api/v1/messages`

Mensaje DM

**Request:**
```json
{
  "creatorHandle": "@band",
  "text": "hola"
}
```

**Response:**
```json
{
  "messageId": "m_001",
  "delivered": true
}
```

## `GET /api/v1/metrics`

Métricas del servicio

**Response:**
```json
{
  "requestsPerMinute": 142,
  "p50Ms": 18,
  "p95Ms": 86,
  "errorRate": 0.004,
  "statusCodes": {
    "200": 1820,
    "400": 12,
    "404": 4,
    "500": 1
  }
}
```

## `GET /api/v1/notifications`

Notificaciones del usuario

**Response:**
```json
{
  "items": [
    {
      "id": "n_1",
      "type": "info",
      "title": "Bienvenido a fanclub",
      "read": false,
      "at": "2026-05-19T15:14:47.109Z"
    },
    {
      "id": "n_2",
      "type": "success",
      "title": "Sincronización completa",
      "read": true,
      "at": "2026-05-19T15:14:47.109Z"
    }
  ]
}
```

## `POST /api/v1/search`

Búsqueda global

**Request:**
```json
{
  "query": "demo"
}
```

**Response:**
```json
{
  "results": [
    {
      "type": "doc",
      "id": "s_1",
      "title": "Resultado mock",
      "score": 0.84
    }
  ]
}
```

## `POST /api/v1/batch`

Operación batch

**Request:**
```json
{
  "items": []
}
```

**Response:**
```json
{
  "batchId": "b_001",
  "accepted": 12,
  "queued": 12
}
```
