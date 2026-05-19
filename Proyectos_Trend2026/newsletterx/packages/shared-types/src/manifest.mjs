export const project = {
  "title": "NewsletterX",
  "slug": "newsletterx",
  "codename": "newsletterx",
  "summary": "Newsletter SaaS: editor, monetización, segmentación, A/B, analytics avanzados.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "SendGrid",
    "ClickHouse"
  ],
  "modules": [
    "editor",
    "envíos",
    "segmentación",
    "A/B",
    "monetización"
  ],
  "server": {
    "entry": "services/api",
    "port": 4282
  },
  "web": {
    "entry": "apps/web",
    "port": 3282
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/newsletters",
    "summary": "Newsletters",
    "response": {
      "newsletters": [
        {
          "id": "nl_1",
          "title": "AI Latam",
          "subscribers": 4200,
          "openRate": 0.42
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/issues",
    "summary": "Ediciones",
    "response": {
      "issues": [
        {
          "id": "is_1",
          "subject": "Edición #42",
          "sentAt": "2026-05-18T10:00"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/send",
    "summary": "Enviar",
    "requestExample": {
      "newsletterId": "nl_1",
      "subject": "...",
      "html": "..."
    },
    "response": {
      "jobId": "sn_001",
      "targetCount": 4200,
      "etaSec": 30
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/segments",
    "summary": "Crear segmento",
    "requestExample": {
      "name": "engaged_30d",
      "filter": {
        "lastOpenedDays": {
          "lte": 30
        }
      }
    },
    "response": {
      "segmentId": "sg_001",
      "estimatedSize": 1240
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
          "title": "Bienvenido a newsletterx",
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
