# LatamaX

Red social estilo Twitter/X enfocada en audiencias de Latinoamerica.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- feed social
- perfiles
- tendencias
- mensajeria
- notificaciones

## Stack objetivo

- Next.js 14
- Expo
- Node.js
- PostgreSQL
- Redis
- WebSockets

## Estructura creada

- `apps/api`: servicio base ejecutable.
- `packages/shared`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/web`: Cliente web Next.js para timeline, perfiles, busqueda y notificaciones.
- `apps/mobile`: Cliente mobile Expo para consumo del feed, mensajeria y creacion de posts.
- `packages/ui`: Componentes UI compartidos entre web y mobile.
- `packages/config`: Configuraciones compartidas de lint, tsconfig y tailwind.
- `infra/docker`: Base de contenedores y orquestacion local.
- `infra/scripts`: Scripts de seed, migraciones y despliegue.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Convertir el mock API en servicios con auth, posts y follows.
- Implementar contratos TypeScript compartidos para frontend y mobile.
- Levantar Prisma y migraciones para usuarios, posts y notificaciones.
- Agregar websocket para feed en vivo y mensajes directos.
