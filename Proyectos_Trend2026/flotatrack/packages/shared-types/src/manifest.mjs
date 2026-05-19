export const project = {
  "title": "FlotaTrack",
  "slug": "flotatrack",
  "codename": "flotatrack",
  "summary": "Fleet management LATAM: GPS, ELD, mantenimiento predictivo, telemática.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "TimescaleDB",
    "OBD-II"
  ],
  "modules": [
    "vehículos",
    "telemática",
    "rutas",
    "mantenimiento",
    "compliance"
  ],
  "server": {
    "entry": "services/api",
    "port": 4275
  },
  "web": {
    "entry": "apps/web",
    "port": 3275
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/vehicles",
    "summary": "Vehículos",
    "response": {
      "vehicles": [
        {
          "id": "v_1",
          "plate": "ABC-123",
          "kmsToday": 184,
          "fuelPct": 0.42
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/maintenance",
    "summary": "Mantenimiento",
    "response": {
      "items": [
        {
          "vehicleId": "v_1",
          "component": "frenos",
          "dueInKm": 1200
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/routes/assign",
    "summary": "Asignar ruta",
    "requestExample": {
      "vehicleId": "v_1",
      "stops": []
    },
    "response": {
      "dispatchId": "d_001",
      "driver": "Juan"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/alert",
    "summary": "Alerta evento",
    "requestExample": {
      "vehicleId": "v_1",
      "event": "harsh_braking"
    },
    "response": {
      "eventId": "e_001",
      "severity": "high"
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
          "title": "Bienvenido a flotatrack",
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
