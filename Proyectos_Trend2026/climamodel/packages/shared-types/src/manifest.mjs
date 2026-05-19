export const project = {
  "title": "ClimaModel",
  "slug": "climamodel",
  "codename": "climamodel",
  "summary": "Modelado climático local con descarga estadística y proyecciones IPCC.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "xarray",
    "PostgreSQL",
    "Anthropic"
  ],
  "modules": [
    "scenarios",
    "descarga",
    "ensemble",
    "riesgos",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4237
  },
  "web": {
    "entry": "apps/web",
    "port": 3237
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/scenarios",
    "summary": "Escenarios",
    "response": {
      "scenarios": [
        "SSP1-2.6",
        "SSP2-4.5",
        "SSP5-8.5"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/projections",
    "summary": "Proyección",
    "response": {
      "city": "Lima",
      "tempIncrease2050C": 1.8
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/analyze",
    "summary": "Analizar",
    "requestExample": {
      "lat": -12,
      "lng": -77,
      "scenario": "SSP2-4.5"
    },
    "response": {
      "risks": [
        "sequía"
      ],
      "score": 0.72
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/report",
    "summary": "Reporte",
    "requestExample": {
      "region": "Lima"
    },
    "response": {
      "reportId": "cm_001",
      "status": "queued"
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
          "title": "Bienvenido a climamodel",
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
