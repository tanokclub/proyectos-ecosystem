export const project = {
  "title": "ESGReport",
  "slug": "esgreport",
  "codename": "esgreport",
  "summary": "Auto-reporte ESG (TCFD, ISSB, GRI) con scoring AI y data lake.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "dbt",
    "Anthropic"
  ],
  "modules": [
    "frameworks",
    "data ingestion",
    "scoring",
    "reportes",
    "audit"
  ],
  "server": {
    "entry": "services/api",
    "port": 4239
  },
  "web": {
    "entry": "apps/web",
    "port": 3239
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/frameworks",
    "summary": "Frameworks",
    "response": {
      "frameworks": [
        "TCFD",
        "ISSB-S1",
        "GRI",
        "SASB"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/score",
    "summary": "Score ESG",
    "response": {
      "score": 72,
      "e": 68,
      "s": 78,
      "g": 70
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/data/upload",
    "summary": "Upload",
    "requestExample": {
      "framework": "TCFD"
    },
    "response": {
      "ingestId": "in_001",
      "rowsParsed": 1840
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/report/generate",
    "summary": "Reporte",
    "requestExample": {
      "framework": "TCFD"
    },
    "response": {
      "reportId": "rep_001",
      "status": "rendering"
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
          "title": "Bienvenido a esgreport",
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
