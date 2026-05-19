# API contracts — AgriDrone

## `GET /api/v1/drones`

Drones

**Response:**
```json
{
  "drones": [
    {
      "id": "dr_1",
      "model": "DJI Agras T40",
      "battery": 0.92,
      "status": "idle"
    }
  ]
}
```

## `GET /api/v1/missions`

Misiones

**Response:**
```json
{
  "missions": [
    {
      "id": "ms_1",
      "field": "Lote 4",
      "type": "survey",
      "durationMin": 22
    }
  ]
}
```

## `POST /api/v1/missions`

Crear misión

**Request:**
```json
{
  "droneId": "dr_1",
  "fieldId": "fl_1",
  "type": "survey"
}
```

**Response:**
```json
{
  "id": "ms_new",
  "status": "planning",
  "estDurationMin": 22
}
```

## `POST /api/v1/missions/launch`

Lanzar misión

**Request:**
```json
{
  "missionId": "ms_new"
}
```

**Response:**
```json
{
  "missionId": "ms_new",
  "launchedAt": "2026-05-19T15:14:47.105Z"
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
      "title": "Bienvenido a agridrone",
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
