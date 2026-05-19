export const project = {
  "title": "KidsAcad",
  "slug": "kidsacad",
  "codename": "kidsacad",
  "summary": "Plataforma educativa para niños 5-12: gamification, parental control, currículo LATAM.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Phaser",
    "Firebase"
  ],
  "modules": [
    "actividades",
    "gamification",
    "parental",
    "progreso",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4246
  },
  "web": {
    "entry": "apps/web",
    "port": 3246
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/activities",
    "summary": "Actividades",
    "response": {
      "activities": [
        {
          "id": "a_1",
          "title": "Matemáticas mágicas",
          "age": "7-9",
          "durationMin": 15
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/parental/dashboard",
    "summary": "Dashboard padres",
    "response": {
      "childId": "k_1",
      "screenTimeMin": 42,
      "mostUsedSubject": "mate"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/activity/complete",
    "summary": "Completar",
    "requestExample": {
      "activityId": "a_1"
    },
    "response": {
      "stars": 3,
      "xp": 24,
      "badges": [
        "speedster"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/parental/limit",
    "summary": "Límite tiempo",
    "requestExample": {
      "childId": "k_1",
      "dailyMaxMin": 60
    },
    "response": {
      "dailyMaxMin": 60,
      "active": true
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
          "title": "Bienvenido a kidsacad",
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
