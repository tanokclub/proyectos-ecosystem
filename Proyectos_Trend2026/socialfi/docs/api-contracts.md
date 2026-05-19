# API contracts — SocialFi

## `GET /api/v1/creators`

Creators

**Response:**
```json
{
  "creators": [
    {
      "id": "cr_1",
      "handle": "@ana",
      "tokenSymbol": "ANA",
      "holders": 1240
    }
  ]
}
```

## `GET /api/v1/gated`

Contenido gated

**Response:**
```json
{
  "items": [
    {
      "id": "g_1",
      "title": "Tutorial",
      "requiredTokens": 10
    }
  ]
}
```

## `POST /api/v1/tokens/buy`

Comprar token

**Request:**
```json
{
  "creatorId": "cr_1",
  "amountETH": 0.01
}
```

**Response:**
```json
{
  "tokens": 10,
  "txHash": "0xtx"
}
```

## `POST /api/v1/tip`

Tip creador

**Request:**
```json
{
  "creatorId": "cr_1",
  "amountETH": 0.005
}
```

**Response:**
```json
{
  "txHash": "0xtx",
  "amount": 0.005
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
      "title": "Bienvenido a socialfi",
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
