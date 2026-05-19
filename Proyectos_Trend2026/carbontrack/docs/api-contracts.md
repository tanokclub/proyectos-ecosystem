# API contracts — CarbonTrack

## `GET /api/v1/inventory`

Inventario

**Response:**
```json
{
  "totalTCO2e": 14820,
  "scope1": 4200,
  "scope2": 6420,
  "scope3": 4200
}
```

## `GET /api/v1/sources`

Fuentes

**Response:**
```json
{
  "sources": [
    {
      "id": "s_1",
      "name": "Flota",
      "scope": 1,
      "tCO2e": 2100
    }
  ]
}
```

## `POST /api/v1/activity`

Activity

**Request:**
```json
{
  "sourceId": "s_1",
  "kwh": 12000
}
```

**Response:**
```json
{
  "tCO2e": 5.2,
  "factor": 0.000433
}
```

## `POST /api/v1/report/generate`

Reporte GHG

**Request:**
```json
{
  "year": 2026
}
```

**Response:**
```json
{
  "reportId": "rep_001",
  "status": "generating"
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
      "title": "Bienvenido a carbontrack",
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
