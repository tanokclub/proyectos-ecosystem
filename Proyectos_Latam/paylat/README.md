# PayLat

Neobanco LATAM con cuentas digitales, transferencias, QR y tarjetas virtuales.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- onboarding
- cuentas
- transferencias
- pagos QR
- tarjetas

## Stack objetivo

- NestJS
- Next.js 14
- Expo
- PostgreSQL
- Redis
- Kafka

## Estructura creada

- `services/api-gateway`: servicio base ejecutable.
- `packages/shared-types`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/mobile`: App mobile para onboarding, balance, pagos QR y movimientos.
- `apps/web`: Portal web para clientes y soporte.
- `apps/admin`: Panel administrativo y de riesgo.
- `services/auth-service`: Servicio de autenticacion y 2FA.
- `services/account-service`: Ledger y cuentas multi-moneda.
- `services/payment-service`: Orquestacion de pagos, P2P y cash-in/cash-out.
- `services/notification-service`: Notificaciones transaccionales y alertas de fraude.
- `packages/shared-utils`: Utilidades compartidas de validacion y formato monetario.
- `packages/api-client`: SDK cliente generado desde OpenAPI.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Separar gateway, auth y ledger en servicios NestJS reales.
- Disenar esquema de cuentas, wallets y movimientos contables.
- Integrar KYC simulado y reglas de fraude sobre eventos.
- Crear panel admin con monitoreo de transacciones y disputas.
