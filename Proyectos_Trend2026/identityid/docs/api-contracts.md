# API contracts — IdentityID

## `GET /api/v1/identity`

Identidad

**Response:**
```json
{
  "did": "did:lat:0x123",
  "credentialsCount": 8,
  "recoveryEnabled": true
}
```

## `GET /api/v1/credentials`

Credenciales

**Response:**
```json
{
  "credentials": [
    {
      "id": "c_1",
      "type": "id_card",
      "issuer": "Gov MX"
    }
  ]
}
```

## `POST /api/v1/present`

Presentar

**Request:**
```json
{
  "credentialIds": [
    "c_1"
  ],
  "audience": "verifier_x"
}
```

**Response:**
```json
{
  "presentationToken": "pt_001",
  "expiresIn": 600
}
```

## `POST /api/v1/verify`

Verificar

**Request:**
```json
{
  "presentationToken": "pt_001"
}
```

**Response:**
```json
{
  "valid": true,
  "claims": {
    "age_gte_18": true
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
      "title": "Bienvenido a identityid",
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
