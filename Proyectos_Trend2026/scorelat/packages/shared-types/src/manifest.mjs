export const project = {
  "title": "ScoreLAT",
  "slug": "scorelat",
  "codename": "scorelat",
  "summary": "Scoring crediticio AI con datos alternativos: telco, utilities, e-commerce.",
  "category": "FinTech LATAM",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "XGBoost",
    "Spark"
  ],
  "modules": [
    "ingesta",
    "features",
    "modelos",
    "API scoring",
    "explicabilidad"
  ],
  "server": {
    "entry": "services/api",
    "port": 4215
  },
  "web": {
    "entry": "apps/web",
    "port": 3215
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/models",
    "summary": "Modelos",
    "response": {
      "models": [
        {
          "id": "mdl_1",
          "name": "credit_v3",
          "auc": 0.84
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/features",
    "summary": "Features",
    "response": {
      "features": [
        "telco_avg",
        "utilities_late_pct"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/score",
    "summary": "Score",
    "requestExample": {
      "docId": "12345",
      "country": "CO"
    },
    "response": {
      "score": 712,
      "riskBand": "medium"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/explain",
    "summary": "Explicar",
    "requestExample": {
      "scoreId": "s_001"
    },
    "response": {
      "shapValues": {
        "telco_avg": 0.31
      }
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
          "title": "Bienvenido a scorelat",
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
