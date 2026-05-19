export const project = {
  "title": "CalmaMente",
  "slug": "calmamente",
  "codename": "calmamente",
  "summary": "Salud mental con chat AI + matching con terapeutas LATAM certificados.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Anthropic",
    "Twilio"
  ],
  "modules": [
    "chat",
    "screening",
    "matching",
    "sesiones",
    "crisis"
  ],
  "server": {
    "entry": "services/api",
    "port": 4224
  },
  "web": {
    "entry": "apps/web",
    "port": 3224
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/therapists",
    "summary": "Terapeutas",
    "response": {
      "therapists": [
        {
          "id": "t_1",
          "name": "Dra. Silva",
          "priceUSD": 35
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/screenings",
    "summary": "Tests",
    "response": {
      "tests": [
        "PHQ-9",
        "GAD-7",
        "PSS-10"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/chat",
    "summary": "Chat AI",
    "requestExample": {
      "text": "ansiedad"
    },
    "response": {
      "reply": "cuéntame más...",
      "safetyFlags": []
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/screening",
    "summary": "Tomar test",
    "requestExample": {
      "test": "PHQ-9",
      "answers": [
        1,
        2
      ]
    },
    "response": {
      "score": 7,
      "level": "mild"
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
          "title": "Bienvenido a calmamente",
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
