export const project = {
  "title": "CarbonMarket",
  "slug": "carbonmarket",
  "codename": "carbonmarket",
  "summary": "Marketplace de créditos de carbono verificados (Verra, Gold Standard) LATAM.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Ethers",
    "Stripe"
  ],
  "modules": [
    "catálogo",
    "proyectos",
    "compra",
    "retiro",
    "verificación"
  ],
  "server": {
    "entry": "services/api",
    "port": 4231
  },
  "web": {
    "entry": "apps/web",
    "port": 3231
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/projects",
    "summary": "Proyectos",
    "response": {
      "projects": [
        {
          "id": "cp_1",
          "name": "Amazonas",
          "tCO2eAvail": 4200,
          "pricePerT": 12
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/portfolio",
    "summary": "Portafolio",
    "response": {
      "totalTCO2e": 180,
      "retiredTCO2e": 60
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/buy",
    "summary": "Comprar",
    "requestExample": {
      "projectId": "cp_1",
      "tCO2e": 50
    },
    "response": {
      "orderId": "or_001",
      "total": 600
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/retire",
    "summary": "Retirar",
    "requestExample": {
      "tCO2e": 50,
      "reason": "CSR"
    },
    "response": {
      "retirementId": "re_001",
      "certificateUrl": "https://..."
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
          "title": "Bienvenido a carbonmarket",
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
