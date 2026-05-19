export const project = {
  "title": "EVHub",
  "slug": "evhub",
  "codename": "evhub",
  "summary": "Red de carga EV LATAM con roaming, ruta inteligente y reservas.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "OCPP",
    "Mapbox"
  ],
  "modules": [
    "estaciones",
    "roaming",
    "reservas",
    "ruta inteligente",
    "pagos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4238
  },
  "web": {
    "entry": "apps/web",
    "port": 3238
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/stations",
    "summary": "Estaciones",
    "response": {
      "stations": [
        {
          "id": "st_1",
          "name": "Andina Norte",
          "kw": 150
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/sessions",
    "summary": "Sesiones",
    "response": {
      "sessions": [
        {
          "id": "cs_1",
          "kwh": 28.4
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/reserve",
    "summary": "Reservar",
    "requestExample": {
      "stationId": "st_1"
    },
    "response": {
      "reservationId": "rs_001",
      "holdMinutes": 15
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/route",
    "summary": "Planificar",
    "requestExample": {
      "from": "Bogotá",
      "to": "Medellín"
    },
    "response": {
      "stops": [
        {
          "stationId": "st_4",
          "chargeMinutes": 25
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
          "title": "Bienvenido a evhub",
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
