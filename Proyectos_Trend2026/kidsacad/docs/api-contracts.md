# API contracts — KidsAcad

## `GET /api/v1/activities`

Actividades

**Response:**
```json
{
  "activities": [
    {
      "id": "a_1",
      "title": "Matemáticas mágicas",
      "age": "7-9",
      "durationMin": 15
    }
  ]
}
```

## `GET /api/v1/parental/dashboard`

Dashboard padres

**Response:**
```json
{
  "childId": "k_1",
  "screenTimeMin": 42,
  "mostUsedSubject": "mate"
}
```

## `POST /api/v1/activity/complete`

Completar

**Request:**
```json
{
  "activityId": "a_1"
}
```

**Response:**
```json
{
  "stars": 3,
  "xp": 24,
  "badges": [
    "speedster"
  ]
}
```

## `POST /api/v1/parental/limit`

Límite tiempo

**Request:**
```json
{
  "childId": "k_1",
  "dailyMaxMin": 60
}
```

**Response:**
```json
{
  "dailyMaxMin": 60,
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
      "title": "Bienvenido a kidsacad",
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
