# ViaLatin

App de navegacion comunitaria tipo Waze con reportes y seguridad para LATAM.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- rutas
- reportes comunitarios
- trafico
- seguridad
- mapas

## Stack objetivo

- React Native
- NestJS
- PostGIS
- MongoDB
- Redis
- OSRM
- Kafka

## Estructura creada

- `services/api-gateway`: servicio base ejecutable.
- `shared/types`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/mobile`: Cliente mobile React Native con mapas, rutas y reportes.
- `apps/admin-panel`: Panel administrativo y de moderacion vial.
- `apps/map-editor`: Editor comunitario de mapas.
- `services/auth-service`: Auth, sesiones y reputacion del usuario.
- `services/route-service`: Calculo de rutas y recalculo dinamico.
- `services/report-service`: Incidentes, policia, cierres y peligros.
- `services/traffic-service`: Modelado de trafico y eventos.
- `ml/traffic-prediction`: Prediccion de trafico y ETA.
- `maps/osrm-config`: Configuracion base del motor de rutas.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Conectar PostGIS, OSRM y servicios de incidentes reales.
- Implementar sockets para trafico y reportes en vivo.
- Crear motores de prediccion de ETA y zonas de riesgo.
- Desarrollar editor de mapas y panel de moderacion.
