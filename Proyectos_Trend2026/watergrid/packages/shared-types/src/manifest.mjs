export const project = {
  "title": "WaterGrid",
  "slug": "watergrid",
  "codename": "watergrid",
  "summary": "Gestión hídrica urbana: medición fugas, calidad, presión, alertas en tiempo real.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "TimescaleDB",
    "MQTT",
    "GIS"
  ],
  "modules": [
    "sensores",
    "fugas",
    "calidad",
    "consumo",
    "alertas"
  ],
  "server": {
    "entry": "services/api",
    "port": 4272
  },
  "web": {
    "entry": "apps/web",
    "port": 3272
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/sensors",
    "summary": "Sensores red",
    "response": {
      "sensors": [
        {
          "id": "wt_1",
          "zone": "Zona 4",
          "pressureBar": 3.2,
          "flowLs": 14.2
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/leaks",
    "summary": "Fugas detectadas",
    "response": {
      "leaks": [
        {
          "id": "lk_1",
          "zone": "Zona 4",
          "confidence": 0.84,
          "estLs": 8
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/quality",
    "summary": "Reportar calidad",
    "requestExample": {
      "sensorId": "wt_1"
    },
    "response": {
      "result": {
        "ph": 7.2,
        "chlorine": 0.4,
        "turbidity": 0.3
      }
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/alerts/configure",
    "summary": "Configurar alerta",
    "requestExample": {
      "metric": "pressure",
      "thresholdMin": 2
    },
    "response": {
      "id": "al_001",
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
          "title": "Bienvenido a watergrid",
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
