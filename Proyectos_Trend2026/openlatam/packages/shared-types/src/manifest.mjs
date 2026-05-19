export const project = {
  "title": "OpenLatAm",
  "slug": "openlatam",
  "codename": "openlatam",
  "summary": "Open banking LATAM: agrega cuentas vía PIX, CoDi, PSE, CMF, CMA.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Kafka"
  ],
  "modules": [
    "conexiones",
    "cuentas",
    "transacciones",
    "consents",
    "agregación"
  ],
  "server": {
    "entry": "services/api",
    "port": 4210
  },
  "web": {
    "entry": "apps/web",
    "port": 3210
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/connections",
    "summary": "Conexiones bancarias",
    "response": {
      "connections": [
        {
          "id": "cn_1",
          "bank": "Itaú",
          "status": "active"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/accounts/aggregated",
    "summary": "Cuentas agregadas",
    "response": {
      "accounts": [
        {
          "id": "a_1",
          "balance": 12450,
          "currency": "BRL"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/consents",
    "summary": "Crear consent",
    "requestExample": {
      "bank": "Itaú",
      "scopes": [
        "accounts"
      ]
    },
    "response": {
      "consentUrl": "https://itau.com/consent/..."
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/sync",
    "summary": "Forzar sync",
    "requestExample": {
      "connectionId": "cn_1"
    },
    "response": {
      "jobId": "sync_001",
      "etaSeconds": 12
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
          "title": "Bienvenido a openlatam",
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
