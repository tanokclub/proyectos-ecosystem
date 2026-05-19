# API contracts — CitySense

## `GET /api/v1/sensors`

Sensores

**Response:**
```json
{
  "sensors": [
    {
      "id": "ss_1",
      "type": "noise",
      "dbA": 64,
      "zone": "Centro"
    }
  ]
}
```

## `GET /api/v1/incidents`

Incidentes

**Response:**
```json
{
  "incidents": [
    {
      "id": "in_1",
      "type": "street_light_out",
      "priority": "low"
    }
  ]
}
```

## `POST /api/v1/incidents`

Reportar

**Request:**
```json
{
  "type": "pothole",
  "lat": 4.65,
  "lng": -74.05
}
```

**Response:**
```json
{
  "id": "in_new",
  "status": "queued"
}
```

## `POST /api/v1/sensors/calibrate`

Calibrar

**Request:**
```json
{
  "sensorId": "ss_1"
}
```

**Response:**
```json
{
  "sensorId": "ss_1",
  "calibratedAt": "2026-05-19T15:14:47.104Z"
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
      "title": "Bienvenido a citysense",
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
