export const project = {
  "title": "GenomaLab",
  "slug": "genomalab",
  "codename": "genomalab",
  "summary": "Registro genómico personal con interpretación AI y privacidad zero-knowledge.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Snakemake",
    "IPFS"
  ],
  "modules": [
    "uploads",
    "pipeline",
    "variantes",
    "reportes",
    "sharing"
  ],
  "server": {
    "entry": "services/api",
    "port": 4227
  },
  "web": {
    "entry": "apps/web",
    "port": 3227
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/profiles",
    "summary": "Perfiles",
    "response": {
      "profiles": [
        {
          "id": "g_1",
          "vendor": "23andme",
          "variantsAnnotated": 482000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/reports",
    "summary": "Reportes",
    "response": {
      "reports": [
        {
          "id": "r_1",
          "type": "farmaco",
          "findings": 4
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/upload",
    "summary": "Upload",
    "requestExample": {
      "vendor": "23andme",
      "fileUrl": "https://..."
    },
    "response": {
      "profileId": "g_new",
      "status": "processing"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/share",
    "summary": "Share",
    "requestExample": {
      "profileId": "g_1",
      "email": "dr@x.com"
    },
    "response": {
      "token": "zk_token",
      "expiresIn": 86400
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
          "title": "Bienvenido a genomalab",
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
