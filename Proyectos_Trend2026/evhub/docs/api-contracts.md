# API contracts — EVHub

## `GET /api/v1/stations`

Estaciones

**Response:**
```json
{
  "stations": [
    {
      "id": "st_1",
      "name": "Andina Norte",
      "kw": 150
    }
  ]
}
```

## `GET /api/v1/sessions`

Sesiones

**Response:**
```json
{
  "sessions": [
    {
      "id": "cs_1",
      "kwh": 28.4
    }
  ]
}
```

## `POST /api/v1/reserve`

Reservar

**Request:**
```json
{
  "stationId": "st_1"
}
```

**Response:**
```json
{
  "reservationId": "rs_001",
  "holdMinutes": 15
}
```

## `POST /api/v1/route`

Planificar

**Request:**
```json
{
  "from": "Bogotá",
  "to": "Medellín"
}
```

**Response:**
```json
{
  "stops": [
    {
      "stationId": "st_4",
      "chargeMinutes": 25
    }
  ]
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
      "title": "Bienvenido a evhub",
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
