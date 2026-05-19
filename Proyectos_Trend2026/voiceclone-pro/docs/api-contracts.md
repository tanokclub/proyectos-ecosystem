# API contracts — VoiceClone Pro

## `GET /api/v1/voices`

Voces clonadas

**Response:**
```json
{
  "voices": [
    {
      "id": "v_1",
      "name": "María",
      "lang": "es-MX"
    }
  ]
}
```

## `GET /api/v1/projects`

Proyectos narración

**Response:**
```json
{
  "projects": [
    {
      "id": "p_1",
      "name": "Audiolibro c1",
      "durationSec": 1840
    }
  ]
}
```

## `POST /api/v1/synthesize`

Sintetizar voz

**Request:**
```json
{
  "voiceId": "v_1",
  "text": "Hola"
}
```

**Response:**
```json
{
  "audioUrl": "/mock/audio.mp3",
  "durationSec": 1.2
}
```

## `POST /api/v1/voices`

Crear voz

**Request:**
```json
{
  "name": "Carla",
  "samples": [
    "s1.wav"
  ]
}
```

**Response:**
```json
{
  "id": "v_new",
  "status": "training"
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
      "title": "Bienvenido a voiceclone-pro",
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
