# API contracts — FlotaTrack

## `GET /api/v1/vehicles`

Vehículos

**Response:**
```json
{
  "vehicles": [
    {
      "id": "v_1",
      "plate": "ABC-123",
      "kmsToday": 184,
      "fuelPct": 0.42
    }
  ]
}
```

## `GET /api/v1/maintenance`

Mantenimiento

**Response:**
```json
{
  "items": [
    {
      "vehicleId": "v_1",
      "component": "frenos",
      "dueInKm": 1200
    }
  ]
}
```

## `POST /api/v1/routes/assign`

Asignar ruta

**Request:**
```json
{
  "vehicleId": "v_1",
  "stops": []
}
```

**Response:**
```json
{
  "dispatchId": "d_001",
  "driver": "Juan"
}
```

## `POST /api/v1/alert`

Alerta evento

**Request:**
```json
{
  "vehicleId": "v_1",
  "event": "harsh_braking"
}
```

**Response:**
```json
{
  "eventId": "e_001",
  "severity": "high"
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
      "title": "Bienvenido a flotatrack",
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
