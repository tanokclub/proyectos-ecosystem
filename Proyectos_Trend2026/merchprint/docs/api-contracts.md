# API contracts — MerchPrint

## `GET /api/v1/products`

Productos

**Response:**
```json
{
  "products": [
    {
      "id": "p_1",
      "type": "remera",
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "baseCost": 4200,
      "currency": "ARS"
    }
  ]
}
```

## `GET /api/v1/stores`

Tiendas

**Response:**
```json
{
  "stores": [
    {
      "id": "s_1",
      "creator": "@band",
      "productsCount": 14,
      "salesMonth": 84
    }
  ]
}
```

## `POST /api/v1/design`

Subir diseño

**Request:**
```json
{
  "productType": "remera",
  "imageUrl": "..."
}
```

**Response:**
```json
{
  "designId": "d_001",
  "mockupUrl": "/mockups/..."
}
```

## `POST /api/v1/order`

Orden

**Request:**
```json
{
  "productId": "p_1",
  "size": "M",
  "designId": "d_001"
}
```

**Response:**
```json
{
  "orderId": "or_001",
  "etaDays": 7
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
      "title": "Bienvenido a merchprint",
      "read": false,
      "at": "2026-05-19T15:14:47.109Z"
    },
    {
      "id": "n_2",
      "type": "success",
      "title": "Sincronización completa",
      "read": true,
      "at": "2026-05-19T15:14:47.110Z"
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
