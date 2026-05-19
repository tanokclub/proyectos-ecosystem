# API contracts — CronosHR

## `GET /api/v1/patients`

Pacientes

**Response:**
```json
{
  "patients": [
    {
      "id": "p_1",
      "name": "Ana M.",
      "dob": "1985-04-12"
    }
  ]
}
```

## `GET /api/v1/encounters`

Encuentros

**Response:**
```json
{
  "encounters": [
    {
      "id": "e_1",
      "date": "2026-04-10",
      "reason": "Control"
    }
  ]
}
```

## `POST /api/v1/observations`

Observación

**Request:**
```json
{
  "patientId": "p_1",
  "loinc": "8302-2",
  "value": 168
}
```

**Response:**
```json
{
  "id": "obs_001",
  "status": "final"
}
```

## `POST /api/v1/conditions`

Condición

**Request:**
```json
{
  "patientId": "p_1",
  "icd10": "I10"
}
```

**Response:**
```json
{
  "id": "cond_001",
  "verificationStatus": "confirmed"
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
      "title": "Bienvenido a cronoshr",
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
