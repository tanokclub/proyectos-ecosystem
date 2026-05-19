export const project = {
  "title": "ReciclaLoop",
  "slug": "recicalop",
  "codename": "recicalop",
  "summary": "Plataforma de economía circular: residuos B2B + marketplace materiales reciclados.",
  "category": "ClimateTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Stripe"
  ],
  "modules": [
    "oferentes",
    "demandantes",
    "logística",
    "trazabilidad",
    "reportes"
  ],
  "server": {
    "entry": "services/api",
    "port": 4236
  },
  "web": {
    "entry": "apps/web",
    "port": 3236
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/listings",
    "summary": "Listados",
    "response": {
      "listings": [
        {
          "id": "l_1",
          "material": "PET",
          "tons": 8.4
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/orders",
    "summary": "Órdenes",
    "response": {
      "orders": [
        {
          "id": "or_1",
          "tons": 4,
          "status": "in_transit"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/listings",
    "summary": "Publicar",
    "requestExample": {
      "material": "cartón",
      "tons": 12
    },
    "response": {
      "id": "l_new",
      "status": "live"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/orders",
    "summary": "Comprar lote",
    "requestExample": {
      "listingId": "l_1",
      "tons": 4
    },
    "response": {
      "orderId": "or_new",
      "total": 1520
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
          "title": "Bienvenido a recicalop",
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
