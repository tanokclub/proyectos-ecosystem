# API contracts — FitCoach

## `GET /api/v1/plan`

Plan

**Response:**
```json
{
  "goal": "fuerza",
  "weeks": 12,
  "currentWeek": 3
}
```

## `GET /api/v1/today`

Sesión hoy

**Response:**
```json
{
  "exercises": [
    {
      "name": "Sentadilla",
      "sets": 4,
      "reps": 8
    }
  ]
}
```

## `POST /api/v1/log`

Logear

**Request:**
```json
{
  "exerciseId": "sentadilla",
  "sets": [
    80
  ]
}
```

**Response:**
```json
{
  "logged": true,
  "prDetected": true
}
```

## `POST /api/v1/plan/regenerate`

Replan

**Request:**
```json
{
  "reason": "lesión"
}
```

**Response:**
```json
{
  "jobId": "pl_001",
  "etaSeconds": 8
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
      "title": "Bienvenido a fitcoach",
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
