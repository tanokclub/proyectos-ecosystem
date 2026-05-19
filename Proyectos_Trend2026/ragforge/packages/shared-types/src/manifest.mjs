export const project = {
  "title": "RAGForge",
  "slug": "ragforge",
  "codename": "ragforge",
  "summary": "Plataforma de RAG empresarial: ingesta, embeddings, índices, evaluación.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "pgvector",
    "Redis",
    "OpenAI"
  ],
  "modules": [
    "ingesta de documentos",
    "embeddings",
    "búsqueda híbrida",
    "chat con citas",
    "evaluación"
  ],
  "server": {
    "entry": "services/api",
    "port": 4200
  },
  "web": {
    "entry": "apps/web",
    "port": 3200
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/collections",
    "summary": "Colecciones de documentos",
    "response": {
      "items": [
        {
          "id": "col_1",
          "name": "Manuales",
          "docs": 142
        },
        {
          "id": "col_2",
          "name": "Contratos",
          "docs": 86
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/queries/recent",
    "summary": "Queries recientes",
    "response": {
      "items": [
        {
          "id": "q_1",
          "text": "¿cuál es el SLA?",
          "score": 0.92
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/ingest",
    "summary": "Ingesta documento",
    "requestExample": {
      "url": "https://...",
      "collectionId": "col_1"
    },
    "response": {
      "jobId": "ing_001",
      "status": "queued"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/chat",
    "summary": "Chat con citas",
    "requestExample": {
      "query": "¿SLA?",
      "collectionId": "col_1"
    },
    "response": {
      "answer": "El SLA es 4h.",
      "citations": [
        {
          "docId": "d_1"
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
          "title": "Bienvenido a ragforge",
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
