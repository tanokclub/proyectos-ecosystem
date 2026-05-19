export const project = {
  "title": "Multimind",
  "slug": "multimind",
  "codename": "multimind",
  "summary": "Chatbot multimodal: texto, voz, imagen y video como entradas y salidas.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Whisper",
    "SD3"
  ],
  "modules": [
    "chat",
    "visión",
    "audio",
    "video",
    "historial"
  ],
  "server": {
    "entry": "services/api",
    "port": 4203
  },
  "web": {
    "entry": "apps/web",
    "port": 3203
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/threads",
    "summary": "Conversaciones multimodales",
    "response": {
      "threads": [
        {
          "id": "t_1",
          "title": "Logo",
          "modalities": [
            "text",
            "image"
          ]
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/models",
    "summary": "Modelos por modalidad",
    "response": {
      "text": [
        "claude-opus-4-7"
      ],
      "image": [
        "sd-3"
      ],
      "audio": [
        "whisper-3"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/chat",
    "summary": "Mensaje multimodal",
    "requestExample": {
      "threadId": "t_1",
      "text": "..."
    },
    "response": {
      "messageId": "m_x",
      "tokens": 480
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/generate/image",
    "summary": "Generar imagen",
    "requestExample": {
      "prompt": "sunset"
    },
    "response": {
      "imageUrl": "/mock/img.png",
      "latencyMs": 2400
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
          "title": "Bienvenido a multimind",
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
