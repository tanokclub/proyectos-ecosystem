export const project = {
  "title": "APIMesh",
  "slug": "apimesh",
  "codename": "apimesh",
  "summary": "API gateway open source: routing, auth, rate limit, transformaciones, observabilidad.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "Envoy",
    "Lua",
    "Redis",
    "PostgreSQL"
  ],
  "modules": [
    "routes",
    "auth",
    "rate limit",
    "transforms",
    "plugins"
  ],
  "server": {
    "entry": "services/api",
    "port": 4254
  },
  "web": {
    "entry": "apps/web",
    "port": 3254
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/routes",
    "summary": "Rutas",
    "response": {
      "routes": [
        {
          "id": "rt_1",
          "path": "/v1/orders/*",
          "upstream": "orders-svc",
          "rateLimit": 100
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/plugins",
    "summary": "Plugins",
    "response": {
      "plugins": [
        "oauth2",
        "rate-limit",
        "cors",
        "logging",
        "transform"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/routes",
    "summary": "Crear ruta",
    "requestExample": {
      "path": "/v1/products/*",
      "upstream": "products-svc"
    },
    "response": {
      "id": "rt_new",
      "status": "active"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/plugins/install",
    "summary": "Instalar plugin",
    "requestExample": {
      "name": "jwt"
    },
    "response": {
      "pluginId": "pl_new",
      "status": "installed"
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
          "title": "Bienvenido a apimesh",
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
