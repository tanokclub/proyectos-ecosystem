export const project = {
  "title": "MCPGate",
  "slug": "mcpgate",
  "codename": "mcpgate",
  "summary": "Gestor de servidores MCP: descubrir, instalar, monitorizar y autorizar.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Docker"
  ],
  "modules": [
    "catálogo",
    "instalación",
    "autenticación",
    "logs",
    "permisos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4206
  },
  "web": {
    "entry": "apps/web",
    "port": 3206
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/servers",
    "summary": "Servidores instalados",
    "response": {
      "servers": [
        {
          "id": "s_1",
          "name": "github",
          "status": "running"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/catalog",
    "summary": "Catálogo",
    "response": {
      "items": [
        {
          "name": "notion",
          "stars": 124
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/servers",
    "summary": "Instalar",
    "requestExample": {
      "name": "notion"
    },
    "response": {
      "id": "s_new",
      "status": "installing"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/authorize",
    "summary": "Autorizar OAuth",
    "requestExample": {
      "id": "s_2"
    },
    "response": {
      "authorizeUrl": "https://..."
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
          "title": "Bienvenido a mcpgate",
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
