export const project = {
  "title": "CarbonTrack",
  "slug": "carbontrack",
  "codename": "carbontrack",
  "summary": "Medición de huella de carbono corporativa scope 1/2/3 con auto-reporte GHG.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "dbt",
    "Redis"
  ],
  "modules": [
    "inventario",
    "scope 1/2/3",
    "reportes",
    "GHG protocol",
    "sci targets"
  ],
  "server": {
    "entry": "services/api",
    "port": 4230
  },
  "web": {
    "entry": "apps/web",
    "port": 3230
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/inventory",
    "summary": "Inventario",
    "response": {
      "totalTCO2e": 14820,
      "scope1": 4200,
      "scope2": 6420,
      "scope3": 4200
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/sources",
    "summary": "Fuentes",
    "response": {
      "sources": [
        {
          "id": "s_1",
          "name": "Flota",
          "scope": 1,
          "tCO2e": 2100
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/activity",
    "summary": "Activity",
    "requestExample": {
      "sourceId": "s_1",
      "kwh": 12000
    },
    "response": {
      "tCO2e": 5.2,
      "factor": 0.000433
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/report/generate",
    "summary": "Reporte GHG",
    "requestExample": {
      "year": 2026
    },
    "response": {
      "reportId": "rep_001",
      "status": "generating"
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
          "title": "Bienvenido a carbontrack",
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
