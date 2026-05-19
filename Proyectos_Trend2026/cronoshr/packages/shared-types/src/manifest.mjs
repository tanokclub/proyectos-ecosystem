export const project = {
  "title": "CronosHR",
  "slug": "cronoshr",
  "codename": "cronoshr",
  "summary": "EHR open source LATAM: historial clínico unificado HL7/FHIR.",
  "category": "HealthTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "HAPI FHIR",
    "OAuth2"
  ],
  "modules": [
    "pacientes",
    "encounters",
    "condiciones",
    "medicación",
    "observaciones"
  ],
  "server": {
    "entry": "services/api",
    "port": 4221
  },
  "web": {
    "entry": "apps/web",
    "port": 3221
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/patients",
    "summary": "Pacientes",
    "response": {
      "patients": [
        {
          "id": "p_1",
          "name": "Ana M.",
          "dob": "1985-04-12"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/encounters",
    "summary": "Encuentros",
    "response": {
      "encounters": [
        {
          "id": "e_1",
          "date": "2026-04-10",
          "reason": "Control"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/observations",
    "summary": "Observación",
    "requestExample": {
      "patientId": "p_1",
      "loinc": "8302-2",
      "value": 168
    },
    "response": {
      "id": "obs_001",
      "status": "final"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/conditions",
    "summary": "Condición",
    "requestExample": {
      "patientId": "p_1",
      "icd10": "I10"
    },
    "response": {
      "id": "cond_001",
      "verificationStatus": "confirmed"
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
          "title": "Bienvenido a cronoshr",
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
