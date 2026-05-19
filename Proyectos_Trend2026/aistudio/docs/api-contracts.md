# API contracts — AIStudio

## `GET /api/v1/projects`

Proyectos

**Response:**
```json
{
  "projects": [
    {
      "id": "pj_1",
      "type": "thumbnail_pack",
      "items": 12
    }
  ]
}
```

## `GET /api/v1/templates`

Templates

**Response:**
```json
{
  "templates": [
    "youtube_thumb",
    "instagram_reel",
    "tiktok_short",
    "podcast_episode"
  ]
}
```

## `POST /api/v1/generate`

Generar

**Request:**
```json
{
  "template": "youtube_thumb",
  "prompt": "AI explainer"
}
```

**Response:**
```json
{
  "jobId": "g_001",
  "estimatedSec": 12,
  "items": 4
}
```

## `POST /api/v1/translate`

Traducir video

**Request:**
```json
{
  "videoId": "v_1",
  "languages": [
    "es",
    "pt"
  ]
}
```

**Response:**
```json
{
  "jobId": "tr_001",
  "targetLangs": [
    "es",
    "pt"
  ]
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
      "title": "Bienvenido a aistudio",
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
