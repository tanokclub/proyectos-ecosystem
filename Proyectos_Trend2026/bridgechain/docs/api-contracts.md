# API contracts — BridgeChain

## `GET /api/v1/routes`

Rutas bridge

**Response:**
```json
{
  "routes": [
    {
      "from": "ETH",
      "to": "BASE",
      "feePct": 0.1,
      "etaSec": 90
    }
  ]
}
```

## `GET /api/v1/liquidity`

Liquidez

**Response:**
```json
{
  "pools": [
    {
      "chain": "BASE",
      "token": "USDC",
      "amount": 4200000
    }
  ]
}
```

## `POST /api/v1/quote`

Cotizar

**Request:**
```json
{
  "from": "ETH",
  "to": "BASE",
  "token": "USDC",
  "amount": 1000
}
```

**Response:**
```json
{
  "quoteId": "q_001",
  "fee": 0.5,
  "etaSec": 90
}
```

## `POST /api/v1/transfer`

Transferir

**Request:**
```json
{
  "quoteId": "q_001"
}
```

**Response:**
```json
{
  "txHash": "0xtx",
  "status": "pending"
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
      "title": "Bienvenido a bridgechain",
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
