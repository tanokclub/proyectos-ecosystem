# API contracts — GenomaLab

## `GET /api/v1/profiles`

Perfiles

**Response:**
```json
{
  "profiles": [
    {
      "id": "g_1",
      "vendor": "23andme",
      "variantsAnnotated": 482000
    }
  ]
}
```

## `GET /api/v1/reports`

Reportes

**Response:**
```json
{
  "reports": [
    {
      "id": "r_1",
      "type": "farmaco",
      "findings": 4
    }
  ]
}
```

## `POST /api/v1/upload`

Upload

**Request:**
```json
{
  "vendor": "23andme",
  "fileUrl": "https://..."
}
```

**Response:**
```json
{
  "profileId": "g_new",
  "status": "processing"
}
```

## `POST /api/v1/share`

Share

**Request:**
```json
{
  "profileId": "g_1",
  "email": "dr@x.com"
}
```

**Response:**
```json
{
  "token": "zk_token",
  "expiresIn": 86400
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
      "title": "Bienvenido a genomalab",
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
