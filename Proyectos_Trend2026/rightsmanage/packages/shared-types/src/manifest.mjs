export const project = {
  "title": "RightsManage",
  "slug": "rightsmanage",
  "codename": "rightsmanage",
  "summary": "Gestión IP y derechos: catálogo, licenciamientos, takedowns, sync rights.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Elastic",
    "CMS"
  ],
  "modules": [
    "catálogo IP",
    "licencias",
    "takedowns",
    "sync rights",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4289
  },
  "web": {
    "entry": "apps/web",
    "port": 3289
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/catalog",
    "summary": "Catálogo IP",
    "response": {
      "items": [
        {
          "id": "ip_1",
          "title": "Canción Verano",
          "type": "audio",
          "territories": [
            "LATAM",
            "US"
          ]
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/licenses",
    "summary": "Licencias",
    "response": {
      "licenses": [
        {
          "id": "lc_1",
          "ipId": "ip_1",
          "licensee": "Brand X",
          "rightsUSD": 4200
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/licenses",
    "summary": "Emitir licencia",
    "requestExample": {
      "ipId": "ip_1",
      "licensee": "Brand Y",
      "termMonths": 12
    },
    "response": {
      "id": "lc_new",
      "contractUrl": "...",
      "signedAt": "2026-05-19T15:14:47.107Z"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/takedown",
    "summary": "Solicitar takedown",
    "requestExample": {
      "ipId": "ip_1",
      "infringingUrl": "https://..."
    },
    "response": {
      "takedownId": "td_001",
      "status": "submitted"
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
          "title": "Bienvenido a rightsmanage",
          "read": false,
          "at": "2026-05-19T15:14:47.110Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.110Z"
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
