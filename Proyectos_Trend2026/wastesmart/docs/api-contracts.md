# API contracts — WasteSmart

## `GET /api/v1/bins`

Contenedores

**Response:**
```json
{
  "bins": [
    {
      "id": "bn_1",
      "zone": "A1",
      "fillPct": 0.78,
      "type": "orgánico"
    }
  ]
}
```

## `GET /api/v1/routes`

Rutas hoy

**Response:**
```json
{
  "routes": [
    {
      "truckId": "tr_1",
      "stops": 14,
      "distanceKm": 32
    }
  ]
}
```

## `POST /api/v1/routes/recalculate`

Recalcular

**Request:**
```json
{
  "zoneId": "A1"
}
```

**Response:**
```json
{
  "routeId": "rt_new",
  "stops": 18
}
```

## `POST /api/v1/reports`

Reporte ciudadano

**Request:**
```json
{
  "type": "overflow",
  "lat": 4.65,
  "lng": -74.05
}
```

**Response:**
```json
{
  "id": "rp_001",
  "priority": "med"
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
      "title": "Bienvenido a wastesmart",
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
