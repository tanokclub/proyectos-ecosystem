# API contracts — OpenLatAm

## `GET /api/v1/connections`

Conexiones bancarias

**Response:**
```json
{
  "connections": [
    {
      "id": "cn_1",
      "bank": "Itaú",
      "status": "active"
    }
  ]
}
```

## `GET /api/v1/accounts/aggregated`

Cuentas agregadas

**Response:**
```json
{
  "accounts": [
    {
      "id": "a_1",
      "balance": 12450,
      "currency": "BRL"
    }
  ]
}
```

## `POST /api/v1/consents`

Crear consent

**Request:**
```json
{
  "bank": "Itaú",
  "scopes": [
    "accounts"
  ]
}
```

**Response:**
```json
{
  "consentUrl": "https://itau.com/consent/..."
}
```

## `POST /api/v1/sync`

Forzar sync

**Request:**
```json
{
  "connectionId": "cn_1"
}
```

**Response:**
```json
{
  "jobId": "sync_001",
  "etaSeconds": 12
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
      "title": "Bienvenido a openlatam",
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
