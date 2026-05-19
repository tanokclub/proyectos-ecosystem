# API contracts — BioWear

## `GET /api/v1/devices`

Dispositivos

**Response:**
```json
{
  "devices": [
    {
      "id": "d_1",
      "vendor": "Garmin",
      "battery": 0.82
    }
  ]
}
```

## `GET /api/v1/biomarkers/today`

Biomarkers

**Response:**
```json
{
  "hrvAvg": 48,
  "restingHR": 62,
  "spO2Avg": 0.97
}
```

## `POST /api/v1/alerts`

Configurar alerta

**Request:**
```json
{
  "metric": "hrv",
  "threshold": 30
}
```

**Response:**
```json
{
  "id": "al_001",
  "active": true
}
```

## `POST /api/v1/share/doctor`

Share doctor

**Request:**
```json
{
  "doctorEmail": "dr@x.com",
  "days": 30
}
```

**Response:**
```json
{
  "reportUrl": "https://..."
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
      "title": "Bienvenido a biowear",
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
