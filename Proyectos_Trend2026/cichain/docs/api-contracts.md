# API contracts — CIChain

## `GET /api/v1/workflows`

Workflows

**Response:**
```json
{
  "workflows": [
    {
      "id": "wf_1",
      "repo": "monorepo",
      "file": ".github/workflows/ci.yml"
    }
  ]
}
```

## `GET /api/v1/runs`

Runs

**Response:**
```json
{
  "runs": [
    {
      "id": "rn_1",
      "workflow": "ci",
      "status": "success",
      "durationSec": 142
    }
  ]
}
```

## `POST /api/v1/runs`

Trigger

**Request:**
```json
{
  "workflowId": "wf_1",
  "ref": "main"
}
```

**Response:**
```json
{
  "runId": "rn_new",
  "status": "queued"
}
```

## `POST /api/v1/runners/register`

Registrar runner

**Request:**
```json
{
  "name": "arm-runner",
  "tags": [
    "arm64",
    "linux"
  ]
}
```

**Response:**
```json
{
  "runnerId": "rn_001",
  "token": "..."
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
      "title": "Bienvenido a cichain",
      "read": false,
      "at": "2026-05-19T15:14:47.108Z"
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
