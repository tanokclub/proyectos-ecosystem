export const project = {
  "title": "ParkingIQ",
  "slug": "parkingiq",
  "codename": "parkingiq",
  "summary": "Parking inteligente: detección plazas libres, pricing dinámico, reservas.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Computer Vision",
    "Redis"
  ],
  "modules": [
    "plazas",
    "pricing",
    "reservas",
    "pagos",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4271
  },
  "web": {
    "entry": "apps/web",
    "port": 3271
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/lots",
    "summary": "Estacionamientos",
    "response": {
      "lots": [
        {
          "id": "lt_1",
          "name": "Centro",
          "total": 240,
          "available": 84,
          "priceCOP": 4000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/heatmap",
    "summary": "Heatmap demanda",
    "response": {
      "points": [
        {
          "lat": 4.65,
          "lng": -74.05,
          "demand": 0.84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/reserve",
    "summary": "Reservar",
    "requestExample": {
      "lotId": "lt_1",
      "startAt": "2026-05-20T14:00"
    },
    "response": {
      "reservationId": "rs_001",
      "holdMinutes": 15
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/checkin",
    "summary": "Check-in",
    "requestExample": {
      "lotId": "lt_1",
      "plate": "ABC-123"
    },
    "response": {
      "ticketId": "tk_001",
      "validUntil": "2026-05-20T17:00"
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
          "title": "Bienvenido a parkingiq",
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
