export const project = {
  "title": "PathfinderAI",
  "slug": "pathfinderai",
  "codename": "pathfinderai",
  "summary": "Coaching de carrera con AI: roadmap personalizado y matching de oportunidades.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Anthropic"
  ],
  "modules": [
    "perfil",
    "roadmap",
    "oportunidades",
    "mentoring",
    "progreso"
  ],
  "server": {
    "entry": "services/api",
    "port": 4241
  },
  "web": {
    "entry": "apps/web",
    "port": 3241
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/roadmap",
    "summary": "Roadmap",
    "response": {
      "goal": "Senior FE Eng",
      "milestones": [
        {
          "name": "React avanzado",
          "status": "done"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/opportunities",
    "summary": "Oportunidades",
    "response": {
      "items": [
        {
          "company": "StartupX",
          "role": "Sr FE",
          "matchPct": 0.84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/assessment",
    "summary": "Assessment",
    "requestExample": {
      "resume": "..."
    },
    "response": {
      "strengths": [
        "React",
        "TS"
      ],
      "gaps": [
        "System Design"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/coaching/session",
    "summary": "Sesión coach",
    "requestExample": {
      "topic": "leadership"
    },
    "response": {
      "sessionId": "cs_001",
      "scheduledAt": "2026-05-22"
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
          "title": "Bienvenido a pathfinderai",
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
