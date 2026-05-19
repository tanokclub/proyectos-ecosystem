export const project = {
  "title": "SocialFi",
  "slug": "socialfi",
  "codename": "socialfi",
  "summary": "Social tokens y economía creator: monetización on-chain, gates de contenido.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Ethers",
    "Redis"
  ],
  "modules": [
    "tokens creator",
    "gating",
    "tips",
    "rewards",
    "marketplace"
  ],
  "server": {
    "entry": "services/api",
    "port": 4266
  },
  "web": {
    "entry": "apps/web",
    "port": 3266
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/creators",
    "summary": "Creators",
    "response": {
      "creators": [
        {
          "id": "cr_1",
          "handle": "@ana",
          "tokenSymbol": "ANA",
          "holders": 1240
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/gated",
    "summary": "Contenido gated",
    "response": {
      "items": [
        {
          "id": "g_1",
          "title": "Tutorial",
          "requiredTokens": 10
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/tokens/buy",
    "summary": "Comprar token",
    "requestExample": {
      "creatorId": "cr_1",
      "amountETH": 0.01
    },
    "response": {
      "tokens": 10,
      "txHash": "0xtx"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/tip",
    "summary": "Tip creador",
    "requestExample": {
      "creatorId": "cr_1",
      "amountETH": 0.005
    },
    "response": {
      "txHash": "0xtx",
      "amount": 0.005
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
          "title": "Bienvenido a socialfi",
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
