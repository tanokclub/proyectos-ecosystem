# API contracts — CompraYa

## `GET /api/v1/orders`

Órdenes

**Response:**
```json
{
  "orders": [
    {
      "id": "or_1",
      "merchant": "Falabella",
      "total": 850000,
      "installments": 3
    }
  ]
}
```

## `GET /api/v1/merchants`

Merchants

**Response:**
```json
{
  "merchants": [
    {
      "id": "m_1",
      "name": "Falabella",
      "country": "CL"
    }
  ]
}
```

## `POST /api/v1/checkout`

Checkout BNPL

**Request:**
```json
{
  "merchantId": "m_1",
  "total": 250000
}
```

**Response:**
```json
{
  "sessionId": "ck_001",
  "plans": [
    {
      "n": 3,
      "monthly": 83333
    }
  ]
}
```

## `POST /api/v1/score`

Score cliente

**Request:**
```json
{
  "docId": "12345"
}
```

**Response:**
```json
{
  "approved": true,
  "limit": 2000000
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
      "title": "Bienvenido a compraya",
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
