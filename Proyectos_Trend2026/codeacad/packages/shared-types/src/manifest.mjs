export const project = {
  "title": "CodeAcad",
  "slug": "codeacad",
  "codename": "codeacad",
  "summary": "Bootcamp coding LATAM con proyectos reales, mentores y bolsa de empleo.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Docker",
    "Redis"
  ],
  "modules": [
    "cohortes",
    "proyectos",
    "mentoring",
    "sandbox",
    "placement"
  ],
  "server": {
    "entry": "services/api",
    "port": 4244
  },
  "web": {
    "entry": "apps/web",
    "port": 3244
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/cohorts",
    "summary": "Cohortes",
    "response": {
      "cohorts": [
        {
          "id": "co_1",
          "stack": "Fullstack JS",
          "students": 28,
          "startsAt": "2026-06-01"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/projects",
    "summary": "Proyectos",
    "response": {
      "projects": [
        {
          "id": "pr_1",
          "title": "Clone E-commerce",
          "difficulty": "medium"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/sandbox/run",
    "summary": "Run sandbox",
    "requestExample": {
      "lang": "js",
      "code": "console.log(\"Hello World\")"
    },
    "response": {
      "runId": "r_001",
      "output": "Hello World",
      "exitCode": 0
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/apply",
    "summary": "Aplicar cohorte",
    "requestExample": {
      "cohortId": "co_1"
    },
    "response": {
      "applicationId": "app_001",
      "status": "review"
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
          "title": "Bienvenido a codeacad",
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
