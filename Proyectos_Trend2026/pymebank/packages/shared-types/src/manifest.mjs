export const project = {
  "title": "PymeBank",
  "slug": "pymebank",
  "codename": "pymebank",
  "summary": "Neobanco para PYMEs LATAM: cuenta empresarial, facturación, nómina.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Kafka",
    "Redis"
  ],
  "modules": [
    "cuenta",
    "facturación SAT/DIAN",
    "nómina",
    "préstamos",
    "tarjetas"
  ],
  "server": {
    "entry": "services/api",
    "port": 4214
  },
  "web": {
    "entry": "apps/web",
    "port": 3214
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/business",
    "summary": "Resumen",
    "response": {
      "rfc": "XXX0000000",
      "balance": 12400000,
      "employees": 14
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/invoices",
    "summary": "Facturas",
    "response": {
      "invoices": [
        {
          "id": "inv_1",
          "total": 580000,
          "status": "stamped"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/payroll",
    "summary": "Correr nómina",
    "requestExample": {
      "period": "2026-05",
      "employees": 14
    },
    "response": {
      "runId": "pr_001",
      "totalNet": 8400000
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/loans/apply",
    "summary": "Préstamo",
    "requestExample": {
      "amount": 5000000,
      "term": 24
    },
    "response": {
      "applicationId": "app_001",
      "preApproved": true
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
          "title": "Bienvenido a pymebank",
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
