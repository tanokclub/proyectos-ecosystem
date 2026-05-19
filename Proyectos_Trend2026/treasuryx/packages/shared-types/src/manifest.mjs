export const project = {
  "title": "TreasuryX",
  "slug": "treasuryx",
  "codename": "treasuryx",
  "summary": "Tesorería corporativa LATAM multi-moneda con cash forecasting AI.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "ClickHouse",
    "Prophet"
  ],
  "modules": [
    "multi-moneda",
    "forecast",
    "FX hedging",
    "pagos",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4216
  },
  "web": {
    "entry": "apps/web",
    "port": 3216
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/positions",
    "summary": "Posiciones",
    "response": {
      "positions": [
        {
          "ccy": "USD",
          "amount": 480000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/forecast",
    "summary": "Forecast 30d",
    "response": {
      "points": [
        {
          "day": 1,
          "ccy": "USD",
          "expected": 12400
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/hedge",
    "summary": "Hedge FX",
    "requestExample": {
      "from": "BRL",
      "to": "USD",
      "amount": 500000
    },
    "response": {
      "hedgeId": "h_001",
      "rate": 5.42
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/payments/batch",
    "summary": "Batch pagos",
    "requestExample": {
      "count": 42
    },
    "response": {
      "batchId": "b_001",
      "total": 8400000
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
          "title": "Bienvenido a treasuryx",
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
