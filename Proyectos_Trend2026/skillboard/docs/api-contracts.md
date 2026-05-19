# API contracts — SkillBoard

## `GET /api/v1/jobs`

Jobs

**Response:**
```json
{
  "jobs": [
    {
      "id": "j_1",
      "title": "Sr BE Eng",
      "company": "StartupX",
      "remote": true,
      "salaryUSD": 6000
    }
  ]
}
```

## `GET /api/v1/matches`

Matches

**Response:**
```json
{
  "matches": [
    {
      "jobId": "j_1",
      "score": 0.91,
      "gaps": [
        "rust"
      ]
    }
  ]
}
```

## `POST /api/v1/evaluations/start`

Empezar eval

**Request:**
```json
{
  "jobId": "j_1",
  "type": "take-home"
}
```

**Response:**
```json
{
  "evalId": "ev_001",
  "durationMin": 60
}
```

## `POST /api/v1/apply`

Aplicar

**Request:**
```json
{
  "jobId": "j_1"
}
```

**Response:**
```json
{
  "applicationId": "app_001",
  "status": "submitted"
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
      "title": "Bienvenido a skillboard",
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
