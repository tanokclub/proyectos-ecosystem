export const project = {
  "title": "ChaosTest",
  "slug": "chaostest",
  "codename": "chaostest",
  "summary": "Chaos engineering as service: fault injection, game days, hipótesis automatizadas.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Go",
    "PostgreSQL",
    "eBPF",
    "Kubernetes"
  ],
  "modules": [
    "experimentos",
    "fault injection",
    "hypothesis",
    "reportes",
    "game days"
  ],
  "server": {
    "entry": "services/api",
    "port": 4258
  },
  "web": {
    "entry": "apps/web",
    "port": 3258
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/experiments",
    "summary": "Experimentos",
    "response": {
      "experiments": [
        {
          "id": "ex_1",
          "name": "kill-orders-db",
          "state": "idle"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/findings",
    "summary": "Hallazgos",
    "response": {
      "findings": [
        {
          "id": "fn_1",
          "severity": "high",
          "service": "orders"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/experiments/run",
    "summary": "Correr exp",
    "requestExample": {
      "experimentId": "ex_1",
      "durationSec": 60
    },
    "response": {
      "runId": "rn_001",
      "status": "running"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/abort",
    "summary": "Abortar",
    "requestExample": {
      "runId": "rn_001"
    },
    "response": {
      "aborted": true,
      "rollback": "in_progress"
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
          "title": "Bienvenido a chaostest",
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
