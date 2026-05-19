export const project = {
  "title": "SolarMesh",
  "slug": "solarmesh",
  "codename": "solarmesh",
  "summary": "Plataforma para microgrids solares comunitarios con tokenización energía.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "InfluxDB",
    "Ethers"
  ],
  "modules": [
    "sites",
    "producción",
    "consumo",
    "P2P energy",
    "tokens"
  ],
  "server": {
    "entry": "services/api",
    "port": 4233
  },
  "web": {
    "entry": "apps/web",
    "port": 3233
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/sites",
    "summary": "Sitios",
    "response": {
      "sites": [
        {
          "id": "st_1",
          "name": "Sol del Valle",
          "capacityKw": 240
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/production",
    "summary": "Producción",
    "response": {
      "totalKwh": 1840,
      "avgKw": 76.7
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/trade",
    "summary": "P2P energy",
    "requestExample": {
      "fromHome": "h_1",
      "toHome": "h_2",
      "kwh": 4.5
    },
    "response": {
      "tradeId": "tr_001",
      "priceTokens": 4.5
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/forecast",
    "summary": "Forecast",
    "requestExample": {
      "siteId": "st_1",
      "hours": 24
    },
    "response": {
      "points": [
        {
          "hour": 12,
          "kwh": 198
        }
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
          "title": "Bienvenido a solarmesh",
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
