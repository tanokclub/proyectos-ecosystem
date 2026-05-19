# API contracts — ReforestaApp

## `GET /api/v1/projects`

Proyectos

**Response:**
```json
{
  "projects": [
    {
      "id": "rp_1",
      "name": "Manglares",
      "hectares": 1240
    }
  ]
}
```

## `GET /api/v1/ndvi`

NDVI

**Response:**
```json
{
  "series": [
    {
      "date": "2026-01",
      "avgNdvi": 0.42
    }
  ]
}
```

## `POST /api/v1/parcels`

Parcela

**Request:**
```json
{
  "projectId": "rp_1",
  "geojson": {}
}
```

**Response:**
```json
{
  "parcelId": "pc_001",
  "areaHa": 12.4
}
```

## `POST /api/v1/verify`

Verificar satélite

**Request:**
```json
{
  "parcelId": "pc_001"
}
```

**Response:**
```json
{
  "jobId": "v_001",
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
      "title": "Bienvenido a reforestapp",
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
