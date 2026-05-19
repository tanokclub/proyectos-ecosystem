export const project = {
  "title": "VoiceClone Pro",
  "slug": "voiceclone-pro",
  "codename": "voiceclone-pro",
  "summary": "Estudio para clonar voces, generar narraciones y voiceovers multilingües.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "ElevenLabs",
    "S3",
    "PostgreSQL"
  ],
  "modules": [
    "voces",
    "proyectos",
    "síntesis TTS",
    "studio",
    "API"
  ],
  "server": {
    "entry": "services/api",
    "port": 4202
  },
  "web": {
    "entry": "apps/web",
    "port": 3202
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/voices",
    "summary": "Voces clonadas",
    "response": {
      "voices": [
        {
          "id": "v_1",
          "name": "María",
          "lang": "es-MX"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/projects",
    "summary": "Proyectos narración",
    "response": {
      "projects": [
        {
          "id": "p_1",
          "name": "Audiolibro c1",
          "durationSec": 1840
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/synthesize",
    "summary": "Sintetizar voz",
    "requestExample": {
      "voiceId": "v_1",
      "text": "Hola"
    },
    "response": {
      "audioUrl": "/mock/audio.mp3",
      "durationSec": 1.2
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/voices",
    "summary": "Crear voz",
    "requestExample": {
      "name": "Carla",
      "samples": [
        "s1.wav"
      ]
    },
    "response": {
      "id": "v_new",
      "status": "training"
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
          "title": "Bienvenido a voiceclone-pro",
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
