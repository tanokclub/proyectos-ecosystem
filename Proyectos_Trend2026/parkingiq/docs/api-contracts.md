# API contracts — ParkingIQ

## `GET /api/v1/lots`

Estacionamientos

**Response:**
```json
{
  "lots": [
    {
      "id": "lt_1",
      "name": "Centro",
      "total": 240,
      "available": 84,
      "priceCOP": 4000
    }
  ]
}
```

## `GET /api/v1/heatmap`

Heatmap demanda

**Response:**
```json
{
  "points": [
    {
      "lat": 4.65,
      "lng": -74.05,
      "demand": 0.84
    }
  ]
}
```

## `POST /api/v1/reserve`

Reservar

**Request:**
```json
{
  "lotId": "lt_1",
  "startAt": "2026-05-20T14:00"
}
```

**Response:**
```json
{
  "reservationId": "rs_001",
  "holdMinutes": 15
}
```

## `POST /api/v1/checkin`

Check-in

**Request:**
```json
{
  "lotId": "lt_1",
  "plate": "ABC-123"
}
```

**Response:**
```json
{
  "ticketId": "tk_001",
  "validUntil": "2026-05-20T17:00"
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
      "title": "Bienvenido a parkingiq",
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
