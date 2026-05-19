# API contracts — AulaLAT

## `GET /api/v1/courses`

Cursos

**Response:**
```json
{
  "courses": [
    {
      "id": "c_1",
      "title": "Algoritmos",
      "students": 1420
    }
  ]
}
```

## `GET /api/v1/progress`

Progreso

**Response:**
```json
{
  "courseId": "c_1",
  "completionPct": 0.62,
  "streak": 8
}
```

## `POST /api/v1/tutor/ask`

Preguntar tutor

**Request:**
```json
{
  "courseId": "c_1",
  "question": "¿qué es Big O?"
}
```

**Response:**
```json
{
  "answer": "La complejidad es O(n)...",
  "sources": [
    "unit_4"
  ]
}
```

## `POST /api/v1/enroll`

Enrolar

**Request:**
```json
{
  "courseId": "c_1"
}
```

**Response:**
```json
{
  "enrollmentId": "e_001",
  "startDate": "2026-05-20"
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
      "title": "Bienvenido a aulalat",
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
