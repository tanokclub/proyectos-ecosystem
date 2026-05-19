# API contracts — ObservaLAT

## `GET /api/v1/services`

Servicios

**Response:**
```json
{
  "services": [
    {
      "name": "api-gw",
      "errorRate": 0.004,
      "p95Ms": 142
    }
  ]
}
```

## `GET /api/v1/alerts`

Alertas activas

**Response:**
```json
{
  "alerts": [
    {
      "id": "al_1",
      "service": "api-gw",
      "severity": "warn"
    }
  ]
}
```

## `POST /api/v1/query`

Query logs

**Request:**
```json
{
  "query": "service=api-gw severity=error",
  "range": "1h"
}
```

**Response:**
```json
{
  "results": 1842,
  "traces": [
    "tr_1",
    "tr_2"
  ]
}
```

## `POST /api/v1/alerts`

Crear alerta

**Request:**
```json
{
  "service": "api-gw",
  "threshold": {
    "errorRate": 0.02
  }
}
```

**Response:**
```json
{
  "id": "al_new",
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
      "title": "Bienvenido a observalat",
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
