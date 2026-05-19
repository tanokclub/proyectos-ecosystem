export const project = {
  "title": "FactorLAT",
  "slug": "factorlat",
  "codename": "factorlat",
  "summary": "Marketplace de factoring/invoice finance B2B en LATAM.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Postgres"
  ],
  "modules": [
    "emisores",
    "inversionistas",
    "subasta",
    "cobranza",
    "compliance"
  ],
  "server": {
    "entry": "services/api",
    "port": 4217
  },
  "web": {
    "entry": "apps/web",
    "port": 3217
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/invoices/available",
    "summary": "Facturas en oferta",
    "response": {
      "items": [
        {
          "id": "inv_1",
          "faceValue": 2400000,
          "discountPctTarget": 8
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/portfolio",
    "summary": "Portafolio",
    "response": {
      "totalUSD": 84000,
      "irrAvg": 0.142
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/bid",
    "summary": "Bid",
    "requestExample": {
      "invoiceId": "inv_1",
      "discountPct": 7.5
    },
    "response": {
      "bidId": "b_001",
      "status": "queued"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/invoices",
    "summary": "Subir factura",
    "requestExample": {
      "xmlUrl": "https://..."
    },
    "response": {
      "id": "inv_new",
      "status": "validating"
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
          "title": "Bienvenido a factorlat",
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
