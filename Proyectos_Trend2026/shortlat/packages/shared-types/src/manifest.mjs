export const project = {
  "title": "ShortLAT",
  "slug": "shortlat",
  "codename": "shortlat",
  "summary": "Plataforma short video estilo TikTok con monetización LATAM y AI recommend.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "CDN",
    "Redis"
  ],
  "modules": [
    "feed",
    "subida",
    "editor",
    "monetización",
    "creator fund"
  ],
  "server": {
    "entry": "services/api",
    "port": 4283
  },
  "web": {
    "entry": "apps/web",
    "port": 3283
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/feed",
    "summary": "Feed",
    "response": {
      "items": [
        {
          "id": "v_1",
          "creator": "@ana",
          "views": 142000,
          "durationSec": 24,
          "palette": "sunset"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/trending",
    "summary": "Trending",
    "response": {
      "trends": [
        {
          "tag": "#cumbia2026",
          "videos": 8400
        },
        {
          "tag": "#latam",
          "videos": 124000
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/upload",
    "summary": "Subir",
    "requestExample": {
      "title": "...",
      "durationSec": 22
    },
    "response": {
      "videoId": "v_new",
      "status": "processing"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/engage",
    "summary": "Engage",
    "requestExample": {
      "videoId": "v_1",
      "type": "like"
    },
    "response": {
      "engaged": true,
      "totalLikes": 142
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
          "title": "Bienvenido a shortlat",
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
