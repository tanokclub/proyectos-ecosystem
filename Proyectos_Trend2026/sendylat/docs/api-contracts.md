# API contracts — SendyLat

## `GET /api/v1/corridors`

Corredores

**Response:**
```json
{
  "corridors": [
    {
      "from": "US",
      "to": "CO",
      "feePct": 1.2
    }
  ]
}
```

## `GET /api/v1/recipients`

Destinatarios

**Response:**
```json
{
  "recipients": [
    {
      "id": "r_1",
      "name": "María C.",
      "country": "CO"
    }
  ]
}
```

## `POST /api/v1/quotes`

Cotizar

**Request:**
```json
{
  "from": "USD",
  "to": "COP",
  "amount": 200
}
```

**Response:**
```json
{
  "rate": 4180,
  "fee": 2.4,
  "total": 200
}
```

## `POST /api/v1/transfers`

Enviar

**Request:**
```json
{
  "quoteId": "q_1",
  "recipientId": "r_1"
}
```

**Response:**
```json
{
  "transferId": "tr_001",
  "status": "processing"
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
      "title": "Bienvenido a sendylat",
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
