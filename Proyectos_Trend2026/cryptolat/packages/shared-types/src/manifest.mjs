export const project = {
  "title": "CryptoLat",
  "slug": "cryptolat",
  "codename": "cryptolat",
  "summary": "Wallet cripto LATAM con on/off-ramp local (PIX, SPEI, PSE).",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Ethers",
    "Bitcore"
  ],
  "modules": [
    "wallet",
    "on-ramp",
    "off-ramp",
    "swap",
    "staking"
  ],
  "server": {
    "entry": "services/api",
    "port": 4211
  },
  "web": {
    "entry": "apps/web",
    "port": 3211
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/balances",
    "summary": "Balances",
    "response": {
      "balances": [
        {
          "token": "BTC",
          "amount": 0.05,
          "usd": 3400
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/quotes",
    "summary": "Quotes swap",
    "response": {
      "quotes": [
        {
          "pair": "BTC/USDC",
          "rate": 68000
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/onramp",
    "summary": "On-ramp PIX/SPEI",
    "requestExample": {
      "fiat": "BRL",
      "amount": 500
    },
    "response": {
      "orderId": "or_001",
      "pixCode": "00020126..."
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/swap",
    "summary": "Swap",
    "requestExample": {
      "from": "BTC",
      "to": "USDC",
      "amount": 0.01
    },
    "response": {
      "txId": "tx_001",
      "etaSec": 30
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
          "title": "Bienvenido a cryptolat",
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
