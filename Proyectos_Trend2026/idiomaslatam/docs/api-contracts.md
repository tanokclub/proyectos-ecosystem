# API contracts — IdiomasLATAM

## `GET /api/v1/languages`

Idiomas

**Response:**
```json
{
  "languages": [
    "qu",
    "gn",
    "nah",
    "ay",
    "arn"
  ]
}
```

## `GET /api/v1/lessons`

Lecciones

**Response:**
```json
{
  "lessons": [
    {
      "id": "l_1",
      "lang": "qu",
      "title": "Saludos",
      "durationMin": 12
    }
  ]
}
```

## `POST /api/v1/speak`

Evaluar pronunciación

**Request:**
```json
{
  "lang": "qu",
  "audioUrl": "..."
}
```

**Response:**
```json
{
  "score": 0.82,
  "feedback": "enfatiza la \"ll\""
}
```

## `POST /api/v1/progress`

Logear

**Request:**
```json
{
  "lessonId": "l_1",
  "completed": true
}
```

**Response:**
```json
{
  "xp": 24,
  "levelUp": false
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
      "title": "Bienvenido a idiomaslatam",
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
