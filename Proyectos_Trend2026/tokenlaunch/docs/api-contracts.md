# API contracts — TokenLaunch

## `GET /api/v1/launches`

Launches

**Response:**
```json
{
  "launches": [
    {
      "id": "ln_1",
      "name": "PYME Token",
      "raise": 800000,
      "status": "live"
    }
  ]
}
```

## `GET /api/v1/tiers`

Tiers staking

**Response:**
```json
{
  "tiers": [
    {
      "name": "silver",
      "stake": 1000,
      "allocation": 200
    }
  ]
}
```

## `POST /api/v1/participate`

Participar

**Request:**
```json
{
  "launchId": "ln_1",
  "amountUSDC": 500
}
```

**Response:**
```json
{
  "allocation": 250,
  "txHash": "0xtx"
}
```

## `POST /api/v1/vesting/claim`

Claim vesting

**Request:**
```json
{
  "launchId": "ln_1"
}
```

**Response:**
```json
{
  "released": 142,
  "nextUnlock": "2026-06-19"
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
      "title": "Bienvenido a tokenlaunch",
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
