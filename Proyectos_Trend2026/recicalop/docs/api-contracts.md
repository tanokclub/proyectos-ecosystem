# API contracts — ReciclaLoop

## `GET /api/v1/listings`

Listados

**Response:**
```json
{
  "listings": [
    {
      "id": "l_1",
      "material": "PET",
      "tons": 8.4
    }
  ]
}
```

## `GET /api/v1/orders`

Órdenes

**Response:**
```json
{
  "orders": [
    {
      "id": "or_1",
      "tons": 4,
      "status": "in_transit"
    }
  ]
}
```

## `POST /api/v1/listings`

Publicar

**Request:**
```json
{
  "material": "cartón",
  "tons": 12
}
```

**Response:**
```json
{
  "id": "l_new",
  "status": "live"
}
```

## `POST /api/v1/orders`

Comprar lote

**Request:**
```json
{
  "listingId": "l_1",
  "tons": 4
}
```

**Response:**
```json
{
  "orderId": "or_new",
  "total": 1520
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
      "title": "Bienvenido a recicalop",
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
