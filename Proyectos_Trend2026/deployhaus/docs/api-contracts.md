# API contracts — DeployHaus

## `GET /api/v1/apps`

Apps

**Response:**
```json
{
  "apps": [
    {
      "id": "a_1",
      "name": "frontend",
      "region": "sao-1",
      "status": "running",
      "instances": 3
    }
  ]
}
```

## `GET /api/v1/builds`

Builds

**Response:**
```json
{
  "builds": [
    {
      "id": "b_1",
      "appId": "a_1",
      "commit": "7f3a...",
      "status": "success",
      "durationSec": 84
    }
  ]
}
```

## `POST /api/v1/deploy`

Deploy

**Request:**
```json
{
  "appId": "a_1",
  "branch": "main"
}
```

**Response:**
```json
{
  "buildId": "b_new",
  "status": "building"
}
```

## `POST /api/v1/scale`

Escalar

**Request:**
```json
{
  "appId": "a_1",
  "instances": 5
}
```

**Response:**
```json
{
  "newInstances": 5,
  "status": "scaling"
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
      "title": "Bienvenido a deployhaus",
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
