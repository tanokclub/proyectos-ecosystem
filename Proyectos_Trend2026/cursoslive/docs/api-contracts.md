# API contracts — CursosLive

## `GET /api/v1/lives`

Lives programados

**Response:**
```json
{
  "lives": [
    {
      "id": "l_1",
      "title": "JS avanzado",
      "instructor": "Ana",
      "startAt": "2026-05-22T18:00"
    }
  ]
}
```

## `GET /api/v1/rooms`

Salas activas

**Response:**
```json
{
  "rooms": [
    {
      "id": "r_1",
      "participants": 84,
      "maxCapacity": 100
    }
  ]
}
```

## `POST /api/v1/lives/join`

Unirse

**Request:**
```json
{
  "liveId": "l_1"
}
```

**Response:**
```json
{
  "rtcToken": "tok_001",
  "expiresIn": 7200
}
```

## `POST /api/v1/qa/ask`

Preguntar Q&A

**Request:**
```json
{
  "liveId": "l_1",
  "text": "¿closures?"
}
```

**Response:**
```json
{
  "questionId": "q_001",
  "position": 3
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
      "title": "Bienvenido a cursoslive",
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
