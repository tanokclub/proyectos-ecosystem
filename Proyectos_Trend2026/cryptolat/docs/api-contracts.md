# API contracts — CryptoLat

## `GET /api/v1/balances`

Balances

**Response:**
```json
{
  "balances": [
    {
      "token": "BTC",
      "amount": 0.05,
      "usd": 3400
    }
  ]
}
```

## `GET /api/v1/quotes`

Quotes swap

**Response:**
```json
{
  "quotes": [
    {
      "pair": "BTC/USDC",
      "rate": 68000
    }
  ]
}
```

## `POST /api/v1/onramp`

On-ramp PIX/SPEI

**Request:**
```json
{
  "fiat": "BRL",
  "amount": 500
}
```

**Response:**
```json
{
  "orderId": "or_001",
  "pixCode": "00020126..."
}
```

## `POST /api/v1/swap`

Swap

**Request:**
```json
{
  "from": "BTC",
  "to": "USDC",
  "amount": 0.01
}
```

**Response:**
```json
{
  "txId": "tx_001",
  "etaSec": 30
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
      "title": "Bienvenido a cryptolat",
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
