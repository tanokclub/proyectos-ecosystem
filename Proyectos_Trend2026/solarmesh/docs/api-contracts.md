# API contracts — SolarMesh

## `GET /api/v1/sites`

Sitios

**Response:**
```json
{
  "sites": [
    {
      "id": "st_1",
      "name": "Sol del Valle",
      "capacityKw": 240
    }
  ]
}
```

## `GET /api/v1/production`

Producción

**Response:**
```json
{
  "totalKwh": 1840,
  "avgKw": 76.7
}
```

## `POST /api/v1/trade`

P2P energy

**Request:**
```json
{
  "fromHome": "h_1",
  "toHome": "h_2",
  "kwh": 4.5
}
```

**Response:**
```json
{
  "tradeId": "tr_001",
  "priceTokens": 4.5
}
```

## `POST /api/v1/forecast`

Forecast

**Request:**
```json
{
  "siteId": "st_1",
  "hours": 24
}
```

**Response:**
```json
{
  "points": [
    {
      "hour": 12,
      "kwh": 198
    }
  ]
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
      "title": "Bienvenido a solarmesh",
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
