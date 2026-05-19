export const project = {
  "title": "PodcastLAT",
  "slug": "podcastlat",
  "codename": "podcastlat",
  "summary": "Red de podcasts LATAM: hosting, monetización, analytics, transcripción AI.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Whisper",
    "CDN"
  ],
  "modules": [
    "shows",
    "episodios",
    "distribución",
    "monetización",
    "transcripción"
  ],
  "server": {
    "entry": "services/api",
    "port": 4281
  },
  "web": {
    "entry": "apps/web",
    "port": 3281
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/shows",
    "summary": "Shows",
    "response": {
      "shows": [
        {
          "id": "sh_1",
          "title": "Tech LATAM",
          "episodes": 84,
          "listenersMonthly": 184200
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/episodes",
    "summary": "Episodios",
    "response": {
      "episodes": [
        {
          "id": "ep_1",
          "showId": "sh_1",
          "title": "IA en Chile",
          "durationMin": 42
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/episodes",
    "summary": "Subir ep",
    "requestExample": {
      "showId": "sh_1",
      "title": "...",
      "audioUrl": "..."
    },
    "response": {
      "id": "ep_new",
      "status": "processing",
      "transcriptUrl": null
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/ads/insert",
    "summary": "Insertar ad",
    "requestExample": {
      "episodeId": "ep_1",
      "adId": "ad_1"
    },
    "response": {
      "adInserted": true,
      "position": "mid_roll",
      "cpm": 24
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
          "title": "Bienvenido a podcastlat",
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
