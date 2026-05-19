export const project = {
  "title": "TelemedLAT",
  "slug": "telemedlat",
  "codename": "telemedlat",
  "summary": "Telemedicina LATAM: consultas video, recetas digitales, integración EPS.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Twilio Video",
    "Redis"
  ],
  "modules": [
    "agenda",
    "videoconsulta",
    "recetas",
    "historial",
    "pagos"
  ],
  "server": {
    "entry": "services/api",
    "port": 4220
  },
  "web": {
    "entry": "apps/web",
    "port": 3220
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/appointments",
    "summary": "Citas",
    "response": {
      "items": [
        {
          "id": "ap_1",
          "doctor": "Dr. Pérez",
          "date": "2026-05-22T10:00"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/doctors",
    "summary": "Médicos",
    "response": {
      "doctors": [
        {
          "id": "d_1",
          "name": "Dr. Pérez",
          "specialty": "Cardio",
          "rating": 4.8
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/book",
    "summary": "Agendar",
    "requestExample": {
      "doctorId": "d_1",
      "slot": "..."
    },
    "response": {
      "appointmentId": "ap_new",
      "status": "confirmed"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/prescriptions",
    "summary": "Receta",
    "requestExample": {
      "appointmentId": "ap_1",
      "meds": []
    },
    "response": {
      "prescriptionId": "rx_001"
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
          "title": "Bienvenido a telemedlat",
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
