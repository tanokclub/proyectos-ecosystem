# API contracts — CompudOps

## `GET /api/v1/sessions`

Sesiones

**Response:**
```json
{
  "sessions": [
    {
      "id": "ses_1",
      "task": "W9",
      "status": "running"
    }
  ]
}
```

## `GET /api/v1/approvals`

Aprobaciones

**Response:**
```json
{
  "approvals": [
    {
      "id": "ap_1",
      "action": "submit",
      "confidence": 0.78
    }
  ]
}
```

## `POST /api/v1/sessions`

Crear sesión

**Request:**
```json
{
  "task": "Buscar precios"
}
```

**Response:**
```json
{
  "id": "ses_new",
  "status": "spawning"
}
```

## `POST /api/v1/approve`

Aprobar acción

**Request:**
```json
{
  "approve": true
}
```

**Response:**
```json
{
  "status": "approved"
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
      "title": "Bienvenido a compudops",
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
