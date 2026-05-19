# API contracts — ClimaModel

## `GET /api/v1/scenarios`

Escenarios

**Response:**
```json
{
  "scenarios": [
    "SSP1-2.6",
    "SSP2-4.5",
    "SSP5-8.5"
  ]
}
```

## `GET /api/v1/projections`

Proyección

**Response:**
```json
{
  "city": "Lima",
  "tempIncrease2050C": 1.8
}
```

## `POST /api/v1/analyze`

Analizar

**Request:**
```json
{
  "lat": -12,
  "lng": -77,
  "scenario": "SSP2-4.5"
}
```

**Response:**
```json
{
  "risks": [
    "sequía"
  ],
  "score": 0.72
}
```

## `POST /api/v1/report`

Reporte

**Request:**
```json
{
  "region": "Lima"
}
```

**Response:**
```json
{
  "reportId": "cm_001",
  "status": "queued"
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
      "title": "Bienvenido a climamodel",
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
