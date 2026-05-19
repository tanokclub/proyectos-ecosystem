# API contracts — Multimind

## `GET /api/v1/threads`

Conversaciones multimodales

**Response:**
```json
{
  "threads": [
    {
      "id": "t_1",
      "title": "Logo",
      "modalities": [
        "text",
        "image"
      ]
    }
  ]
}
```

## `GET /api/v1/models`

Modelos por modalidad

**Response:**
```json
{
  "text": [
    "claude-opus-4-7"
  ],
  "image": [
    "sd-3"
  ],
  "audio": [
    "whisper-3"
  ]
}
```

## `POST /api/v1/chat`

Mensaje multimodal

**Request:**
```json
{
  "threadId": "t_1",
  "text": "..."
}
```

**Response:**
```json
{
  "messageId": "m_x",
  "tokens": 480
}
```

## `POST /api/v1/generate/image`

Generar imagen

**Request:**
```json
{
  "prompt": "sunset"
}
```

**Response:**
```json
{
  "imageUrl": "/mock/img.png",
  "latencyMs": 2400
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
      "title": "Bienvenido a multimind",
      "read": false,
      "at": "2026-05-19T15:14:47.108Z"
    },
    {
      "id": "n_2",
      "type": "success",
      "title": "Sincronización completa",
      "read": true,
      "at": "2026-05-19T15:14:47.108Z"
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
