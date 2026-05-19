# API contracts — FactorLAT

## `GET /api/v1/invoices/available`

Facturas en oferta

**Response:**
```json
{
  "items": [
    {
      "id": "inv_1",
      "faceValue": 2400000,
      "discountPctTarget": 8
    }
  ]
}
```

## `GET /api/v1/portfolio`

Portafolio

**Response:**
```json
{
  "totalUSD": 84000,
  "irrAvg": 0.142
}
```

## `POST /api/v1/bid`

Bid

**Request:**
```json
{
  "invoiceId": "inv_1",
  "discountPct": 7.5
}
```

**Response:**
```json
{
  "bidId": "b_001",
  "status": "queued"
}
```

## `POST /api/v1/invoices`

Subir factura

**Request:**
```json
{
  "xmlUrl": "https://..."
}
```

**Response:**
```json
{
  "id": "inv_new",
  "status": "validating"
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
      "title": "Bienvenido a factorlat",
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
