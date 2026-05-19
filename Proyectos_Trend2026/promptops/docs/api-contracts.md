# API contracts — PromptOps

## `GET /api/v1/prompts`

Prompts

**Response:**
```json
{
  "prompts": [
    {
      "id": "pr_1",
      "name": "support",
      "version": "v14",
      "winRate": 0.91
    }
  ]
}
```

## `GET /api/v1/experiments`

A/B activos

**Response:**
```json
{
  "experiments": [
    {
      "id": "e_1",
      "a": "v13",
      "b": "v14",
      "traffic": 0.5
    }
  ]
}
```

## `POST /api/v1/versions`

Nueva versión

**Request:**
```json
{
  "promptId": "pr_1",
  "body": "..."
}
```

**Response:**
```json
{
  "version": "v15",
  "status": "draft"
}
```

## `POST /api/v1/promote`

Promover ganador

**Request:**
```json
{
  "id": "e_1"
}
```

**Response:**
```json
{
  "promoted": "v14",
  "traffic": 1
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
      "title": "Bienvenido a promptops",
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
