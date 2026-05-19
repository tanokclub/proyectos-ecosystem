export const project = {
  "title": "CreadorPro",
  "slug": "creadorpro",
  "codename": "creadorpro",
  "summary": "Plataforma all-in-one monetización creators: suscripciones, tips, comisiones, sponsors.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Stripe Connect",
    "Redis"
  ],
  "modules": [
    "perfil",
    "suscripciones",
    "tips",
    "comisiones",
    "sponsors"
  ],
  "server": {
    "entry": "services/api",
    "port": 4280
  },
  "web": {
    "entry": "apps/web",
    "port": 3280
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/creator",
    "summary": "Perfil creator",
    "response": {
      "handle": "@ana",
      "subscribers": 1240,
      "mrr": 14200,
      "currency": "USD"
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/posts",
    "summary": "Posts",
    "response": {
      "posts": [
        {
          "id": "p_1",
          "title": "Tutorial",
          "tier": "pro",
          "accessCount": 142
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/subscribe",
    "summary": "Suscribir",
    "requestExample": {
      "creatorHandle": "@ana",
      "tier": "pro"
    },
    "response": {
      "subscriptionId": "sub_001",
      "tier": "pro",
      "priceUSD": 15
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/tip",
    "summary": "Tip",
    "requestExample": {
      "creatorHandle": "@ana",
      "amountUSD": 5
    },
    "response": {
      "txId": "tx_001",
      "amountUSD": 5,
      "message": "gracias!"
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
          "title": "Bienvenido a creadorpro",
          "read": false,
          "at": "2026-05-19T15:14:47.109Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.109Z"
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
