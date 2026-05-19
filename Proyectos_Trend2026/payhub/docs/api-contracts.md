# API contracts — PayHub

## `GET /api/v1/wallet`

Wallet

**Response:**
```json
{
  "balance": 142500,
  "currency": "COP",
  "cashback": 8400
}
```

## `GET /api/v1/services`

Servicios

**Response:**
```json
{
  "services": [
    "celular",
    "luz",
    "agua",
    "internet"
  ]
}
```

## `POST /api/v1/p2p/send`

Enviar P2P

**Request:**
```json
{
  "alias": "pedro.co",
  "amount": 25000
}
```

**Response:**
```json
{
  "txId": "tx_001",
  "status": "completed"
}
```

## `POST /api/v1/services/pay`

Pagar servicio

**Request:**
```json
{
  "service": "celular",
  "amount": 30000
}
```

**Response:**
```json
{
  "receiptId": "rec_001",
  "cashback": 600
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
      "title": "Bienvenido a payhub",
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
