# API contracts — CreadorPro

## `GET /api/v1/creator`

Perfil creator

**Response:**
```json
{
  "handle": "@ana",
  "subscribers": 1240,
  "mrr": 14200,
  "currency": "USD"
}
```

## `GET /api/v1/posts`

Posts

**Response:**
```json
{
  "posts": [
    {
      "id": "p_1",
      "title": "Tutorial",
      "tier": "pro",
      "accessCount": 142
    }
  ]
}
```

## `POST /api/v1/subscribe`

Suscribir

**Request:**
```json
{
  "creatorHandle": "@ana",
  "tier": "pro"
}
```

**Response:**
```json
{
  "subscriptionId": "sub_001",
  "tier": "pro",
  "priceUSD": 15
}
```

## `POST /api/v1/tip`

Tip

**Request:**
```json
{
  "creatorHandle": "@ana",
  "amountUSD": 5
}
```

**Response:**
```json
{
  "txId": "tx_001",
  "amountUSD": 5,
  "message": "gracias!"
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
      "title": "Bienvenido a creadorpro",
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
