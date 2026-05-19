export const project = {
  "title": "CIChain",
  "slug": "cichain",
  "codename": "cichain",
  "summary": "CI/CD self-hosted compatible con GitHub Actions, ejecutores en cualquier nube.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Go",
    "PostgreSQL",
    "Docker",
    "Redis"
  ],
  "modules": [
    "workflows",
    "runners",
    "artifacts",
    "secrets",
    "matrix"
  ],
  "server": {
    "entry": "services/api",
    "port": 4255
  },
  "web": {
    "entry": "apps/web",
    "port": 3255
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/workflows",
    "summary": "Workflows",
    "response": {
      "workflows": [
        {
          "id": "wf_1",
          "repo": "monorepo",
          "file": ".github/workflows/ci.yml"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/runs",
    "summary": "Runs",
    "response": {
      "runs": [
        {
          "id": "rn_1",
          "workflow": "ci",
          "status": "success",
          "durationSec": 142
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/runs",
    "summary": "Trigger",
    "requestExample": {
      "workflowId": "wf_1",
      "ref": "main"
    },
    "response": {
      "runId": "rn_new",
      "status": "queued"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/runners/register",
    "summary": "Registrar runner",
    "requestExample": {
      "name": "arm-runner",
      "tags": [
        "arm64",
        "linux"
      ]
    },
    "response": {
      "runnerId": "rn_001",
      "token": "..."
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
          "title": "Bienvenido a cichain",
          "read": false,
          "at": "2026-05-19T15:14:47.108Z"
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
