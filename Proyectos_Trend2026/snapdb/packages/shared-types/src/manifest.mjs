export const project = {
  "title": "SnapDB",
  "slug": "snapdb",
  "codename": "snapdb",
  "summary": "Postgres con branching estilo Git: snapshots instantáneos, branches por PR.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Postgres",
    "WAL",
    "S3",
    "Rust"
  ],
  "modules": [
    "branches",
    "snapshots",
    "restore",
    "permisos",
    "pricing"
  ],
  "server": {
    "entry": "services/api",
    "port": 4256
  },
  "web": {
    "entry": "apps/web",
    "port": 3256
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/branches",
    "summary": "Branches",
    "response": {
      "branches": [
        {
          "id": "br_1",
          "name": "main",
          "parent": null,
          "sizeMB": 142
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/snapshots",
    "summary": "Snapshots",
    "response": {
      "snapshots": [
        {
          "id": "sn_1",
          "branchId": "br_1",
          "createdAt": "2026-05-18T20:00"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/branches",
    "summary": "Crear branch",
    "requestExample": {
      "name": "feature-x",
      "parent": "main"
    },
    "response": {
      "id": "br_new",
      "name": "feature-x",
      "endpoint": "feature-x.snapdb.io"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/restore",
    "summary": "Restore",
    "requestExample": {
      "snapshotId": "sn_1"
    },
    "response": {
      "jobId": "rs_001",
      "etaSec": 12
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/metrics",
    "summary": "Métricas del servicio",
    "response": {
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
  },
  {
    "method": "GET",
    "path": "/api/v1/notifications",
    "summary": "Notificaciones del usuario",
    "response": {
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
  },
  {
    "method": "POST",
    "path": "/api/v1/search",
    "summary": "Búsqueda global",
    "requestExample": {
      "query": "demo"
    },
    "response": {
      "results": [
        {
          "type": "doc",
          "id": "s_1",
          "title": "Resultado mock",
          "score": 0.84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/batch",
    "summary": "Operación batch",
    "requestExample": {
      "items": []
    },
    "response": {
      "batchId": "b_001",
      "accepted": 12,
      "queued": 12
    }
  }
];
