# API contracts — ESGReport

## `GET /api/v1/frameworks`

Frameworks

**Response:**
```json
{
  "frameworks": [
    "TCFD",
    "ISSB-S1",
    "GRI",
    "SASB"
  ]
}
```

## `GET /api/v1/score`

Score ESG

**Response:**
```json
{
  "score": 72,
  "e": 68,
  "s": 78,
  "g": 70
}
```

## `POST /api/v1/data/upload`

Upload

**Request:**
```json
{
  "framework": "TCFD"
}
```

**Response:**
```json
{
  "ingestId": "in_001",
  "rowsParsed": 1840
}
```

## `POST /api/v1/report/generate`

Reporte

**Request:**
```json
{
  "framework": "TCFD"
}
```

**Response:**
```json
{
  "reportId": "rep_001",
  "status": "rendering"
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
      "title": "Bienvenido a esgreport",
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
