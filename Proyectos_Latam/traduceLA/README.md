# TraduceLA

Traductor conversacional para LATAM con texto, voz y variantes regionales.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- traduccion de texto
- modo conversacion
- historial
- dialectos
- tts/stt

## Stack objetivo

- Flutter
- Fastify
- PostgreSQL
- Redis
- Whisper
- DeepL

## Estructura creada

- `packages/api`: servicio base ejecutable.
- `packages/shared-types`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/mobile`: Cliente Flutter para texto, voz, historial y modo conversacion.
- `packages/ml-pipeline`: Pipeline de STT, traduccion, TTS y adaptador regional.
- `packages/proto`: Contratos OpenAPI y/o protobuf.
- `infra/docker`: Contenedores locales para API, cache y workers.
- `tests/e2e`: Pruebas end-to-end de flujos de traduccion.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Conectar STT, TTS y proveedor de traduccion real por adaptadores.
- Modelar historial, favoritos y frases guardadas.
- Crear modo offline y descarga de paquetes de idioma.
- Afinar variantes regionales y dialectos con capas configurables.
