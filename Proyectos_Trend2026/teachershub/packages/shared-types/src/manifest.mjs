export const project = {
  "title": "TeachersHub",
  "slug": "teachershub",
  "codename": "teachershub",
  "summary": "Comunidad de docentes: recursos didácticos, planeación AI, marketplace.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Anthropic",
    "S3"
  ],
  "modules": [
    "recursos",
    "planeador AI",
    "marketplace",
    "comunidad",
    "eventos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4249
  },
  "web": {
    "entry": "apps/web",
    "port": 3249
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/resources",
    "summary": "Recursos",
    "response": {
      "resources": [
        {
          "id": "r_1",
          "title": "Plan unidad fracciones",
          "grade": 5,
          "downloads": 1240
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/feed",
    "summary": "Feed",
    "response": {
      "posts": [
        {
          "id": "p_1",
          "author": "María L.",
          "topic": "gamification"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/lessonplan",
    "summary": "Generar plan",
    "requestExample": {
      "topic": "fotosíntesis",
      "grade": 7
    },
    "response": {
      "planUrl": "/plans/...",
      "durationMin": 45
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/marketplace/purchase",
    "summary": "Comprar",
    "requestExample": {
      "resourceId": "r_1"
    },
    "response": {
      "receiptId": "rc_001",
      "total": 12000
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
          "title": "Bienvenido a teachershub",
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
