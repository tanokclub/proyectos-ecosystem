# API contracts — ScoreLAT

## `GET /api/v1/models`

Modelos

**Response:**
```json
{
  "models": [
    {
      "id": "mdl_1",
      "name": "credit_v3",
      "auc": 0.84
    }
  ]
}
```

## `GET /api/v1/features`

Features

**Response:**
```json
{
  "features": [
    "telco_avg",
    "utilities_late_pct"
  ]
}
```

## `POST /api/v1/score`

Score

**Request:**
```json
{
  "docId": "12345",
  "country": "CO"
}
```

**Response:**
```json
{
  "score": 712,
  "riskBand": "medium"
}
```

## `POST /api/v1/explain`

Explicar

**Request:**
```json
{
  "scoreId": "s_001"
}
```

**Response:**
```json
{
  "shapValues": {
    "telco_avg": 0.31
  }
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
      "title": "Bienvenido a scorelat",
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
