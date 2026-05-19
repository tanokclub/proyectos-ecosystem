export const project = {
  "title": "TokenLaunch",
  "slug": "tokenlaunch",
  "codename": "tokenlaunch",
  "summary": "Launchpad de tokens: IDO, LBP, vesting, anti-bot, KYC integrado.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Solidity",
    "Ethers",
    "PostgreSQL"
  ],
  "modules": [
    "proyectos",
    "IDO",
    "vesting",
    "KYC",
    "staking tiers"
  ],
  "server": {
    "entry": "services/api",
    "port": 4262
  },
  "web": {
    "entry": "apps/web",
    "port": 3262
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/launches",
    "summary": "Launches",
    "response": {
      "launches": [
        {
          "id": "ln_1",
          "name": "PYME Token",
          "raise": 800000,
          "status": "live"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/tiers",
    "summary": "Tiers staking",
    "response": {
      "tiers": [
        {
          "name": "silver",
          "stake": 1000,
          "allocation": 200
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/participate",
    "summary": "Participar",
    "requestExample": {
      "launchId": "ln_1",
      "amountUSDC": 500
    },
    "response": {
      "allocation": 250,
      "txHash": "0xtx"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/vesting/claim",
    "summary": "Claim vesting",
    "requestExample": {
      "launchId": "ln_1"
    },
    "response": {
      "released": 142,
      "nextUnlock": "2026-06-19"
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
          "title": "Bienvenido a tokenlaunch",
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
