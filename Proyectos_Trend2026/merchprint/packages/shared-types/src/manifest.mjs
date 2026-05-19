export const project = {
  "title": "MerchPrint",
  "slug": "merchprint",
  "codename": "merchprint",
  "summary": "Print-on-demand LATAM: catálogo merchandising, integración tiendas, dropshipping.",
  "category": "Creator Economy",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Stripe",
    "Stripe Connect"
  ],
  "modules": [
    "catálogo",
    "tiendas",
    "pedidos",
    "producción",
    "envíos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4286
  },
  "web": {
    "entry": "apps/web",
    "port": 3286
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/products",
    "summary": "Productos",
    "response": {
      "products": [
        {
          "id": "p_1",
          "type": "remera",
          "sizes": [
            "S",
            "M",
            "L",
            "XL"
          ],
          "baseCost": 4200,
          "currency": "ARS"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/stores",
    "summary": "Tiendas",
    "response": {
      "stores": [
        {
          "id": "s_1",
          "creator": "@band",
          "productsCount": 14,
          "salesMonth": 84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/design",
    "summary": "Subir diseño",
    "requestExample": {
      "productType": "remera",
      "imageUrl": "..."
    },
    "response": {
      "designId": "d_001",
      "mockupUrl": "/mockups/..."
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/order",
    "summary": "Orden",
    "requestExample": {
      "productId": "p_1",
      "size": "M",
      "designId": "d_001"
    },
    "response": {
      "orderId": "or_001",
      "etaDays": 7
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
          "title": "Bienvenido a merchprint",
          "read": false,
          "at": "2026-05-19T15:14:47.109Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.110Z"
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
