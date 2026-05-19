# API contracts — TelemedLAT

## `GET /api/v1/appointments`

Citas

**Response:**
```json
{
  "items": [
    {
      "id": "ap_1",
      "doctor": "Dr. Pérez",
      "date": "2026-05-22T10:00"
    }
  ]
}
```

## `GET /api/v1/doctors`

Médicos

**Response:**
```json
{
  "doctors": [
    {
      "id": "d_1",
      "name": "Dr. Pérez",
      "specialty": "Cardio",
      "rating": 4.8
    }
  ]
}
```

## `POST /api/v1/book`

Agendar

**Request:**
```json
{
  "doctorId": "d_1",
  "slot": "..."
}
```

**Response:**
```json
{
  "appointmentId": "ap_new",
  "status": "confirmed"
}
```

## `POST /api/v1/prescriptions`

Receta

**Request:**
```json
{
  "appointmentId": "ap_1",
  "meds": []
}
```

**Response:**
```json
{
  "prescriptionId": "rx_001"
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
      "title": "Bienvenido a telemedlat",
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
