# API contracts — MusicSplit

## `GET /api/v1/tracks`

Tracks

**Response:**
```json
{
  "tracks": [
    {
      "id": "tr_1",
      "title": "Sol",
      "streams": 124000,
      "royaltiesUSD": 184
    }
  ]
}
```

## `GET /api/v1/splits`

Splits

**Response:**
```json
{
  "trackId": "tr_1",
  "collaborators": [
    {
      "name": "Ana",
      "pct": 50
    },
    {
      "name": "Juan",
      "pct": 50
    }
  ]
}
```

## `POST /api/v1/splits`

Crear split

**Request:**
```json
{
  "trackId": "tr_1",
  "collaborators": [
    {
      "wallet": "0xa",
      "pct": 50
    }
  ]
}
```

**Response:**
```json
{
  "contractAddress": "0xnew",
  "deployedAt": "2026-05-19T15:14:47.107Z"
}
```

## `POST /api/v1/payout`

Payout

**Request:**
```json
{
  "trackId": "tr_1"
}
```

**Response:**
```json
{
  "distributed": 184,
  "currency": "USDC",
  "txHash": "0xtx"
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
      "title": "Bienvenido a musicsplit",
      "read": false,
      "at": "2026-05-19T15:14:47.110Z"
    },
    {
      "id": "n_2",
      "type": "success",
      "title": "Sincronización completa",
      "read": true,
      "at": "2026-05-19T15:14:47.110Z"
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
