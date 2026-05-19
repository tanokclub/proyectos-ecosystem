# API contracts — NFTArte

## `GET /api/v1/listings`

Listings

**Response:**
```json
{
  "listings": [
    {
      "id": "l_1",
      "title": "Andes Dreamscape",
      "artist": "Carla R.",
      "priceETH": 0.42
    }
  ]
}
```

## `GET /api/v1/auctions`

Subastas

**Response:**
```json
{
  "auctions": [
    {
      "id": "a_1",
      "topBid": 0.65,
      "endsAt": "2026-05-22T20:00"
    }
  ]
}
```

## `POST /api/v1/mint`

Mint

**Request:**
```json
{
  "metadataUri": "ipfs://...",
  "royaltyPct": 10
}
```

**Response:**
```json
{
  "tokenId": 142,
  "txHash": "0xtx"
}
```

## `POST /api/v1/bid`

Bid

**Request:**
```json
{
  "auctionId": "a_1",
  "amountETH": 0.7
}
```

**Response:**
```json
{
  "bidId": "b_001",
  "topBid": 0.7
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
      "title": "Bienvenido a nftarte",
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
