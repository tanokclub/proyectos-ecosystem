export const project = {
  "title": "TestPrep",
  "slug": "testprep",
  "codename": "testprep",
  "summary": "Preparación adaptativa a exámenes oficiales: LSAT, MCAT, ICFES, ENEM, PAES.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "XGBoost",
    "Anthropic"
  ],
  "modules": [
    "simulacros",
    "banco preguntas",
    "adaptive learning",
    "analytics",
    "tutor"
  ],
  "server": {
    "entry": "services/api",
    "port": 4243
  },
  "web": {
    "entry": "apps/web",
    "port": 3243
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/exams",
    "summary": "Exámenes",
    "response": {
      "exams": [
        "ICFES",
        "ENEM",
        "PAES",
        "LSAT",
        "MCAT"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/diagnostics",
    "summary": "Diagnóstico",
    "response": {
      "score": 720,
      "percentile": 78,
      "weakAreas": [
        "lectura crítica"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/simulacro",
    "summary": "Simulacro",
    "requestExample": {
      "exam": "ICFES"
    },
    "response": {
      "simulacroId": "sim_001",
      "durationMin": 180
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/answer",
    "summary": "Responder",
    "requestExample": {
      "questionId": "q_1",
      "answer": "B"
    },
    "response": {
      "correct": true,
      "explanation": "..."
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
          "title": "Bienvenido a testprep",
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
