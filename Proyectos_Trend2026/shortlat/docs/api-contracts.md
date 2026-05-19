# API contracts — ShortLAT

## `GET /api/v1/feed`

Feed

**Response:**
```json
{
  "items": [
    {
      "id": "v_1",
      "creator": "@ana",
      "views": 142000,
      "durationSec": 24,
      "palette": "sunset"
    }
  ]
}
```

## `GET /api/v1/trending`

Trending

**Response:**
```json
{
  "trends": [
    {
      "tag": "#cumbia2026",
      "videos": 8400
    },
    {
      "tag": "#latam",
      "videos": 124000
    }
  ]
}
```

## `POST /api/v1/upload`

Subir

**Request:**
```json
{
  "title": "...",
  "durationSec": 22
}
```

**Response:**
```json
{
  "videoId": "v_new",
  "status": "processing"
}
```

## `POST /api/v1/engage`

Engage

**Request:**
```json
{
  "videoId": "v_1",
  "type": "like"
}
```

**Response:**
```json
{
  "engaged": true,
  "totalLikes": 142
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
      "title": "Bienvenido a shortlat",
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
