# API contracts — TeachersHub

## `GET /api/v1/resources`

Recursos

**Response:**
```json
{
  "resources": [
    {
      "id": "r_1",
      "title": "Plan unidad fracciones",
      "grade": 5,
      "downloads": 1240
    }
  ]
}
```

## `GET /api/v1/feed`

Feed

**Response:**
```json
{
  "posts": [
    {
      "id": "p_1",
      "author": "María L.",
      "topic": "gamification"
    }
  ]
}
```

## `POST /api/v1/lessonplan`

Generar plan

**Request:**
```json
{
  "topic": "fotosíntesis",
  "grade": 7
}
```

**Response:**
```json
{
  "planUrl": "/plans/...",
  "durationMin": 45
}
```

## `POST /api/v1/marketplace/purchase`

Comprar

**Request:**
```json
{
  "resourceId": "r_1"
}
```

**Response:**
```json
{
  "receiptId": "rc_001",
  "total": 12000
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
      "title": "Bienvenido a teachershub",
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
