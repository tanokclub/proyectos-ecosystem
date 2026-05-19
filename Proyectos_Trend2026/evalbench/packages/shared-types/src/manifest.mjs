export const project = {
  "title": "EvalBench",
  "slug": "evalbench",
  "codename": "evalbench",
  "summary": "Plataforma para evaluar y comparar modelos LLM con datasets y métricas custom.",
  "category": "AI/GenAI",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostgreSQL",
    "ClickHouse",
    "Polars"
  ],
  "modules": [
    "datasets",
    "runs",
    "métricas",
    "comparador",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4205
  },
  "web": {
    "entry": "apps/web",
    "port": 3205
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/datasets",
    "summary": "Datasets",
    "response": {
      "datasets": [
        {
          "id": "d_1",
          "name": "TruthfulQA",
          "examples": 817
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/runs",
    "summary": "Runs",
    "response": {
      "runs": [
        {
          "id": "run_1",
          "model": "claude-opus-4-7",
          "score": 0.84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/runs",
    "summary": "Lanzar run",
    "requestExample": {
      "datasetId": "d_1",
      "model": "claude-opus-4-7"
    },
    "response": {
      "id": "run_new",
      "status": "running"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/compare",
    "summary": "Comparar",
    "requestExample": {
      "runIds": [
        "run_1",
        "run_2"
      ]
    },
    "response": {
      "winner": "run_1",
      "deltaPct": 3.7
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
          "title": "Bienvenido a evalbench",
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
