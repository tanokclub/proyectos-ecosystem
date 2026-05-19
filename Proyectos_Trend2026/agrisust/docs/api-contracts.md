# API contracts — AgriSust

## `GET /api/v1/fields`

Parcelas

**Response:**
```json
{
  "fields": [
    {
      "id": "fl_1",
      "name": "Lote Norte",
      "hectares": 18
    }
  ]
}
```

## `GET /api/v1/sensors/soil`

Sensores suelo

**Response:**
```json
{
  "sensors": [
    {
      "id": "ss_1",
      "moisturePct": 28,
      "ph": 6.4
    }
  ]
}
```

## `POST /api/v1/irrigation`

Riego

**Request:**
```json
{
  "fieldId": "fl_1",
  "mm": 12
}
```

**Response:**
```json
{
  "scheduleId": "irr_001"
}
```

## `POST /api/v1/recommend`

Recomendar

**Request:**
```json
{
  "fieldId": "fl_1"
}
```

**Response:**
```json
{
  "actions": [
    "Aplicar potasio 40kg/ha"
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
      "title": "Bienvenido a agrisust",
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
