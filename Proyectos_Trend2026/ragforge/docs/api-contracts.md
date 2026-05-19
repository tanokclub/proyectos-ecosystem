# API contracts — RAGForge

## `GET /api/v1/collections`

Colecciones de documentos

**Response:**
```json
{
  "items": [
    {
      "id": "col_1",
      "name": "Manuales",
      "docs": 142
    },
    {
      "id": "col_2",
      "name": "Contratos",
      "docs": 86
    }
  ]
}
```

## `GET /api/v1/queries/recent`

Queries recientes

**Response:**
```json
{
  "items": [
    {
      "id": "q_1",
      "text": "¿cuál es el SLA?",
      "score": 0.92
    }
  ]
}
```

## `POST /api/v1/ingest`

Ingesta documento

**Request:**
```json
{
  "url": "https://...",
  "collectionId": "col_1"
}
```

**Response:**
```json
{
  "jobId": "ing_001",
  "status": "queued"
}
```

## `POST /api/v1/chat`

Chat con citas

**Request:**
```json
{
  "query": "¿SLA?",
  "collectionId": "col_1"
}
```

**Response:**
```json
{
  "answer": "El SLA es 4h.",
  "citations": [
    {
      "docId": "d_1"
    }
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
      "title": "Bienvenido a ragforge",
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
