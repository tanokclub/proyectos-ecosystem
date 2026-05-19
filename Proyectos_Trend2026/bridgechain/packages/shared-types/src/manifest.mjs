export const project = {
  "title": "BridgeChain",
  "slug": "bridgechain",
  "codename": "bridgechain",
  "summary": "Bridge cross-chain optimizado para corredores LATAM (ETH↔ARB↔BASE↔OP).",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "LayerZero",
    "Ethers",
    "PostgreSQL"
  ],
  "modules": [
    "cotización",
    "transferencia",
    "liquidity",
    "security",
    "monitoring"
  ],
  "server": {
    "entry": "services/api",
    "port": 4263
  },
  "web": {
    "entry": "apps/web",
    "port": 3263
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/routes",
    "summary": "Rutas bridge",
    "response": {
      "routes": [
        {
          "from": "ETH",
          "to": "BASE",
          "feePct": 0.1,
          "etaSec": 90
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/liquidity",
    "summary": "Liquidez",
    "response": {
      "pools": [
        {
          "chain": "BASE",
          "token": "USDC",
          "amount": 4200000
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/quote",
    "summary": "Cotizar",
    "requestExample": {
      "from": "ETH",
      "to": "BASE",
      "token": "USDC",
      "amount": 1000
    },
    "response": {
      "quoteId": "q_001",
      "fee": 0.5,
      "etaSec": 90
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/transfer",
    "summary": "Transferir",
    "requestExample": {
      "quoteId": "q_001"
    },
    "response": {
      "txHash": "0xtx",
      "status": "pending"
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
          "title": "Bienvenido a bridgechain",
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
