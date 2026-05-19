# API contracts — PrivyVote

## `GET /api/v1/ballots`

Boletas

**Response:**
```json
{
  "ballots": [
    {
      "id": "b_1",
      "title": "Junta 2026",
      "status": "voting",
      "endsAt": "2026-05-25"
    }
  ]
}
```

## `GET /api/v1/proofs`

Pruebas ZK

**Response:**
```json
{
  "totalProofs": 1840,
  "verified": 1840
}
```

## `POST /api/v1/vote`

Vote ZK

**Request:**
```json
{
  "ballotId": "b_1",
  "proof": "...",
  "publicSignals": []
}
```

**Response:**
```json
{
  "proofHash": "0xpf",
  "accepted": true
}
```

## `POST /api/v1/tally`

Tally

**Request:**
```json
{
  "ballotId": "b_1"
}
```

**Response:**
```json
{
  "results": {
    "for": 1420,
    "against": 420,
    "abstain": 20
  }
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
      "title": "Bienvenido a privyvote",
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
