export const project = {
  "title": "EdificioIQ",
  "slug": "edificioiq",
  "codename": "edificioiq",
  "summary": "Building automation: HVAC, energía, ocupación, accesos, ESG en edificios.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "BACnet",
    "TimescaleDB"
  ],
  "modules": [
    "HVAC",
    "energía",
    "ocupación",
    "accesos",
    "reportes ESG"
  ],
  "server": {
    "entry": "services/api",
    "port": 4279
  },
  "web": {
    "entry": "apps/web",
    "port": 3279
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/buildings",
    "summary": "Edificios",
    "response": {
      "buildings": [
        {
          "id": "bd_1",
          "name": "Torre Norte",
          "m2": 18400,
          "occupancyPct": 0.72
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/energy",
    "summary": "Energía",
    "response": {
      "kwhToday": 8420,
      "kwhMonth": 184200,
      "costUSD": 18420
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/hvac",
    "summary": "Setear HVAC",
    "requestExample": {
      "buildingId": "bd_1",
      "zone": "P3-Oeste",
      "setpointC": 22
    },
    "response": {
      "confirmed": true,
      "zone": "P3-Oeste",
      "setpointC": 22
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/access",
    "summary": "Grant acceso",
    "requestExample": {
      "buildingId": "bd_1",
      "personId": "p_1",
      "floors": [
        3,
        4
      ]
    },
    "response": {
      "accessId": "ac_001",
      "validUntil": "2026-05-26T18:00"
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
          "title": "Bienvenido a edificioiq",
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
