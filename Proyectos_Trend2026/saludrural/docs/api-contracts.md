# API contracts — SaludRural

## `GET /api/v1/posts`

Puestos rurales

**Response:**
```json
{
  "posts": [
    {
      "id": "po_1",
      "name": "Cabuyaro",
      "population": 4200,
      "connectivity": "starlink"
    }
  ]
}
```

## `GET /api/v1/meds/inventory`

Inventario meds

**Response:**
```json
{
  "items": [
    {
      "med": "paracetamol",
      "stock": 120,
      "postId": "po_1"
    }
  ]
}
```

## `POST /api/v1/consult`

Telediagnóstico

**Request:**
```json
{
  "postId": "po_1",
  "symptoms": [
    "fiebre",
    "tos"
  ]
}
```

**Response:**
```json
{
  "consultId": "c_001",
  "diagnosis": "IRA leve",
  "protocol": "pid_resp"
}
```

## `POST /api/v1/brigade/schedule`

Programar brigada

**Request:**
```json
{
  "postId": "po_1",
  "focus": "vacunación"
}
```

**Response:**
```json
{
  "brigadeId": "bg_001",
  "date": "2026-05-25"
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
      "title": "Bienvenido a saludrural",
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
