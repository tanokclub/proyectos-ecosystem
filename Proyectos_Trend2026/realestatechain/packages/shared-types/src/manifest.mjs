export const project = {
  "title": "RealEstateChain",
  "slug": "realestatechain",
  "codename": "realestatechain",
  "summary": "Fractionalize real estate: tokens ERC-3643, rentas on-chain, marketplace LATAM.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Solidity",
    "Ethers",
    "PostgreSQL"
  ],
  "modules": [
    "propiedades",
    "tokenización",
    "rentas",
    "governance",
    "mercado secundario"
  ],
  "server": {
    "entry": "services/api",
    "port": 4264
  },
  "web": {
    "entry": "apps/web",
    "port": 3264
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/properties",
    "summary": "Propiedades",
    "response": {
      "properties": [
        {
          "id": "pp_1",
          "address": "Bogotá Norte",
          "valueUSD": 250000,
          "tokens": 250000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/holdings",
    "summary": "Holdings",
    "response": {
      "holdings": [
        {
          "propertyId": "pp_1",
          "tokens": 1200,
          "valueUSD": 1200
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/buy",
    "summary": "Comprar",
    "requestExample": {
      "propertyId": "pp_1",
      "tokens": 100
    },
    "response": {
      "txHash": "0xtx",
      "tokens": 100
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/dividends/claim",
    "summary": "Claim dividendos",
    "requestExample": {
      "propertyId": "pp_1"
    },
    "response": {
      "claimed": 84.5,
      "currency": "USDC"
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
          "title": "Bienvenido a realestatechain",
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
