export const project = {
  "title": "TriajeAI",
  "slug": "triajeai",
  "codename": "triajeai",
  "summary": "Triage AI para urgencias y atención primaria con clasificación Manchester.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Anthropic"
  ],
  "modules": [
    "triage",
    "protocolos",
    "derivación",
    "audit",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4222
  },
  "web": {
    "entry": "apps/web",
    "port": 3222
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/protocols",
    "summary": "Protocolos",
    "response": {
      "protocols": [
        "manchester",
        "esi",
        "canadian-cts"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/sessions/recent",
    "summary": "Sesiones",
    "response": {
      "sessions": [
        {
          "id": "tr_1",
          "level": "amarillo"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/triage",
    "summary": "Triage",
    "requestExample": {
      "symptoms": [
        "fiebre"
      ],
      "age": 34
    },
    "response": {
      "level": "verde",
      "confidence": 0.84
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/refer",
    "summary": "Derivar",
    "requestExample": {
      "triageId": "tr_1",
      "specialty": "cardio"
    },
    "response": {
      "referralId": "ref_001",
      "urgent": true
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
          "title": "Bienvenido a triajeai",
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
