export const project = {
  "title": "IdentityID",
  "slug": "identityid",
  "codename": "identityid",
  "summary": "Identidad SSI/DID LATAM: credenciales verificables, presentaciones zero-knowledge.",
  "category": "Web3 / Blockchain",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "DID",
    "ZK-SNARK"
  ],
  "modules": [
    "wallet ID",
    "credenciales",
    "presentaciones",
    "verificadores",
    "recovery"
  ],
  "server": {
    "entry": "services/api",
    "port": 4265
  },
  "web": {
    "entry": "apps/web",
    "port": 3265
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/identity",
    "summary": "Identidad",
    "response": {
      "did": "did:lat:0x123",
      "credentialsCount": 8,
      "recoveryEnabled": true
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/credentials",
    "summary": "Credenciales",
    "response": {
      "credentials": [
        {
          "id": "c_1",
          "type": "id_card",
          "issuer": "Gov MX"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/present",
    "summary": "Presentar",
    "requestExample": {
      "credentialIds": [
        "c_1"
      ],
      "audience": "verifier_x"
    },
    "response": {
      "presentationToken": "pt_001",
      "expiresIn": 600
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/verify",
    "summary": "Verificar",
    "requestExample": {
      "presentationToken": "pt_001"
    },
    "response": {
      "valid": true,
      "claims": {
        "age_gte_18": true
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
          "title": "Bienvenido a identityid",
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
