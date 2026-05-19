# API contracts — EvalBench

## `GET /api/v1/datasets`

Datasets

**Response:**
```json
{
  "datasets": [
    {
      "id": "d_1",
      "name": "TruthfulQA",
      "examples": 817
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
      "id": "run_1",
      "model": "claude-opus-4-7",
      "score": 0.84
    }
  ]
}
```

## `POST /api/v1/runs`

Lanzar run

**Request:**
```json
{
  "datasetId": "d_1",
  "model": "claude-opus-4-7"
}
```

**Response:**
```json
{
  "id": "run_new",
  "status": "running"
}
```

## `POST /api/v1/compare`

Comparar

**Request:**
```json
{
  "runIds": [
    "run_1",
    "run_2"
  ]
}
```

**Response:**
```json
{
  "winner": "run_1",
  "deltaPct": 3.7
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
      "title": "Bienvenido a evalbench",
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
