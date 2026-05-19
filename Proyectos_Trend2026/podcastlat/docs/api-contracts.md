# API contracts — PodcastLAT

## `GET /api/v1/shows`

Shows

**Response:**
```json
{
  "shows": [
    {
      "id": "sh_1",
      "title": "Tech LATAM",
      "episodes": 84,
      "listenersMonthly": 184200
    }
  ]
}
```

## `GET /api/v1/episodes`

Episodios

**Response:**
```json
{
  "episodes": [
    {
      "id": "ep_1",
      "showId": "sh_1",
      "title": "IA en Chile",
      "durationMin": 42
    }
  ]
}
```

## `POST /api/v1/episodes`

Subir ep

**Request:**
```json
{
  "showId": "sh_1",
  "title": "...",
  "audioUrl": "..."
}
```

**Response:**
```json
{
  "id": "ep_new",
  "status": "processing",
  "transcriptUrl": null
}
```

## `POST /api/v1/ads/insert`

Insertar ad

**Request:**
```json
{
  "episodeId": "ep_1",
  "adId": "ad_1"
}
```

**Response:**
```json
{
  "adInserted": true,
  "position": "mid_roll",
  "cpm": 24
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
      "title": "Bienvenido a podcastlat",
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
