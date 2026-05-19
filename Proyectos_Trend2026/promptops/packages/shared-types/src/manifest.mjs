export const project = {
  "title": "PromptOps",
  "slug": "promptops",
  "codename": "promptops",
  "summary": "Versionado, testing y deploy de prompts en producción con métricas.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "ClickHouse",
    "Anthropic"
  ],
  "modules": [
    "versiones",
    "A/B testing",
    "eval",
    "observabilidad",
    "rollback"
  ],
  "server": {
    "entry": "services/api",
    "port": 4208
  },
  "web": {
    "entry": "apps/web",
    "port": 3208
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/prompts",
    "summary": "Prompts",
    "response": {
      "prompts": [
        {
          "id": "pr_1",
          "name": "support",
          "version": "v14",
          "winRate": 0.91
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/experiments",
    "summary": "A/B activos",
    "response": {
      "experiments": [
        {
          "id": "e_1",
          "a": "v13",
          "b": "v14",
          "traffic": 0.5
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/versions",
    "summary": "Nueva versión",
    "requestExample": {
      "promptId": "pr_1",
      "body": "..."
    },
    "response": {
      "version": "v15",
      "status": "draft"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/promote",
    "summary": "Promover ganador",
    "requestExample": {
      "id": "e_1"
    },
    "response": {
      "promoted": "v14",
      "traffic": 1
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
          "title": "Bienvenido a promptops",
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
