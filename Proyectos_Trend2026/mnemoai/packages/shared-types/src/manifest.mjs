export const project = {
  "title": "MnemoAI",
  "slug": "mnemoai",
  "codename": "mnemoai",
  "summary": "Banco de memoria persistente para agentes: hechos, decisiones, embeddings.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "pgvector",
    "PostgreSQL",
    "Redis"
  ],
  "modules": [
    "hechos",
    "episodios",
    "recuperación",
    "olvido",
    "sync agentes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4209
  },
  "web": {
    "entry": "apps/web",
    "port": 3209
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/memories",
    "summary": "Memorias",
    "response": {
      "items": [
        {
          "id": "mem_1",
          "type": "fact",
          "content": "prefer terse",
          "confidence": 0.95
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/agents",
    "summary": "Agentes",
    "response": {
      "agents": [
        {
          "id": "ag_1",
          "name": "Coding Buddy",
          "memCount": 1240
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/memories",
    "summary": "Guardar",
    "requestExample": {
      "agentId": "ag_1",
      "type": "fact",
      "content": "..."
    },
    "response": {
      "id": "mem_new",
      "stored": true
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/recall",
    "summary": "Recuperar",
    "requestExample": {
      "query": "preferencias"
    },
    "response": {
      "matches": [
        {
          "memId": "mem_1",
          "score": 0.93
        }
      ]
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
          "title": "Bienvenido a mnemoai",
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
