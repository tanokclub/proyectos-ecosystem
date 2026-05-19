export const project = {
  "title": "MedReminder",
  "slug": "medreminder",
  "codename": "medreminder",
  "summary": "App de adherencia a tratamiento: recordatorios, refills, analytics.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Firebase",
    "Twilio"
  ],
  "modules": [
    "recordatorios",
    "medicamentos",
    "adherencia",
    "farmacia",
    "caregivers"
  ],
  "server": {
    "entry": "services/api",
    "port": 4223
  },
  "web": {
    "entry": "apps/web",
    "port": 3223
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/meds",
    "summary": "Medicamentos",
    "response": {
      "meds": [
        {
          "id": "m_1",
          "name": "Losartán 50mg",
          "adherencePct": 0.87
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/today",
    "summary": "Tomas hoy",
    "response": {
      "items": [
        {
          "medId": "m_1",
          "time": "08:00",
          "taken": true
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/log",
    "summary": "Logear toma",
    "requestExample": {
      "medId": "m_1",
      "time": "08:00",
      "taken": true
    },
    "response": {
      "logged": true,
      "streakDays": 14
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/refill",
    "summary": "Refill",
    "requestExample": {
      "medId": "m_1"
    },
    "response": {
      "orderId": "ref_001",
      "eta": "24h"
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
          "title": "Bienvenido a medreminder",
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
