# API contracts — SnapDB

## `GET /api/v1/branches`

Branches

**Response:**
```json
{
  "branches": [
    {
      "id": "br_1",
      "name": "main",
      "parent": null,
      "sizeMB": 142
    }
  ]
}
```

## `GET /api/v1/snapshots`

Snapshots

**Response:**
```json
{
  "snapshots": [
    {
      "id": "sn_1",
      "branchId": "br_1",
      "createdAt": "2026-05-18T20:00"
    }
  ]
}
```

## `POST /api/v1/branches`

Crear branch

**Request:**
```json
{
  "name": "feature-x",
  "parent": "main"
}
```

**Response:**
```json
{
  "id": "br_new",
  "name": "feature-x",
  "endpoint": "feature-x.snapdb.io"
}
```

## `POST /api/v1/restore`

Restore

**Request:**
```json
{
  "snapshotId": "sn_1"
}
```

**Response:**
```json
{
  "jobId": "rs_001",
  "etaSec": 12
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
      "title": "Bienvenido a snapdb",
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
