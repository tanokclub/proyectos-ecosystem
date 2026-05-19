# API contracts — CostMonitor

## `GET /api/v1/spending`

Gasto

**Response:**
```json
{
  "thisMonth": 18420,
  "lastMonth": 17200,
  "projected": 19800,
  "currency": "USD"
}
```

## `GET /api/v1/anomalies`

Anomalías

**Response:**
```json
{
  "anomalies": [
    {
      "service": "EC2 sao-1",
      "extraUSD": 240,
      "detectedAt": "2026-05-18"
    }
  ]
}
```

## `POST /api/v1/budgets`

Crear budget

**Request:**
```json
{
  "name": "AWS prod",
  "limitUSD": 20000
}
```

**Response:**
```json
{
  "id": "bd_001",
  "alertAt": 0.8
}
```

## `POST /api/v1/recommendations`

Recomendaciones

**Request:**
```json
{
  "scope": "all"
}
```

**Response:**
```json
{
  "savings": 1240,
  "items": [
    "Reservar 12 EC2 m5.large",
    "Eliminar 4 EBS huérfanos"
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
      "title": "Bienvenido a costmonitor",
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
