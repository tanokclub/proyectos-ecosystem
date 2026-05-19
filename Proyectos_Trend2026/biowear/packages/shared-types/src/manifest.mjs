export const project = {
  "title": "BioWear",
  "slug": "biowear",
  "codename": "biowear",
  "summary": "Biomarkers en tiempo real de wearables (HRV, SpO2, glucosa) con alertas.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "TimescaleDB",
    "Kafka",
    "Anthropic"
  ],
  "modules": [
    "devices",
    "ingesta",
    "alertas",
    "tendencias",
    "sharing médico"
  ],
  "server": {
    "entry": "services/api",
    "port": 4228
  },
  "web": {
    "entry": "apps/web",
    "port": 3228
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/devices",
    "summary": "Dispositivos",
    "response": {
      "devices": [
        {
          "id": "d_1",
          "vendor": "Garmin",
          "battery": 0.82
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/biomarkers/today",
    "summary": "Biomarkers",
    "response": {
      "hrvAvg": 48,
      "restingHR": 62,
      "spO2Avg": 0.97
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/alerts",
    "summary": "Configurar alerta",
    "requestExample": {
      "metric": "hrv",
      "threshold": 30
    },
    "response": {
      "id": "al_001",
      "active": true
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/share/doctor",
    "summary": "Share doctor",
    "requestExample": {
      "doctorEmail": "dr@x.com",
      "days": 30
    },
    "response": {
      "reportUrl": "https://..."
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
          "title": "Bienvenido a biowear",
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
