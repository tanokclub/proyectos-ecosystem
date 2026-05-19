# API contracts — Sherpa AI

## `GET /api/v1/conversations`

Conversaciones activas

**Response:**
```json
{
  "items": [
    {
      "id": "c_1",
      "user": "ana@x.com",
      "channel": "web",
      "status": "bot"
    }
  ]
}
```

## `GET /api/v1/tools`

Tools disponibles

**Response:**
```json
{
  "tools": [
    "lookupOrder",
    "createTicket",
    "refund",
    "kbSearch"
  ]
}
```

## `POST /api/v1/conversations/reply`

Responder

**Request:**
```json
{
  "conversationId": "c_1",
  "text": "hola"
}
```

**Response:**
```json
{
  "messageId": "m_001",
  "toolsCalled": [
    "kbSearch"
  ]
}
```

## `POST /api/v1/handoff`

Pasar a humano

**Request:**
```json
{
  "conversationId": "c_1"
}
```

**Response:**
```json
{
  "status": "queued_agent",
  "etaSeconds": 45
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
      "title": "Bienvenido a sherpa-ai",
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
