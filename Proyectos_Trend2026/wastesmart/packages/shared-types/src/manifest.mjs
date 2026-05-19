export const project = {
  "title": "WasteSmart",
  "slug": "wastesmart",
  "codename": "wastesmart",
  "summary": "Recolección residuos optimizada: sensores en contenedores, rutas dinámicas.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "OR-Tools",
    "MQTT"
  ],
  "modules": [
    "contenedores",
    "rutas",
    "fleet",
    "reportes ciudadanos",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4273
  },
  "web": {
    "entry": "apps/web",
    "port": 3273
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/bins",
    "summary": "Contenedores",
    "response": {
      "bins": [
        {
          "id": "bn_1",
          "zone": "A1",
          "fillPct": 0.78,
          "type": "orgánico"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/routes",
    "summary": "Rutas hoy",
    "response": {
      "routes": [
        {
          "truckId": "tr_1",
          "stops": 14,
          "distanceKm": 32
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/routes/recalculate",
    "summary": "Recalcular",
    "requestExample": {
      "zoneId": "A1"
    },
    "response": {
      "routeId": "rt_new",
      "stops": 18
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/reports",
    "summary": "Reporte ciudadano",
    "requestExample": {
      "type": "overflow",
      "lat": 4.65,
      "lng": -74.05
    },
    "response": {
      "id": "rp_001",
      "priority": "med"
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
          "title": "Bienvenido a wastesmart",
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
