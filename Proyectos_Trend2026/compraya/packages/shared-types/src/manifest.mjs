export const project = {
  "title": "CompraYa",
  "slug": "compraya",
  "codename": "compraya",
  "summary": "BNPL para retail LATAM: split en 3-12 cuotas sin intereses.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Stripe"
  ],
  "modules": [
    "checkout",
    "cuotas",
    "scoring",
    "cobranza",
    "merchants"
  ],
  "server": {
    "entry": "services/api",
    "port": 4213
  },
  "web": {
    "entry": "apps/web",
    "port": 3213
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/orders",
    "summary": "Órdenes",
    "response": {
      "orders": [
        {
          "id": "or_1",
          "merchant": "Falabella",
          "total": 850000,
          "installments": 3
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/merchants",
    "summary": "Merchants",
    "response": {
      "merchants": [
        {
          "id": "m_1",
          "name": "Falabella",
          "country": "CL"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/checkout",
    "summary": "Checkout BNPL",
    "requestExample": {
      "merchantId": "m_1",
      "total": 250000
    },
    "response": {
      "sessionId": "ck_001",
      "plans": [
        {
          "n": 3,
          "monthly": 83333
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/score",
    "summary": "Score cliente",
    "requestExample": {
      "docId": "12345"
    },
    "response": {
      "approved": true,
      "limit": 2000000
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
          "title": "Bienvenido a compraya",
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
