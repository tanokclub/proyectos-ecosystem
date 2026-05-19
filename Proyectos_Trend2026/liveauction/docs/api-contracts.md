# API contracts — LiveAuction

## `GET /api/v1/streams`

Streams

**Response:**
```json
{
  "streams": [
    {
      "id": "st_1",
      "title": "Subasta arte",
      "live": true,
      "viewers": 842
    }
  ]
}
```

## `GET /api/v1/products`

Productos

**Response:**
```json
{
  "products": [
    {
      "id": "p_1",
      "streamId": "st_1",
      "name": "Cuadro original",
      "topBid": 240
    }
  ]
}
```

## `POST /api/v1/bid`

Bid

**Request:**
```json
{
  "productId": "p_1",
  "amount": 250
}
```

**Response:**
```json
{
  "bidId": "b_001",
  "topBid": 250
}
```

## `POST /api/v1/checkout`

Checkout

**Request:**
```json
{
  "productId": "p_1",
  "bidId": "b_001"
}
```

**Response:**
```json
{
  "orderId": "or_001",
  "total": 250
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
      "title": "Bienvenido a liveauction",
      "read": false,
      "at": "2026-05-19T15:14:47.109Z"
    },
    {
      "id": "n_2",
      "type": "success",
      "title": "Sincronización completa",
      "read": true,
      "at": "2026-05-19T15:14:47.109Z"
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
