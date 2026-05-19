export const project = {
  "title": "EdgeFn",
  "slug": "edgefn",
  "codename": "edgefn",
  "summary": "Edge functions LATAM con cold starts <50ms y KV global.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "V8 isolates",
    "PostgreSQL",
    "Cloudflare style",
    "Anycast"
  ],
  "modules": [
    "funciones",
    "KV store",
    "cron",
    "observability",
    "deploy CLI"
  ],
  "server": {
    "entry": "services/api",
    "port": 4257
  },
  "web": {
    "entry": "apps/web",
    "port": 3257
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/functions",
    "summary": "Funciones",
    "response": {
      "functions": [
        {
          "id": "f_1",
          "name": "image-resize",
          "regions": [
            "sao-1",
            "bog-1"
          ],
          "invocationsLast24h": 184200
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/kv/keys",
    "summary": "KV keys",
    "response": {
      "keys": [
        "user:123",
        "session:abc"
      ],
      "totalBytes": 1840000
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/deploy",
    "summary": "Deploy fn",
    "requestExample": {
      "name": "webhook-handler",
      "code": "..."
    },
    "response": {
      "functionId": "f_new",
      "deployedAt": "2026-05-19T15:14:47.104Z"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/kv",
    "summary": "Set KV",
    "requestExample": {
      "key": "user:123",
      "value": {
        "plan": "pro"
      }
    },
    "response": {
      "stored": true
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
          "title": "Bienvenido a edgefn",
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
