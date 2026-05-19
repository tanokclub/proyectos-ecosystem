export const project = {
  "title": "DAOLatAm",
  "slug": "daolatam",
  "codename": "daolatam",
  "summary": "Gobernanza DAO LATAM: propuestas, votación on-chain, treasury, snapshots.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Solidity",
    "Ethers",
    "PostgreSQL"
  ],
  "modules": [
    "propuestas",
    "votación",
    "treasury",
    "snapshots",
    "delegación"
  ],
  "server": {
    "entry": "services/api",
    "port": 4260
  },
  "web": {
    "entry": "apps/web",
    "port": 3260
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/proposals",
    "summary": "Propuestas",
    "response": {
      "proposals": [
        {
          "id": "pr_1",
          "title": "Liquidez Uniswap",
          "for": 142000,
          "against": 8400
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/treasury",
    "summary": "Treasury",
    "response": {
      "totalUSD": 4200000,
      "tokens": [
        {
          "symbol": "ETH",
          "amount": 84
        },
        {
          "symbol": "USDC",
          "amount": 2200000
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/proposals",
    "summary": "Crear",
    "requestExample": {
      "title": "...",
      "actions": []
    },
    "response": {
      "id": "pr_new",
      "status": "active",
      "endsAt": "2026-05-26"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/vote",
    "summary": "Votar",
    "requestExample": {
      "proposalId": "pr_1",
      "choice": "for"
    },
    "response": {
      "txHash": "0xtx",
      "votePower": 1240
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
          "title": "Bienvenido a daolatam",
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
