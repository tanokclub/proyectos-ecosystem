# API contracts — WaterGrid

## `GET /api/v1/sensors`

Sensores red

**Response:**
```json
{
  "sensors": [
    {
      "id": "wt_1",
      "zone": "Zona 4",
      "pressureBar": 3.2,
      "flowLs": 14.2
    }
  ]
}
```

## `GET /api/v1/leaks`

Fugas detectadas

**Response:**
```json
{
  "leaks": [
    {
      "id": "lk_1",
      "zone": "Zona 4",
      "confidence": 0.84,
      "estLs": 8
    }
  ]
}
```

## `POST /api/v1/quality`

Reportar calidad

**Request:**
```json
{
  "sensorId": "wt_1"
}
```

**Response:**
```json
{
  "result": {
    "ph": 7.2,
    "chlorine": 0.4,
    "turbidity": 0.3
  }
}
```

## `POST /api/v1/alerts/configure`

Configurar alerta

**Request:**
```json
{
  "metric": "pressure",
  "thresholdMin": 2
}
```

**Response:**
```json
{
  "id": "al_001",
  "active": true
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
      "title": "Bienvenido a watergrid",
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
