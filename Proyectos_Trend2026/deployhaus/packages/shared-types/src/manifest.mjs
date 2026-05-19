export const project = {
  "title": "DeployHaus",
  "slug": "deployhaus",
  "codename": "deployhaus",
  "summary": "PaaS bare-metal LATAM: deploy Git-based, autoscaling, secretos, dominios.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "NestJS",
    "Docker",
    "Nomad",
    "PostgreSQL"
  ],
  "modules": [
    "apps",
    "builds",
    "autoscaling",
    "secretos",
    "dominios"
  ],
  "server": {
    "entry": "services/api",
    "port": 4252
  },
  "web": {
    "entry": "apps/web",
    "port": 3252
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/apps",
    "summary": "Apps",
    "response": {
      "apps": [
        {
          "id": "a_1",
          "name": "frontend",
          "region": "sao-1",
          "status": "running",
          "instances": 3
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/builds",
    "summary": "Builds",
    "response": {
      "builds": [
        {
          "id": "b_1",
          "appId": "a_1",
          "commit": "7f3a...",
          "status": "success",
          "durationSec": 84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/deploy",
    "summary": "Deploy",
    "requestExample": {
      "appId": "a_1",
      "branch": "main"
    },
    "response": {
      "buildId": "b_new",
      "status": "building"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/scale",
    "summary": "Escalar",
    "requestExample": {
      "appId": "a_1",
      "instances": 5
    },
    "response": {
      "newInstances": 5,
      "status": "scaling"
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
          "title": "Bienvenido a deployhaus",
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
