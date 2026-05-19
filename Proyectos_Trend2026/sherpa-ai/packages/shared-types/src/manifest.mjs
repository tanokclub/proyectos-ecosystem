export const project = {
  "title": "Sherpa AI",
  "slug": "sherpa-ai",
  "codename": "sherpa-ai",
  "summary": "Agente de soporte multicanal (web, WhatsApp, email) con tools y handoff humano.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Anthropic"
  ],
  "modules": [
    "tickets",
    "agente con tools",
    "handoff",
    "KB",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4201
  },
  "web": {
    "entry": "apps/web",
    "port": 3201
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/conversations",
    "summary": "Conversaciones activas",
    "response": {
      "items": [
        {
          "id": "c_1",
          "user": "ana@x.com",
          "channel": "web",
          "status": "bot"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/tools",
    "summary": "Tools disponibles",
    "response": {
      "tools": [
        "lookupOrder",
        "createTicket",
        "refund",
        "kbSearch"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/conversations/reply",
    "summary": "Responder",
    "requestExample": {
      "conversationId": "c_1",
      "text": "hola"
    },
    "response": {
      "messageId": "m_001",
      "toolsCalled": [
        "kbSearch"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/handoff",
    "summary": "Pasar a humano",
    "requestExample": {
      "conversationId": "c_1"
    },
    "response": {
      "status": "queued_agent",
      "etaSeconds": 45
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
          "title": "Bienvenido a sherpa-ai",
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
