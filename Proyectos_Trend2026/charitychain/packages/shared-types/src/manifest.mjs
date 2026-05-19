export const project = {
  "title": "CharityChain",
  "slug": "charitychain",
  "codename": "charitychain",
  "summary": "Donaciones transparentes on-chain con milestones y verificación de impacto.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Solidity",
    "Ethers",
    "IPFS"
  ],
  "modules": [
    "campañas",
    "milestones",
    "donaciones",
    "verificación impacto",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4269
  },
  "web": {
    "entry": "apps/web",
    "port": 3269
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/campaigns",
    "summary": "Campañas",
    "response": {
      "campaigns": [
        {
          "id": "cm_1",
          "title": "Escuela rural",
          "raisedUSDC": 24000,
          "goalUSDC": 50000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/milestones",
    "summary": "Milestones",
    "response": {
      "milestones": [
        {
          "campaignId": "cm_1",
          "name": "Compra materiales",
          "status": "verified"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/donate",
    "summary": "Donar",
    "requestExample": {
      "campaignId": "cm_1",
      "amountUSDC": 100
    },
    "response": {
      "txHash": "0xtx",
      "amount": 100
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/verify-impact",
    "summary": "Verificar impacto",
    "requestExample": {
      "campaignId": "cm_1",
      "milestoneId": "ms_1"
    },
    "response": {
      "verifierId": "vf_001",
      "proofUri": "ipfs://..."
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
          "title": "Bienvenido a charitychain",
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
