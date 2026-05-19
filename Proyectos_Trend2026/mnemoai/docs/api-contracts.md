# API contracts — MnemoAI

## `GET /api/v1/memories`

Memorias

**Response:**
```json
{
  "items": [
    {
      "id": "mem_1",
      "type": "fact",
      "content": "prefer terse",
      "confidence": 0.95
    }
  ]
}
```

## `GET /api/v1/agents`

Agentes

**Response:**
```json
{
  "agents": [
    {
      "id": "ag_1",
      "name": "Coding Buddy",
      "memCount": 1240
    }
  ]
}
```

## `POST /api/v1/memories`

Guardar

**Request:**
```json
{
  "agentId": "ag_1",
  "type": "fact",
  "content": "..."
}
```

**Response:**
```json
{
  "id": "mem_new",
  "stored": true
}
```

## `POST /api/v1/recall`

Recuperar

**Request:**
```json
{
  "query": "preferencias"
}
```

**Response:**
```json
{
  "matches": [
    {
      "memId": "mem_1",
      "score": 0.93
    }
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
      "title": "Bienvenido a mnemoai",
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
