# API contracts mock

Proyecto: PayLat

## Rutas

- `GET /api/v1/accounts`: Resumen de cuentas y saldos
- `POST /api/v1/transfers/quote`: Cotizacion de transferencia P2P
- `POST /api/v1/payments/qr`: Simular pago con QR

## Notas

- Las rutas devuelven respuestas mock para permitir integracion temprana.
- Las peticiones POST reflejan el payload recibido junto con la respuesta simulada.
- Este archivo sirve como puente entre el plan maestro y la futura implementacion completa.
