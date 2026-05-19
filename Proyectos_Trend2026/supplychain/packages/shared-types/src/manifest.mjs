export const project = {
  "title": "SupplyChain",
  "slug": "supplychain",
  "codename": "supplychain",
  "summary": "Trazabilidad supply chain on-chain: hashing por lote, IoT integrado, audit.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "Hyperledger",
    "PostgreSQL",
    "Redis",
    "IoT"
  ],
  "modules": [
    "lotes",
    "trazabilidad",
    "sensores",
    "audit",
    "compliance"
  ],
  "server": {
    "entry": "services/api",
    "port": 4268
  },
  "web": {
    "entry": "apps/web",
    "port": 3268
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/batches",
    "summary": "Lotes",
    "response": {
      "batches": [
        {
          "id": "bt_1",
          "product": "Café Huila",
          "origin": "CO",
          "stages": 5
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/sensors",
    "summary": "Sensores IoT",
    "response": {
      "sensors": [
        {
          "id": "ss_1",
          "batchId": "bt_1",
          "tempC": 22,
          "humidity": 0.65
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/batches",
    "summary": "Crear lote",
    "requestExample": {
      "product": "Cacao",
      "origin": "EC"
    },
    "response": {
      "id": "bt_new",
      "txHash": "0xtx"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/stage",
    "summary": "Registrar stage",
    "requestExample": {
      "batchId": "bt_1",
      "stage": "transit",
      "location": "Cartagena"
    },
    "response": {
      "stageHash": "0xst",
      "confirmedOnChain": true
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
          "title": "Bienvenido a supplychain",
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
