# API contracts — NewsletterX

## `GET /api/v1/newsletters`

Newsletters

**Response:**
```json
{
  "newsletters": [
    {
      "id": "nl_1",
      "title": "AI Latam",
      "subscribers": 4200,
      "openRate": 0.42
    }
  ]
}
```

## `GET /api/v1/issues`

Ediciones

**Response:**
```json
{
  "issues": [
    {
      "id": "is_1",
      "subject": "Edición #42",
      "sentAt": "2026-05-18T10:00"
    }
  ]
}
```

## `POST /api/v1/send`

Enviar

**Request:**
```json
{
  "newsletterId": "nl_1",
  "subject": "...",
  "html": "..."
}
```

**Response:**
```json
{
  "jobId": "sn_001",
  "targetCount": 4200,
  "etaSec": 30
}
```

## `POST /api/v1/segments`

Crear segmento

**Request:**
```json
{
  "name": "engaged_30d",
  "filter": {
    "lastOpenedDays": {
      "lte": 30
    }
  }
}
```

**Response:**
```json
{
  "segmentId": "sg_001",
  "estimatedSize": 1240
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
      "title": "Bienvenido a newsletterx",
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
