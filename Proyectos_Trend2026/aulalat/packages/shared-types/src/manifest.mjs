export const project = {
  "title": "AulaLAT",
  "slug": "aulalat",
  "codename": "aulalat",
  "summary": "LMS LATAM con AI tutor, learning paths adaptativos y multi-idioma.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Anthropic"
  ],
  "modules": [
    "cursos",
    "AI tutor",
    "evaluación",
    "gamification",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4240
  },
  "web": {
    "entry": "apps/web",
    "port": 3240
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/courses",
    "summary": "Cursos",
    "response": {
      "courses": [
        {
          "id": "c_1",
          "title": "Algoritmos",
          "students": 1420
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/progress",
    "summary": "Progreso",
    "response": {
      "courseId": "c_1",
      "completionPct": 0.62,
      "streak": 8
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/tutor/ask",
    "summary": "Preguntar tutor",
    "requestExample": {
      "courseId": "c_1",
      "question": "¿qué es Big O?"
    },
    "response": {
      "answer": "La complejidad es O(n)...",
      "sources": [
        "unit_4"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/enroll",
    "summary": "Enrolar",
    "requestExample": {
      "courseId": "c_1"
    },
    "response": {
      "enrollmentId": "e_001",
      "startDate": "2026-05-20"
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
          "title": "Bienvenido a aulalat",
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
