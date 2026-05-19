# API contracts — EdgeFn

## `GET /api/v1/functions`

Funciones

**Response:**
```json
{
  "functions": [
    {
      "id": "f_1",
      "name": "image-resize",
      "regions": [
        "sao-1",
        "bog-1"
      ],
      "invocationsLast24h": 184200
    }
  ]
}
```

## `GET /api/v1/kv/keys`

KV keys

**Response:**
```json
{
  "keys": [
    "user:123",
    "session:abc"
  ],
  "totalBytes": 1840000
}
```

## `POST /api/v1/deploy`

Deploy fn

**Request:**
```json
{
  "name": "webhook-handler",
  "code": "..."
}
```

**Response:**
```json
{
  "functionId": "f_new",
  "deployedAt": "2026-05-19T15:14:47.104Z"
}
```

## `POST /api/v1/kv`

Set KV

**Request:**
```json
{
  "key": "user:123",
  "value": {
    "plan": "pro"
  }
}
```

**Response:**
```json
{
  "stored": true
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
      "title": "Bienvenido a edgefn",
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
