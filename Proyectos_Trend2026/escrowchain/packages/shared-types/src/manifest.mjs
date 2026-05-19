export const project = {
  "title": "EscrowChain",
  "slug": "escrowchain",
  "codename": "escrowchain",
  "summary": "Escrow on-chain para freelance, M&A y comercio internacional.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Solidity",
    "PostgreSQL",
    "Ethers"
  ],
  "modules": [
    "contratos",
    "milestones",
    "disputas",
    "oracle",
    "multisig"
  ],
  "server": {
    "entry": "services/api",
    "port": 4218
  },
  "web": {
    "entry": "apps/web",
    "port": 3218
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/contracts",
    "summary": "Contratos",
    "response": {
      "contracts": [
        {
          "id": "ec_1",
          "amount": 5000,
          "token": "USDC"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/disputes",
    "summary": "Disputas",
    "response": {
      "disputes": [
        {
          "contractId": "ec_1",
          "status": "arbitration"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/contracts",
    "summary": "Deploy escrow",
    "requestExample": {
      "buyer": "0xa",
      "seller": "0xb",
      "amount": 5000
    },
    "response": {
      "contractAddress": "0xnew"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/release",
    "summary": "Liberar milestone",
    "requestExample": {
      "contractId": "ec_1",
      "milestoneIndex": 0
    },
    "response": {
      "tx": "0xtx",
      "releasedAmount": 1666.67
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
          "title": "Bienvenido a escrowchain",
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
