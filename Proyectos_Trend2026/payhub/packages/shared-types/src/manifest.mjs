export const project = {
  "title": "PayHub",
  "slug": "payhub",
  "codename": "payhub",
  "summary": "Super-app de pagos: P2P, QR, recargas, servicios, cashback.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Kafka"
  ],
  "modules": [
    "wallet",
    "P2P",
    "QR",
    "recargas",
    "cashback"
  ],
  "server": {
    "entry": "services/api",
    "port": 4219
  },
  "web": {
    "entry": "apps/web",
    "port": 3219
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/wallet",
    "summary": "Wallet",
    "response": {
      "balance": 142500,
      "currency": "COP",
      "cashback": 8400
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/services",
    "summary": "Servicios",
    "response": {
      "services": [
        "celular",
        "luz",
        "agua",
        "internet"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/p2p/send",
    "summary": "Enviar P2P",
    "requestExample": {
      "alias": "pedro.co",
      "amount": 25000
    },
    "response": {
      "txId": "tx_001",
      "status": "completed"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/services/pay",
    "summary": "Pagar servicio",
    "requestExample": {
      "service": "celular",
      "amount": 30000
    },
    "response": {
      "receiptId": "rec_001",
      "cashback": 600
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
          "title": "Bienvenido a payhub",
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
