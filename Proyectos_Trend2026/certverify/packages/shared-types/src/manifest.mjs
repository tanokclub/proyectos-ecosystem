export const project = {
  "title": "CertVerify",
  "slug": "certverify",
  "codename": "certverify",
  "summary": "Verificación blockchain de títulos académicos y certificaciones profesionales.",
  "category": "EdTech",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Ethers",
    "IPFS"
  ],
  "modules": [
    "emisión",
    "verificación",
    "wallet credenciales",
    "integraciones",
    "audit"
  ],
  "server": {
    "entry": "services/api",
    "port": 4247
  },
  "web": {
    "entry": "apps/web",
    "port": 3247
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/credentials",
    "summary": "Credenciales",
    "response": {
      "credentials": [
        {
          "id": "cr_1",
          "title": "BS CS",
          "issuer": "Universidad X",
          "issuedAt": "2025-12-15"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/issuers",
    "summary": "Emisores",
    "response": {
      "issuers": [
        {
          "id": "is_1",
          "name": "Universidad X",
          "verified": true
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/verify",
    "summary": "Verificar",
    "requestExample": {
      "credentialHash": "0xabc..."
    },
    "response": {
      "valid": true,
      "issuer": "Universidad X",
      "issuedAt": "2025-12-15"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/issue",
    "summary": "Emitir",
    "requestExample": {
      "recipient": "0xa...",
      "credentialData": {}
    },
    "response": {
      "credentialId": "cr_new",
      "txHash": "0xtx..."
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
          "title": "Bienvenido a certverify",
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
