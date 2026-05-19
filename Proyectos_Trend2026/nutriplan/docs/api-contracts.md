# API contracts — NutriPlan

## `GET /api/v1/menu/today`

Menú

**Response:**
```json
{
  "meals": [
    {
      "time": "desayuno",
      "name": "Arepa + huevo",
      "kcal": 420
    }
  ]
}
```

## `GET /api/v1/macros`

Macros

**Response:**
```json
{
  "kcal": 2200,
  "proteinG": 140,
  "carbsG": 240,
  "fatG": 70
}
```

## `POST /api/v1/log/meal`

Loggear

**Request:**
```json
{
  "name": "Arepa",
  "portion": 1
}
```

**Response:**
```json
{
  "kcal": 320,
  "addedTo": "desayuno"
}
```

## `POST /api/v1/order/groceries`

Pedir

**Request:**
```json
{
  "menuId": "wk_22"
}
```

**Response:**
```json
{
  "rappiOrderId": "rp_001",
  "etaMinutes": 35
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
      "title": "Bienvenido a nutriplan",
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
