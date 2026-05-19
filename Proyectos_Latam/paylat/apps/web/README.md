# apps/web

Portal web para clientes PayLat. Next.js 14 (App Router) + Tailwind CSS, en español.

## Cómo correr

Desde la raíz del monorepo:

```bash
# 1. Instalar dependencias (una sola vez)
npm install

# 2. En una terminal: levantar el mock api-gateway (puerto 4102)
npm run dev

# 3. En otra terminal: levantar la web (puerto 3002)
npm run dev:web
```

La web queda en `http://127.0.0.1:3002` y consume el gateway en `http://127.0.0.1:4102`.

## Estructura

- `app/page.tsx` — Dashboard con saldos por moneda (consume `GET /api/v1/accounts`).
- `app/transferencias/page.tsx` — Listado de recientes (`GET /api/v1/transfers/recent`) + form que cotiza con `POST /api/v1/transfers/quote`.
- `app/tarjetas/page.tsx` — Grid de tarjetas virtuales (`GET /api/v1/cards`).
- `app/qr/page.tsx` — Simulador de pago QR (`POST /api/v1/payments/qr`).
- `lib/api.ts` — Helper `apiFetch` apuntando a `NEXT_PUBLIC_PAYLAT_API` o `http://127.0.0.1:4102`.

## Variables de entorno

| Variable | Default | Notas |
|---|---|---|
| `NEXT_PUBLIC_PAYLAT_API` | `http://127.0.0.1:4102` | URL base del api-gateway |
