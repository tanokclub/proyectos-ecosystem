# API contracts — AlmacenBot

## `GET /api/v1/robots`

Robots

**Response:**
```json
{
  "robots": [
    {
      "id": "rb_1",
      "type": "AGV",
      "battery": 0.84,
      "status": "picking"
    }
  ]
}
```

## `GET /api/v1/inventory`

Inventario

**Response:**
```json
{
  "sku": "SKU-001",
  "stock": 142,
  "locations": [
    "A1-B2",
    "A1-B3"
  ]
}
```

## `POST /api/v1/pick`

Pick order

**Request:**
```json
{
  "orderId": "or_001",
  "items": [
    {
      "sku": "SKU-001",
      "qty": 2
    }
  ]
}
```

**Response:**
```json
{
  "taskId": "tk_001",
  "etaSec": 180
}
```

## `POST /api/v1/robots/dispatch`

Despachar robot

**Request:**
```json
{
  "task": "pick",
  "target": "A1-B2"
}
```

**Response:**
```json
{
  "robotId": "rb_1",
  "taskId": "tk_001"
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
      "title": "Bienvenido a almacenbot",
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
