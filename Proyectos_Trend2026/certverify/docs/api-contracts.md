# API contracts — CertVerify

## `GET /api/v1/credentials`

Credenciales

**Response:**
```json
{
  "credentials": [
    {
      "id": "cr_1",
      "title": "BS CS",
      "issuer": "Universidad X",
      "issuedAt": "2025-12-15"
    }
  ]
}
```

## `GET /api/v1/issuers`

Emisores

**Response:**
```json
{
  "issuers": [
    {
      "id": "is_1",
      "name": "Universidad X",
      "verified": true
    }
  ]
}
```

## `POST /api/v1/verify`

Verificar

**Request:**
```json
{
  "credentialHash": "0xabc..."
}
```

**Response:**
```json
{
  "valid": true,
  "issuer": "Universidad X",
  "issuedAt": "2025-12-15"
}
```

## `POST /api/v1/issue`

Emitir

**Request:**
```json
{
  "recipient": "0xa...",
  "credentialData": {}
}
```

**Response:**
```json
{
  "credentialId": "cr_new",
  "txHash": "0xtx..."
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
      "title": "Bienvenido a certverify",
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
