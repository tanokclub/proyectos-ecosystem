export const project = {
  "title": "FitCoach",
  "slug": "fitcoach",
  "codename": "fitcoach",
  "summary": "Entrenador AI con plan personalizado: ejercicio, recuperación, nutrición.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Anthropic"
  ],
  "modules": [
    "plan",
    "rutinas",
    "wearable sync",
    "progreso",
    "comunidad"
  ],
  "server": {
    "entry": "services/api",
    "port": 4225
  },
  "web": {
    "entry": "apps/web",
    "port": 3225
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/plan",
    "summary": "Plan",
    "response": {
      "goal": "fuerza",
      "weeks": 12,
      "currentWeek": 3
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/today",
    "summary": "Sesión hoy",
    "response": {
      "exercises": [
        {
          "name": "Sentadilla",
          "sets": 4,
          "reps": 8
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/log",
    "summary": "Logear",
    "requestExample": {
      "exerciseId": "sentadilla",
      "sets": [
        80
      ]
    },
    "response": {
      "logged": true,
      "prDetected": true
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/plan/regenerate",
    "summary": "Replan",
    "requestExample": {
      "reason": "lesión"
    },
    "response": {
      "jobId": "pl_001",
      "etaSeconds": 8
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
          "title": "Bienvenido a fitcoach",
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
