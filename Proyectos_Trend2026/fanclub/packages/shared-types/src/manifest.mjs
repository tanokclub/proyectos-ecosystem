export const project = {
  "title": "FanClub",
  "slug": "fanclub",
  "codename": "fanclub",
  "summary": "Suscripciones fan: tiers, contenido exclusivo, comunidad, eventos virtuales.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Stripe",
    "WebRTC"
  ],
  "modules": [
    "tiers",
    "contenido",
    "comunidad",
    "eventos",
    "mensajería"
  ],
  "server": {
    "entry": "services/api",
    "port": 4285
  },
  "web": {
    "entry": "apps/web",
    "port": 3285
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/creators",
    "summary": "Creators",
    "response": {
      "creators": [
        {
          "handle": "@band",
          "fans": 8400,
          "tiers": [
            {
              "name": "bronze",
              "priceUSD": 5
            },
            {
              "name": "gold",
              "priceUSD": 20
            }
          ]
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/events",
    "summary": "Eventos",
    "response": {
      "events": [
        {
          "id": "ev_1",
          "title": "Sesión Q&A",
          "date": "2026-05-26T19:00",
          "tier": "gold"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/join",
    "summary": "Unirse al evento",
    "requestExample": {
      "eventId": "ev_1"
    },
    "response": {
      "rtcToken": "tk_001",
      "validUntilSec": 3600
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/messages",
    "summary": "Mensaje DM",
    "requestExample": {
      "creatorHandle": "@band",
      "text": "hola"
    },
    "response": {
      "messageId": "m_001",
      "delivered": true
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
          "title": "Bienvenido a fanclub",
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
