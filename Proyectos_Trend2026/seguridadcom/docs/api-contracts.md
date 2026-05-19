# API contracts — SeguridadCom

## `GET /api/v1/cameras`

Cámaras

**Response:**
```json
{
  "cameras": [
    {
      "id": "cm_1",
      "location": "Esquina 7-25",
      "status": "online",
      "detections24h": 14
    }
  ]
}
```

## `GET /api/v1/alerts`

Alertas

**Response:**
```json
{
  "alerts": [
    {
      "id": "al_1",
      "type": "gathering_unusual",
      "cameraId": "cm_1",
      "confidence": 0.78
    }
  ]
}
```

## `POST /api/v1/panic`

Botón pánico

**Request:**
```json
{
  "lat": 4.65,
  "lng": -74.05
}
```

**Response:**
```json
{
  "alertId": "pa_001",
  "dispatchedTo": [
    "vecinos_500m",
    "policia"
  ]
}
```

## `POST /api/v1/cameras/share`

Compartir vivo

**Request:**
```json
{
  "cameraId": "cm_1",
  "authority": "policia"
}
```

**Response:**
```json
{
  "streamUrl": "webrtc://...",
  "expiresIn": 3600
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
      "title": "Bienvenido a seguridadcom",
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
