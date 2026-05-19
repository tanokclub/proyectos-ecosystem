export const project = {
  "title": "NFTArte",
  "slug": "nftarte",
  "codename": "nftarte",
  "summary": "Marketplace NFT arte LATAM con royalties on-chain y curaduría.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Ethers",
    "IPFS"
  ],
  "modules": [
    "catálogo",
    "subastas",
    "royalties",
    "curaduría",
    "minting"
  ],
  "server": {
    "entry": "services/api",
    "port": 4261
  },
  "web": {
    "entry": "apps/web",
    "port": 3261
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/listings",
    "summary": "Listings",
    "response": {
      "listings": [
        {
          "id": "l_1",
          "title": "Andes Dreamscape",
          "artist": "Carla R.",
          "priceETH": 0.42
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/auctions",
    "summary": "Subastas",
    "response": {
      "auctions": [
        {
          "id": "a_1",
          "topBid": 0.65,
          "endsAt": "2026-05-22T20:00"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/mint",
    "summary": "Mint",
    "requestExample": {
      "metadataUri": "ipfs://...",
      "royaltyPct": 10
    },
    "response": {
      "tokenId": 142,
      "txHash": "0xtx"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/bid",
    "summary": "Bid",
    "requestExample": {
      "auctionId": "a_1",
      "amountETH": 0.7
    },
    "response": {
      "bidId": "b_001",
      "topBid": 0.7
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
          "title": "Bienvenido a nftarte",
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
