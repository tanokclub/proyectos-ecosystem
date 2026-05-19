export const project = {
  "title": "SendyLat",
  "slug": "sendylat",
  "codename": "sendylat",
  "summary": "Remesas LATAM-to-LATAM con rails locales y FX competitivo.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Stellar"
  ],
  "modules": [
    "envío",
    "pickup",
    "KYC",
    "FX",
    "compliance"
  ],
  "server": {
    "entry": "services/api",
    "port": 4212
  },
  "web": {
    "entry": "apps/web",
    "port": 3212
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/corridors",
    "summary": "Corredores",
    "response": {
      "corridors": [
        {
          "from": "US",
          "to": "CO",
          "feePct": 1.2
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/recipients",
    "summary": "Destinatarios",
    "response": {
      "recipients": [
        {
          "id": "r_1",
          "name": "María C.",
          "country": "CO"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/quotes",
    "summary": "Cotizar",
    "requestExample": {
      "from": "USD",
      "to": "COP",
      "amount": 200
    },
    "response": {
      "rate": 4180,
      "fee": 2.4,
      "total": 200
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/transfers",
    "summary": "Enviar",
    "requestExample": {
      "quoteId": "q_1",
      "recipientId": "r_1"
    },
    "response": {
      "transferId": "tr_001",
      "status": "processing"
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
          "title": "Bienvenido a sendylat",
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
