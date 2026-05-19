# API contracts — MedReminder

## `GET /api/v1/meds`

Medicamentos

**Response:**
```json
{
  "meds": [
    {
      "id": "m_1",
      "name": "Losartán 50mg",
      "adherencePct": 0.87
    }
  ]
}
```

## `GET /api/v1/today`

Tomas hoy

**Response:**
```json
{
  "items": [
    {
      "medId": "m_1",
      "time": "08:00",
      "taken": true
    }
  ]
}
```

## `POST /api/v1/log`

Logear toma

**Request:**
```json
{
  "medId": "m_1",
  "time": "08:00",
  "taken": true
}
```

**Response:**
```json
{
  "logged": true,
  "streakDays": 14
}
```

## `POST /api/v1/refill`

Refill

**Request:**
```json
{
  "medId": "m_1"
}
```

**Response:**
```json
{
  "orderId": "ref_001",
  "eta": "24h"
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
      "title": "Bienvenido a medreminder",
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
