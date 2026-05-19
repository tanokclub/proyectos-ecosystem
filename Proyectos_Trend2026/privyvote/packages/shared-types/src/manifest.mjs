export const project = {
  "title": "PrivyVote",
  "slug": "privyvote",
  "codename": "privyvote",
  "summary": "Voting privado ZK para DAOs, organizaciones y gobiernos: anónimo y verificable.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Foundry",
    "Circom",
    "Ethers",
    "PostgreSQL"
  ],
  "modules": [
    "proposals",
    "voting ZK",
    "tally",
    "audit",
    "verifiers"
  ],
  "server": {
    "entry": "services/api",
    "port": 4267
  },
  "web": {
    "entry": "apps/web",
    "port": 3267
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/ballots",
    "summary": "Boletas",
    "response": {
      "ballots": [
        {
          "id": "b_1",
          "title": "Junta 2026",
          "status": "voting",
          "endsAt": "2026-05-25"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/proofs",
    "summary": "Pruebas ZK",
    "response": {
      "totalProofs": 1840,
      "verified": 1840
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/vote",
    "summary": "Vote ZK",
    "requestExample": {
      "ballotId": "b_1",
      "proof": "...",
      "publicSignals": []
    },
    "response": {
      "proofHash": "0xpf",
      "accepted": true
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/tally",
    "summary": "Tally",
    "requestExample": {
      "ballotId": "b_1"
    },
    "response": {
      "results": {
        "for": 1420,
        "against": 420,
        "abstain": 20
      }
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
          "title": "Bienvenido a privyvote",
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
