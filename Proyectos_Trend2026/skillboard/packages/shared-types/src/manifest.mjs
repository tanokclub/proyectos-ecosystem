export const project = {
  "title": "SkillBoard",
  "slug": "skillboard",
  "codename": "skillboard",
  "summary": "Recruiting con skill graph: matching técnico, evaluación, take-home automatizado.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "XGBoost",
    "Docker"
  ],
  "modules": [
    "perfil técnico",
    "jobs",
    "matching",
    "evaluaciones",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4248
  },
  "web": {
    "entry": "apps/web",
    "port": 3248
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/jobs",
    "summary": "Jobs",
    "response": {
      "jobs": [
        {
          "id": "j_1",
          "title": "Sr BE Eng",
          "company": "StartupX",
          "remote": true,
          "salaryUSD": 6000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/matches",
    "summary": "Matches",
    "response": {
      "matches": [
        {
          "jobId": "j_1",
          "score": 0.91,
          "gaps": [
            "rust"
          ]
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/evaluations/start",
    "summary": "Empezar eval",
    "requestExample": {
      "jobId": "j_1",
      "type": "take-home"
    },
    "response": {
      "evalId": "ev_001",
      "durationMin": 60
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/apply",
    "summary": "Aplicar",
    "requestExample": {
      "jobId": "j_1"
    },
    "response": {
      "applicationId": "app_001",
      "status": "submitted"
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
          "title": "Bienvenido a skillboard",
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
