export const project = {
  "title": "CursosLive",
  "slug": "cursoslive",
  "codename": "cursoslive",
  "summary": "Streaming educativo bidireccional: clases live, Q&A en vivo, certificación.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "WebRTC",
    "Redis"
  ],
  "modules": [
    "clases live",
    "salas",
    "Q&A",
    "certificación",
    "pagos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4242
  },
  "web": {
    "entry": "apps/web",
    "port": 3242
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/lives",
    "summary": "Lives programados",
    "response": {
      "lives": [
        {
          "id": "l_1",
          "title": "JS avanzado",
          "instructor": "Ana",
          "startAt": "2026-05-22T18:00"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/rooms",
    "summary": "Salas activas",
    "response": {
      "rooms": [
        {
          "id": "r_1",
          "participants": 84,
          "maxCapacity": 100
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/lives/join",
    "summary": "Unirse",
    "requestExample": {
      "liveId": "l_1"
    },
    "response": {
      "rtcToken": "tok_001",
      "expiresIn": 7200
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/qa/ask",
    "summary": "Preguntar Q&A",
    "requestExample": {
      "liveId": "l_1",
      "text": "¿closures?"
    },
    "response": {
      "questionId": "q_001",
      "position": 3
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
          "title": "Bienvenido a cursoslive",
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
