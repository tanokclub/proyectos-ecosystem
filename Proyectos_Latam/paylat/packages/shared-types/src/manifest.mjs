export const project = {
  "title": "PayLat",
  "slug": "paylat",
  "codename": "paylat",
  "summary": "Neobanco LATAM con cuentas digitales, transferencias, QR y tarjetas virtuales.",
  "stack": [
    "NestJS",
    "Next.js 14",
    "Expo",
    "PostgreSQL",
    "Redis",
    "Kafka"
  ],
  "modules": [
    "onboarding",
    "cuentas",
    "transferencias",
    "pagos QR",
    "tarjetas"
  ],
  "server": {
    "entry": "services/api-gateway",
    "port": 4102
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/accounts",
    "summary": "Resumen de cuentas y saldos",
    "response": {
      "accounts": [
        {
          "currency": "COP",
          "balance": 1250000,
          "available": 1200000
        },
        {
          "currency": "USD",
          "balance": 320,
          "available": 320
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/transfers/quote",
    "summary": "Cotizacion de transferencia P2P",
    "requestExample": {
      "amount": 45000,
      "currency": "COP",
      "targetAlias": "maria.co"
    },
    "response": {
      "fee": 0,
      "etaSeconds": 15,
      "channel": "instant"
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/payments/qr",
    "summary": "Simular pago con QR",
    "requestExample": {
      "merchantId": "store_123",
      "amount": 38900,
      "currency": "COP"
    },
    "response": {
      "status": "approved",
      "authCode": "QR-2026-1001"
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/transfers/recent",
    "summary": "Transferencias recientes del usuario",
    "response": {
      "transfers": [
        {
          "id": "trf_0001",
          "alias": "maria.co",
          "amount": 45000,
          "currency": "COP",
          "status": "completed",
          "createdAt": "2026-05-18T14:32:00.000Z"
        },
        {
          "id": "trf_0002",
          "alias": "juan.pe",
          "amount": 120000,
          "currency": "COP",
          "status": "completed",
          "createdAt": "2026-05-17T09:12:00.000Z"
        },
        {
          "id": "trf_0003",
          "alias": "lucia.mx",
          "amount": 80,
          "currency": "USD",
          "status": "pending",
          "createdAt": "2026-05-16T22:05:00.000Z"
        },
        {
          "id": "trf_0004",
          "alias": "andres.ar",
          "amount": 25000,
          "currency": "COP",
          "status": "completed",
          "createdAt": "2026-05-15T18:48:00.000Z"
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/cards",
    "summary": "Tarjetas virtuales del usuario",
    "response": {
      "cards": [
        {
          "id": "card_001",
          "last4": "4821",
          "brand": "visa",
          "holder": "PAYLAT USER",
          "status": "active",
          "limitMonthly": 3000000
        },
        {
          "id": "card_002",
          "last4": "9034",
          "brand": "mastercard",
          "holder": "PAYLAT USER",
          "status": "active",
          "limitMonthly": 1500000
        },
        {
          "id": "card_003",
          "last4": "1267",
          "brand": "visa",
          "holder": "PAYLAT USER",
          "status": "frozen",
          "limitMonthly": 500000
        }
      ]
    }
  }
];
