# Features Avanzados — ViaLatin

Ideas de alto valor ya viables sobre el mock stateful (lógica lista, faltan deps):

## Inmediatos (lógica implementable sin red)
- **Webhooks salientes**: al crear/editar registros, encolar y reintentar entregas.
- **Versionado de recursos**: guardar historial de cambios por registro (audit log en memoria).
- **Búsqueda avanzada**: el motor ya soporta `?q=`; extender a filtros por rango (`?campo_gte=`).
- **Bulk ops**: endpoint `/api/v1/batch` para crear/editar en lote.
- **Idempotencia**: header `Idempotency-Key` para POST seguros.

## Con dependencias (apenas haya internet)
- **IA generativa**: integrar Claude API (`@anthropic-ai/sdk`) para resúmenes/clasificación.
- **Realtime**: WebSocket gateway (ws) + suscripciones por colección.
- **Vector search**: pgvector / embeddings para búsqueda semántica.
- **Multi-tenant**: aislamiento por workspace + API keys por tenant.
- **Pagos**: Stripe / pasarela LATAM (Mercado Pago) según el dominio.
- **Notificaciones**: push (web-push) + email (nodemailer).

## Calidad y DX
- SDK cliente tipado autogenerado desde `/openapi.json`.
- Playground interactivo de la API (Swagger UI servido estáticamente).
- Feature flags por entorno.

> Prioriza según el dominio del proyecto. Cada feature “con dependencias” debe
> entrar como issue en `docs/backlog.md` con su paquete npm asociado.
