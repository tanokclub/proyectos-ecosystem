export const project = {
  "title": "ObservaLAT",
  "slug": "observalat",
  "codename": "observalat",
  "summary": "Observabilidad open source: logs, métricas, traces, alertas, OpenTelemetry.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Go",
    "ClickHouse",
    "OpenTelemetry",
    "Redis"
  ],
  "modules": [
    "logs",
    "métricas",
    "traces",
    "alertas",
    "dashboards"
  ],
  "server": {
    "entry": "services/api",
    "port": 4251
  },
  "web": {
    "entry": "apps/web",
    "port": 3251
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/services",
    "summary": "Servicios",
    "response": {
      "services": [
        {
          "name": "api-gw",
          "errorRate": 0.004,
          "p95Ms": 142
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/alerts",
    "summary": "Alertas activas",
    "response": {
      "alerts": [
        {
          "id": "al_1",
          "service": "api-gw",
          "severity": "warn"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/query",
    "summary": "Query logs",
    "requestExample": {
      "query": "service=api-gw severity=error",
      "range": "1h"
    },
    "response": {
      "results": 1842,
      "traces": [
        "tr_1",
        "tr_2"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/alerts",
    "summary": "Crear alerta",
    "requestExample": {
      "service": "api-gw",
      "threshold": {
        "errorRate": 0.02
      }
    },
    "response": {
      "id": "al_new",
      "active": true
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
          "title": "Bienvenido a observalat",
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
