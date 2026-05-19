# API contracts — SecretsVault

## `GET /api/v1/secrets`

Secretos

**Response:**
```json
{
  "secrets": [
    {
      "key": "DB_PASSWORD",
      "env": "prod",
      "version": 12,
      "rotateInDays": 45
    }
  ]
}
```

## `GET /api/v1/audit`

Audit

**Response:**
```json
{
  "events": [
    {
      "ts": "2026-05-19T10:00",
      "action": "read",
      "secret": "DB_PASSWORD",
      "user": "svc:api"
    }
  ]
}
```

## `POST /api/v1/secrets`

Crear secret

**Request:**
```json
{
  "key": "API_KEY",
  "value": "***",
  "env": "prod"
}
```

**Response:**
```json
{
  "key": "API_KEY",
  "version": 1
}
```

## `POST /api/v1/secrets/rotate`

Rotar

**Request:**
```json
{
  "key": "DB_PASSWORD"
}
```

**Response:**
```json
{
  "newVersion": 13,
  "completedAt": "2026-05-19T15:14:47.103Z"
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
      "title": "Bienvenido a secretsvault",
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
