export const project = {
  "title": "CopiloC",
  "slug": "copiloc",
  "codename": "copiloc",
  "summary": "Copiloto de código para equipos: indexa el repo, genera PRs, hace code review.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "NestJS",
    "Tree-sitter",
    "PostgreSQL",
    "Anthropic"
  ],
  "modules": [
    "indexing",
    "autocompletar",
    "PR gen",
    "review",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4204
  },
  "web": {
    "entry": "apps/web",
    "port": 3204
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/repos",
    "summary": "Repos indexados",
    "response": {
      "repos": [
        {
          "id": "r_1",
          "name": "monorepo-fe",
          "files": 1820
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/reviews/recent",
    "summary": "Reviews recientes",
    "response": {
      "reviews": [
        {
          "prId": 42,
          "comments": 7,
          "blockers": 1
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/complete",
    "summary": "Autocompletar",
    "requestExample": {
      "context": "function add("
    },
    "response": {
      "completion": "a:number, b:number) { return a+b; }"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/review",
    "summary": "Review PR",
    "requestExample": {
      "prUrl": "https://github.com/x/y/pull/42"
    },
    "response": {
      "jobId": "rev_001",
      "status": "queued"
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
          "title": "Bienvenido a copiloc",
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
