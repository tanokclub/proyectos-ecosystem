export const project = {
  "title": "AgriDrone",
  "slug": "agridrone",
  "codename": "agridrone",
  "summary": "Drones agrícolas para mapeo, monitoreo cultivos y aspersión de precisión.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "CV",
    "PX4"
  ],
  "modules": [
    "flotas drones",
    "misiones",
    "mapeo NDVI",
    "aspersión",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4277
  },
  "web": {
    "entry": "apps/web",
    "port": 3277
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/drones",
    "summary": "Drones",
    "response": {
      "drones": [
        {
          "id": "dr_1",
          "model": "DJI Agras T40",
          "battery": 0.92,
          "status": "idle"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/missions",
    "summary": "Misiones",
    "response": {
      "missions": [
        {
          "id": "ms_1",
          "field": "Lote 4",
          "type": "survey",
          "durationMin": 22
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/missions",
    "summary": "Crear misión",
    "requestExample": {
      "droneId": "dr_1",
      "fieldId": "fl_1",
      "type": "survey"
    },
    "response": {
      "id": "ms_new",
      "status": "planning",
      "estDurationMin": 22
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/missions/launch",
    "summary": "Lanzar misión",
    "requestExample": {
      "missionId": "ms_new"
    },
    "response": {
      "missionId": "ms_new",
      "launchedAt": "2026-05-19T15:14:47.105Z"
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
          "title": "Bienvenido a agridrone",
          "read": false,
          "at": "2026-05-19T15:14:47.109Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.109Z"
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
