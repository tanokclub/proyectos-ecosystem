export const project = {
  "title": "SeguridadCom",
  "slug": "seguridadcom",
  "codename": "seguridadcom",
  "summary": "Vigilancia comunitaria: cámaras, IA detección, botón pánico, alertas vecinos.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "CV",
    "WebRTC"
  ],
  "modules": [
    "cámaras",
    "alertas",
    "botón pánico",
    "vecinos",
    "autoridades"
  ],
  "server": {
    "entry": "services/api",
    "port": 4274
  },
  "web": {
    "entry": "apps/web",
    "port": 3274
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/cameras",
    "summary": "Cámaras",
    "response": {
      "cameras": [
        {
          "id": "cm_1",
          "location": "Esquina 7-25",
          "status": "online",
          "detections24h": 14
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/alerts",
    "summary": "Alertas",
    "response": {
      "alerts": [
        {
          "id": "al_1",
          "type": "gathering_unusual",
          "cameraId": "cm_1",
          "confidence": 0.78
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/panic",
    "summary": "Botón pánico",
    "requestExample": {
      "lat": 4.65,
      "lng": -74.05
    },
    "response": {
      "alertId": "pa_001",
      "dispatchedTo": [
        "vecinos_500m",
        "policia"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/cameras/share",
    "summary": "Compartir vivo",
    "requestExample": {
      "cameraId": "cm_1",
      "authority": "policia"
    },
    "response": {
      "streamUrl": "webrtc://...",
      "expiresIn": 3600
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
          "title": "Bienvenido a seguridadcom",
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
