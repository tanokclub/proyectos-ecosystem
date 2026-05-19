# API contracts — MCPGate

## `GET /api/v1/servers`

Servidores instalados

**Response:**
```json
{
  "servers": [
    {
      "id": "s_1",
      "name": "github",
      "status": "running"
    }
  ]
}
```

## `GET /api/v1/catalog`

Catálogo

**Response:**
```json
{
  "items": [
    {
      "name": "notion",
      "stars": 124
    }
  ]
}
```

## `POST /api/v1/servers`

Instalar

**Request:**
```json
{
  "name": "notion"
}
```

**Response:**
```json
{
  "id": "s_new",
  "status": "installing"
}
```

## `POST /api/v1/authorize`

Autorizar OAuth

**Request:**
```json
{
  "id": "s_2"
}
```

**Response:**
```json
{
  "authorizeUrl": "https://..."
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
      "title": "Bienvenido a mcpgate",
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
