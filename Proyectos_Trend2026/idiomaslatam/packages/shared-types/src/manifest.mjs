export const project = {
  "title": "IdiomasLATAM",
  "slug": "idiomaslatam",
  "codename": "idiomaslatam",
  "summary": "Aprende idiomas nativos LATAM (quechua, guaraní, náhuatl, aymara, mapudungun).",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "Whisper",
    "TTS"
  ],
  "modules": [
    "lecciones",
    "audio nativo",
    "speaking",
    "cultura",
    "comunidad"
  ],
  "server": {
    "entry": "services/api",
    "port": 4245
  },
  "web": {
    "entry": "apps/web",
    "port": 3245
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/languages",
    "summary": "Idiomas",
    "response": {
      "languages": [
        "qu",
        "gn",
        "nah",
        "ay",
        "arn"
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/lessons",
    "summary": "Lecciones",
    "response": {
      "lessons": [
        {
          "id": "l_1",
          "lang": "qu",
          "title": "Saludos",
          "durationMin": 12
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/speak",
    "summary": "Evaluar pronunciación",
    "requestExample": {
      "lang": "qu",
      "audioUrl": "..."
    },
    "response": {
      "score": 0.82,
      "feedback": "enfatiza la \"ll\""
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/progress",
    "summary": "Logear",
    "requestExample": {
      "lessonId": "l_1",
      "completed": true
    },
    "response": {
      "xp": 24,
      "levelUp": false
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
          "title": "Bienvenido a idiomaslatam",
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
