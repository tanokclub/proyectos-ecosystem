export const project = {
  "title": "AgriSust",
  "slug": "agrisust",
  "codename": "agrisust",
  "summary": "Agritech sustentable: precision farming, agua, suelo, agricultura regenerativa.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "LoRaWAN",
    "Anthropic"
  ],
  "modules": [
    "parcelas",
    "sensores",
    "riego",
    "recomendaciones",
    "mercado"
  ],
  "server": {
    "entry": "services/api",
    "port": 4235
  },
  "web": {
    "entry": "apps/web",
    "port": 3235
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/fields",
    "summary": "Parcelas",
    "response": {
      "fields": [
        {
          "id": "fl_1",
          "name": "Lote Norte",
          "hectares": 18
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/sensors/soil",
    "summary": "Sensores suelo",
    "response": {
      "sensors": [
        {
          "id": "ss_1",
          "moisturePct": 28,
          "ph": 6.4
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/irrigation",
    "summary": "Riego",
    "requestExample": {
      "fieldId": "fl_1",
      "mm": 12
    },
    "response": {
      "scheduleId": "irr_001"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/recommend",
    "summary": "Recomendar",
    "requestExample": {
      "fieldId": "fl_1"
    },
    "response": {
      "actions": [
        "Aplicar potasio 40kg/ha"
      ]
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
          "title": "Bienvenido a agrisust",
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
