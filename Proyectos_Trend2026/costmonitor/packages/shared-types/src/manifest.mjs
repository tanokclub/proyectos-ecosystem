export const project = {
  "title": "CostMonitor",
  "slug": "costmonitor",
  "codename": "costmonitor",
  "summary": "Cloud cost monitoring multi-nube con anomaly detection y optimización.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Python",
    "PostgreSQL",
    "ClickHouse",
    "AWS SDK"
  ],
  "modules": [
    "ingesta",
    "anomalies",
    "optimización",
    "budgets",
    "reports"
  ],
  "server": {
    "entry": "services/api",
    "port": 4259
  },
  "web": {
    "entry": "apps/web",
    "port": 3259
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/spending",
    "summary": "Gasto",
    "response": {
      "thisMonth": 18420,
      "lastMonth": 17200,
      "projected": 19800,
      "currency": "USD"
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/anomalies",
    "summary": "Anomalías",
    "response": {
      "anomalies": [
        {
          "service": "EC2 sao-1",
          "extraUSD": 240,
          "detectedAt": "2026-05-18"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/budgets",
    "summary": "Crear budget",
    "requestExample": {
      "name": "AWS prod",
      "limitUSD": 20000
    },
    "response": {
      "id": "bd_001",
      "alertAt": 0.8
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/recommendations",
    "summary": "Recomendaciones",
    "requestExample": {
      "scope": "all"
    },
    "response": {
      "savings": 1240,
      "items": [
        "Reservar 12 EC2 m5.large",
        "Eliminar 4 EBS huérfanos"
      ]
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
          "title": "Bienvenido a costmonitor",
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
