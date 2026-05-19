# KickLATAM

Plataforma de streaming en vivo para LATAM con chat, monetizacion y VOD.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- streams en vivo
- chat
- suscripciones
- moderacion
- vod

## Stack objetivo

- Next.js 14
- Expo
- NestJS
- PostgreSQL
- Redis
- MongoDB
- FFmpeg

## Estructura creada

- `services/gateway`: servicio base ejecutable.
- `packages/shared-types`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/web`: Frontend web para home, discover, player y dashboard streamer.
- `apps/mobile`: App mobile para consumo de stream y chat.
- `apps/admin`: Panel admin y de moderacion.
- `services/auth`: Auth, JWT, OAuth2 y 2FA.
- `services/users`: Perfiles, follows y subscripciones.
- `services/streams`: Ingesta RTMP, estados de stream y publishing.
- `services/chat`: Chat en tiempo real y comandos.
- `services/payments`: Pagos, payouts y cobros recurrentes.
- `services/notifications`: Push, email y notificaciones in-app.
- `infrastructure/docker`: Contenedores locales para servicios de video e infra.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Construir auth real, perfiles y dashboard streamer.
- Integrar MediaMTX/Nginx-RTMP para sesiones en vivo.
- Agregar chat websocket y moderacion automatica.
- Crear pipelines de VOD, highlights y analytics.
