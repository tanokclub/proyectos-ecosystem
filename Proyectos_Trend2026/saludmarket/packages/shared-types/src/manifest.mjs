export const project = {
  "title": "SaludMarket",
  "slug": "saludmarket",
  "codename": "saludmarket",
  "summary": "Marketplace de servicios de salud: estudios, vacunas, terapias a domicilio.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Stripe"
  ],
  "modules": [
    "catálogo",
    "agenda",
    "pagos",
    "proveedores",
    "reviews"
  ],
  "server": {
    "entry": "services/api",
    "port": 4229
  },
  "web": {
    "entry": "apps/web",
    "port": 3229
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/services",
    "summary": "Servicios",
    "response": {
      "services": [
        {
          "id": "s_1",
          "name": "Perfil lipídico",
          "priceCOP": 65000
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/providers",
    "summary": "Proveedores",
    "response": {
      "providers": [
        {
          "id": "p_1",
          "name": "Cruz Verde",
          "rating": 4.7
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/book",
    "summary": "Reservar",
    "requestExample": {
      "serviceId": "s_1",
      "date": "2026-05-25"
    },
    "response": {
      "bookingId": "bk_001",
      "status": "confirmed"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/review",
    "summary": "Review",
    "requestExample": {
      "bookingId": "bk_001",
      "rating": 5
    },
    "response": {
      "reviewId": "rv_001"
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
          "title": "Bienvenido a saludmarket",
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
