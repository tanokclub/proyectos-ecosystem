# API contracts — CarbonMarket

## `GET /api/v1/projects`

Proyectos

**Response:**
```json
{
  "projects": [
    {
      "id": "cp_1",
      "name": "Amazonas",
      "tCO2eAvail": 4200,
      "pricePerT": 12
    }
  ]
}
```

## `GET /api/v1/portfolio`

Portafolio

**Response:**
```json
{
  "totalTCO2e": 180,
  "retiredTCO2e": 60
}
```

## `POST /api/v1/buy`

Comprar

**Request:**
```json
{
  "projectId": "cp_1",
  "tCO2e": 50
}
```

**Response:**
```json
{
  "orderId": "or_001",
  "total": 600
}
```

## `POST /api/v1/retire`

Retirar

**Request:**
```json
{
  "tCO2e": 50,
  "reason": "CSR"
}
```

**Response:**
```json
{
  "retirementId": "re_001",
  "certificateUrl": "https://..."
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
      "title": "Bienvenido a carbonmarket",
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
