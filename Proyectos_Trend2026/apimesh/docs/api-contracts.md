# API contracts — APIMesh

## `GET /api/v1/routes`

Rutas

**Response:**
```json
{
  "routes": [
    {
      "id": "rt_1",
      "path": "/v1/orders/*",
      "upstream": "orders-svc",
      "rateLimit": 100
    }
  ]
}
```

## `GET /api/v1/plugins`

Plugins

**Response:**
```json
{
  "plugins": [
    "oauth2",
    "rate-limit",
    "cors",
    "logging",
    "transform"
  ]
}
```

## `POST /api/v1/routes`

Crear ruta

**Request:**
```json
{
  "path": "/v1/products/*",
  "upstream": "products-svc"
}
```

**Response:**
```json
{
  "id": "rt_new",
  "status": "active"
}
```

## `POST /api/v1/plugins/install`

Instalar plugin

**Request:**
```json
{
  "name": "jwt"
}
```

**Response:**
```json
{
  "pluginId": "pl_new",
  "status": "installed"
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
      "title": "Bienvenido a apimesh",
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
