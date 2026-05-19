export const project = {
  "title": "MusicSplit",
  "slug": "musicsplit",
  "codename": "musicsplit",
  "summary": "Royalty splits para músicos: smart contracts, distribución automática, regalías globales.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "Foundry",
    "PostgreSQL",
    "Ethers",
    "Spotify API"
  ],
  "modules": [
    "canciones",
    "splits",
    "distribución",
    "cobros",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4287
  },
  "web": {
    "entry": "apps/web",
    "port": 3287
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/tracks",
    "summary": "Tracks",
    "response": {
      "tracks": [
        {
          "id": "tr_1",
          "title": "Sol",
          "streams": 124000,
          "royaltiesUSD": 184
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/splits",
    "summary": "Splits",
    "response": {
      "trackId": "tr_1",
      "collaborators": [
        {
          "name": "Ana",
          "pct": 50
        },
        {
          "name": "Juan",
          "pct": 50
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/splits",
    "summary": "Crear split",
    "requestExample": {
      "trackId": "tr_1",
      "collaborators": [
        {
          "wallet": "0xa",
          "pct": 50
        }
      ]
    },
    "response": {
      "contractAddress": "0xnew",
      "deployedAt": "2026-05-19T15:14:47.107Z"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/payout",
    "summary": "Payout",
    "requestExample": {
      "trackId": "tr_1"
    },
    "response": {
      "distributed": 184,
      "currency": "USDC",
      "txHash": "0xtx"
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
          "title": "Bienvenido a musicsplit",
          "read": false,
          "at": "2026-05-19T15:14:47.110Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.110Z"
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
