export const project = {
  "title": "AireSensor",
  "slug": "airesensor",
  "codename": "airesensor",
  "summary": "Red IoT de sensores de calidad de aire en ciudades LATAM con alertas.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "TimescaleDB",
    "MQTT",
    "Mapbox"
  ],
  "modules": [
    "sensores",
    "mapas",
    "alertas",
    "predicción",
    "API pública"
  ],
  "server": {
    "entry": "services/api",
    "port": 4232
  },
  "web": {
    "entry": "apps/web",
    "port": 3232
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/sensors",
    "summary": "Sensores",
    "response": {
      "sensors": [
        {
          "id": "ss_1",
          "city": "Bogotá",
          "pm25": 28,
          "aqi": 84
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/cities",
    "summary": "Ciudades",
    "response": {
      "cities": [
        {
          "name": "Bogotá",
          "avgAqi": 82
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/alerts",
    "summary": "Suscribir",
    "requestExample": {
      "city": "Bogotá",
      "threshold": 100
    },
    "response": {
      "subscriptionId": "sub_001"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/readings",
    "summary": "Push lectura",
    "requestExample": {
      "sensorId": "ss_1",
      "pm25": 32
    },
    "response": {
      "stored": true
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
          "title": "Bienvenido a airesensor",
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
