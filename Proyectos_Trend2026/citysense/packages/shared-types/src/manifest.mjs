export const project = {
  "title": "CitySense",
  "slug": "citysense",
  "codename": "citysense",
  "summary": "Smart city dashboard: sensores urbanos, alertas, gestión incidentes municipales.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "TimescaleDB",
    "MQTT"
  ],
  "modules": [
    "sensores urbanos",
    "incidentes",
    "dashboard",
    "predicción",
    "ciudadanos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4270
  },
  "web": {
    "entry": "apps/web",
    "port": 3270
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/sensors",
    "summary": "Sensores",
    "response": {
      "sensors": [
        {
          "id": "ss_1",
          "type": "noise",
          "dbA": 64,
          "zone": "Centro"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/incidents",
    "summary": "Incidentes",
    "response": {
      "incidents": [
        {
          "id": "in_1",
          "type": "street_light_out",
          "priority": "low"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/incidents",
    "summary": "Reportar",
    "requestExample": {
      "type": "pothole",
      "lat": 4.65,
      "lng": -74.05
    },
    "response": {
      "id": "in_new",
      "status": "queued"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/sensors/calibrate",
    "summary": "Calibrar",
    "requestExample": {
      "sensorId": "ss_1"
    },
    "response": {
      "sensorId": "ss_1",
      "calibratedAt": "2026-05-19T15:14:47.104Z"
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
          "title": "Bienvenido a citysense",
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
