# API contracts — CodeAcad

## `GET /api/v1/cohorts`

Cohortes

**Response:**
```json
{
  "cohorts": [
    {
      "id": "co_1",
      "stack": "Fullstack JS",
      "students": 28,
      "startsAt": "2026-06-01"
    }
  ]
}
```

## `GET /api/v1/projects`

Proyectos

**Response:**
```json
{
  "projects": [
    {
      "id": "pr_1",
      "title": "Clone E-commerce",
      "difficulty": "medium"
    }
  ]
}
```

## `POST /api/v1/sandbox/run`

Run sandbox

**Request:**
```json
{
  "lang": "js",
  "code": "console.log(\"Hello World\")"
}
```

**Response:**
```json
{
  "runId": "r_001",
  "output": "Hello World",
  "exitCode": 0
}
```

## `POST /api/v1/apply`

Aplicar cohorte

**Request:**
```json
{
  "cohortId": "co_1"
}
```

**Response:**
```json
{
  "applicationId": "app_001",
  "status": "review"
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
      "title": "Bienvenido a codeacad",
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
