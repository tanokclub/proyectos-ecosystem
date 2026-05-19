export const project = {
  "title": "FlagShip",
  "slug": "flagship",
  "codename": "flagship",
  "summary": "Feature flags self-hosted: rollouts gradual, A/B, segmentación, SDKs multi-lenguaje.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "TypeScript"
  ],
  "modules": [
    "flags",
    "environments",
    "rollouts",
    "A/B",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4250
  },
  "web": {
    "entry": "apps/web",
    "port": 3250
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/flags",
    "summary": "Flags",
    "response": {
      "flags": [
        {
          "key": "new_checkout",
          "enabled": true,
          "rolloutPct": 25,
          "env": "prod"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/environments",
    "summary": "Environments",
    "response": {
      "environments": [
        "dev",
        "staging",
        "prod"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/flags",
    "summary": "Crear flag",
    "requestExample": {
      "key": "dark_mode",
      "default": false
    },
    "response": {
      "id": "fl_new",
      "status": "created"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/flags/evaluate",
    "summary": "Evaluar",
    "requestExample": {
      "key": "new_checkout",
      "userId": "u_123"
    },
    "response": {
      "value": true,
      "reason": "rollout-percent"
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
          "title": "Bienvenido a flagship",
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
