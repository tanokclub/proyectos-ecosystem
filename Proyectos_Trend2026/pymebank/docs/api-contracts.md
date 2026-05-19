# API contracts — PymeBank

## `GET /api/v1/business`

Resumen

**Response:**
```json
{
  "rfc": "XXX0000000",
  "balance": 12400000,
  "employees": 14
}
```

## `GET /api/v1/invoices`

Facturas

**Response:**
```json
{
  "invoices": [
    {
      "id": "inv_1",
      "total": 580000,
      "status": "stamped"
    }
  ]
}
```

## `POST /api/v1/payroll`

Correr nómina

**Request:**
```json
{
  "period": "2026-05",
  "employees": 14
}
```

**Response:**
```json
{
  "runId": "pr_001",
  "totalNet": 8400000
}
```

## `POST /api/v1/loans/apply`

Préstamo

**Request:**
```json
{
  "amount": 5000000,
  "term": 24
}
```

**Response:**
```json
{
  "applicationId": "app_001",
  "preApproved": true
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
      "title": "Bienvenido a pymebank",
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
