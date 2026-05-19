export const project = {
  "title": "SaludRural",
  "slug": "saludrural",
  "codename": "saludrural",
  "summary": "IoT salud rural: telemetría, telediagnóstico, brigadas, conectividad satelital.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Starlink",
    "Twilio"
  ],
  "modules": [
    "puestos rurales",
    "telediagnóstico",
    "inventario meds",
    "brigadas",
    "epidemiología"
  ],
  "server": {
    "entry": "services/api",
    "port": 4278
  },
  "web": {
    "entry": "apps/web",
    "port": 3278
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/posts",
    "summary": "Puestos rurales",
    "response": {
      "posts": [
        {
          "id": "po_1",
          "name": "Cabuyaro",
          "population": 4200,
          "connectivity": "starlink"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/meds/inventory",
    "summary": "Inventario meds",
    "response": {
      "items": [
        {
          "med": "paracetamol",
          "stock": 120,
          "postId": "po_1"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/consult",
    "summary": "Telediagnóstico",
    "requestExample": {
      "postId": "po_1",
      "symptoms": [
        "fiebre",
        "tos"
      ]
    },
    "response": {
      "consultId": "c_001",
      "diagnosis": "IRA leve",
      "protocol": "pid_resp"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/brigade/schedule",
    "summary": "Programar brigada",
    "requestExample": {
      "postId": "po_1",
      "focus": "vacunación"
    },
    "response": {
      "brigadeId": "bg_001",
      "date": "2026-05-25"
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
          "title": "Bienvenido a saludrural",
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
