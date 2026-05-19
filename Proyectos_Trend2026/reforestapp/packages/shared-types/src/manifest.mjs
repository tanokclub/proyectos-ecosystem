export const project = {
  "title": "ReforestaApp",
  "slug": "reforestapp",
  "codename": "reforestapp",
  "summary": "Tracker satelital de proyectos de reforestación con verificación geoespacial.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "FastAPI",
    "PostGIS",
    "Sentinel-2",
    "Anthropic"
  ],
  "modules": [
    "proyectos",
    "parcelas",
    "monitoreo NDVI",
    "verificación",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4234
  },
  "web": {
    "entry": "apps/web",
    "port": 3234
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/projects",
    "summary": "Proyectos",
    "response": {
      "projects": [
        {
          "id": "rp_1",
          "name": "Manglares",
          "hectares": 1240
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/ndvi",
    "summary": "NDVI",
    "response": {
      "series": [
        {
          "date": "2026-01",
          "avgNdvi": 0.42
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/parcels",
    "summary": "Parcela",
    "requestExample": {
      "projectId": "rp_1",
      "geojson": {}
    },
    "response": {
      "parcelId": "pc_001",
      "areaHa": 12.4
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/verify",
    "summary": "Verificar satélite",
    "requestExample": {
      "parcelId": "pc_001"
    },
    "response": {
      "jobId": "v_001",
      "status": "queued"
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
          "title": "Bienvenido a reforestapp",
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
