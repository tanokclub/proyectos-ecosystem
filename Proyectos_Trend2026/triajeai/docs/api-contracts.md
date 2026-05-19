# API contracts — TriajeAI

## `GET /api/v1/protocols`

Protocolos

**Response:**
```json
{
  "protocols": [
    "manchester",
    "esi",
    "canadian-cts"
  ]
}
```

## `GET /api/v1/sessions/recent`

Sesiones

**Response:**
```json
{
  "sessions": [
    {
      "id": "tr_1",
      "level": "amarillo"
    }
  ]
}
```

## `POST /api/v1/triage`

Triage

**Request:**
```json
{
  "symptoms": [
    "fiebre"
  ],
  "age": 34
}
```

**Response:**
```json
{
  "level": "verde",
  "confidence": 0.84
}
```

## `POST /api/v1/refer`

Derivar

**Request:**
```json
{
  "triageId": "tr_1",
  "specialty": "cardio"
}
```

**Response:**
```json
{
  "referralId": "ref_001",
  "urgent": true
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
      "title": "Bienvenido a triajeai",
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
