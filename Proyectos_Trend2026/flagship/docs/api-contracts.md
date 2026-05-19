# API contracts — FlagShip

## `GET /api/v1/flags`

Flags

**Response:**
```json
{
  "flags": [
    {
      "key": "new_checkout",
      "enabled": true,
      "rolloutPct": 25,
      "env": "prod"
    }
  ]
}
```

## `GET /api/v1/environments`

Environments

**Response:**
```json
{
  "environments": [
    "dev",
    "staging",
    "prod"
  ]
}
```

## `POST /api/v1/flags`

Crear flag

**Request:**
```json
{
  "key": "dark_mode",
  "default": false
}
```

**Response:**
```json
{
  "id": "fl_new",
  "status": "created"
}
```

## `POST /api/v1/flags/evaluate`

Evaluar

**Request:**
```json
{
  "key": "new_checkout",
  "userId": "u_123"
}
```

**Response:**
```json
{
  "value": true,
  "reason": "rollout-percent"
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
      "title": "Bienvenido a flagship",
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
