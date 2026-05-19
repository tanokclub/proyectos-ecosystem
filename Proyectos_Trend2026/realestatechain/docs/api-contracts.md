# API contracts — RealEstateChain

## `GET /api/v1/properties`

Propiedades

**Response:**
```json
{
  "properties": [
    {
      "id": "pp_1",
      "address": "Bogotá Norte",
      "valueUSD": 250000,
      "tokens": 250000
    }
  ]
}
```

## `GET /api/v1/holdings`

Holdings

**Response:**
```json
{
  "holdings": [
    {
      "propertyId": "pp_1",
      "tokens": 1200,
      "valueUSD": 1200
    }
  ]
}
```

## `POST /api/v1/buy`

Comprar

**Request:**
```json
{
  "propertyId": "pp_1",
  "tokens": 100
}
```

**Response:**
```json
{
  "txHash": "0xtx",
  "tokens": 100
}
```

## `POST /api/v1/dividends/claim`

Claim dividendos

**Request:**
```json
{
  "propertyId": "pp_1"
}
```

**Response:**
```json
{
  "claimed": 84.5,
  "currency": "USDC"
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
      "title": "Bienvenido a realestatechain",
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
