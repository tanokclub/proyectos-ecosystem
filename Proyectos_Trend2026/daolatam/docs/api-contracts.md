# API contracts — DAOLatAm

## `GET /api/v1/proposals`

Propuestas

**Response:**
```json
{
  "proposals": [
    {
      "id": "pr_1",
      "title": "Liquidez Uniswap",
      "for": 142000,
      "against": 8400
    }
  ]
}
```

## `GET /api/v1/treasury`

Treasury

**Response:**
```json
{
  "totalUSD": 4200000,
  "tokens": [
    {
      "symbol": "ETH",
      "amount": 84
    },
    {
      "symbol": "USDC",
      "amount": 2200000
    }
  ]
}
```

## `POST /api/v1/proposals`

Crear

**Request:**
```json
{
  "title": "...",
  "actions": []
}
```

**Response:**
```json
{
  "id": "pr_new",
  "status": "active",
  "endsAt": "2026-05-26"
}
```

## `POST /api/v1/vote`

Votar

**Request:**
```json
{
  "proposalId": "pr_1",
  "choice": "for"
}
```

**Response:**
```json
{
  "txHash": "0xtx",
  "votePower": 1240
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
      "title": "Bienvenido a daolatam",
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
