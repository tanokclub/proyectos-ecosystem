export const project = {
  "title": "LiveAuction",
  "slug": "liveauction",
  "codename": "liveauction",
  "summary": "Livestream commerce: subastas en vivo, ventas flash, gamification, multi-creator.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "WebRTC",
    "Stripe"
  ],
  "modules": [
    "streams",
    "subastas",
    "productos",
    "checkout",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4284
  },
  "web": {
    "entry": "apps/web",
    "port": 3284
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/streams",
    "summary": "Streams",
    "response": {
      "streams": [
        {
          "id": "st_1",
          "title": "Subasta arte",
          "live": true,
          "viewers": 842
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/products",
    "summary": "Productos",
    "response": {
      "products": [
        {
          "id": "p_1",
          "streamId": "st_1",
          "name": "Cuadro original",
          "topBid": 240
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/bid",
    "summary": "Bid",
    "requestExample": {
      "productId": "p_1",
      "amount": 250
    },
    "response": {
      "bidId": "b_001",
      "topBid": 250
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/checkout",
    "summary": "Checkout",
    "requestExample": {
      "productId": "p_1",
      "bidId": "b_001"
    },
    "response": {
      "orderId": "or_001",
      "total": 250
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
          "title": "Bienvenido a liveauction",
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
