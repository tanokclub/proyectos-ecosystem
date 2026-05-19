# API contracts — SaludMarket

## `GET /api/v1/services`

Servicios

**Response:**
```json
{
  "services": [
    {
      "id": "s_1",
      "name": "Perfil lipídico",
      "priceCOP": 65000
    }
  ]
}
```

## `GET /api/v1/providers`

Proveedores

**Response:**
```json
{
  "providers": [
    {
      "id": "p_1",
      "name": "Cruz Verde",
      "rating": 4.7
    }
  ]
}
```

## `POST /api/v1/book`

Reservar

**Request:**
```json
{
  "serviceId": "s_1",
  "date": "2026-05-25"
}
```

**Response:**
```json
{
  "bookingId": "bk_001",
  "status": "confirmed"
}
```

## `POST /api/v1/review`

Review

**Request:**
```json
{
  "bookingId": "bk_001",
  "rating": 5
}
```

**Response:**
```json
{
  "reviewId": "rv_001"
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
      "title": "Bienvenido a saludmarket",
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
