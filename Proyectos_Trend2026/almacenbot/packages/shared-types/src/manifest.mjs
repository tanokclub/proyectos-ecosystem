export const project = {
  "title": "AlmacenBot",
  "slug": "almacenbot",
  "codename": "almacenbot",
  "summary": "Robotics warehouse management: AGVs, picking AI, inventario, WMS.",
  "category": "IoT / Smart Cities",
  "stack": [
    "Next.js 14",
    "ROS2",
    "PostgreSQL",
    "Computer Vision",
    "Kafka"
  ],
  "modules": [
    "robots",
    "picking",
    "inventario",
    "WMS",
    "analytics"
  ],
  "server": {
    "entry": "services/api",
    "port": 4276
  },
  "web": {
    "entry": "apps/web",
    "port": 3276
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/robots",
    "summary": "Robots",
    "response": {
      "robots": [
        {
          "id": "rb_1",
          "type": "AGV",
          "battery": 0.84,
          "status": "picking"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/inventory",
    "summary": "Inventario",
    "response": {
      "sku": "SKU-001",
      "stock": 142,
      "locations": [
        "A1-B2",
        "A1-B3"
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/pick",
    "summary": "Pick order",
    "requestExample": {
      "orderId": "or_001",
      "items": [
        {
          "sku": "SKU-001",
          "qty": 2
        }
      ]
    },
    "response": {
      "taskId": "tk_001",
      "etaSec": 180
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/robots/dispatch",
    "summary": "Despachar robot",
    "requestExample": {
      "task": "pick",
      "target": "A1-B2"
    },
    "response": {
      "robotId": "rb_1",
      "taskId": "tk_001"
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
          "title": "Bienvenido a almacenbot",
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
