# API contracts — EdificioIQ

## `GET /api/v1/buildings`

Edificios

**Response:**
```json
{
  "buildings": [
    {
      "id": "bd_1",
      "name": "Torre Norte",
      "m2": 18400,
      "occupancyPct": 0.72
    }
  ]
}
```

## `GET /api/v1/energy`

Energía

**Response:**
```json
{
  "kwhToday": 8420,
  "kwhMonth": 184200,
  "costUSD": 18420
}
```

## `POST /api/v1/hvac`

Setear HVAC

**Request:**
```json
{
  "buildingId": "bd_1",
  "zone": "P3-Oeste",
  "setpointC": 22
}
```

**Response:**
```json
{
  "confirmed": true,
  "zone": "P3-Oeste",
  "setpointC": 22
}
```

## `POST /api/v1/access`

Grant acceso

**Request:**
```json
{
  "buildingId": "bd_1",
  "personId": "p_1",
  "floors": [
    3,
    4
  ]
}
```

**Response:**
```json
{
  "accessId": "ac_001",
  "validUntil": "2026-05-26T18:00"
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
      "title": "Bienvenido a edificioiq",
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
