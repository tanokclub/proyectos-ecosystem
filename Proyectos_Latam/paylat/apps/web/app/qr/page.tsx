"use client";

import { useState } from "react";
import { QrCode, CheckCircle2 } from "lucide-react";
import { apiFetch, type GatewayEnvelope } from "@/lib/api";

type QrResponse = GatewayEnvelope<{
  status: string;
  authCode: string;
}>;

export default function QrPage() {
  const [merchantId, setMerchantId] = useState("store_123");
  const [amount, setAmount] = useState("38900");
  const [currency, setCurrency] = useState("COP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QrResponse["response"] | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiFetch<QrResponse>("/api/v1/payments/qr", {
        method: "POST",
        body: JSON.stringify({
          merchantId,
          amount: Number(amount),
          currency,
        }),
      });
      setResult(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <header>
        <h1 className="text-2xl font-bold">Pagar con QR</h1>
        <p className="text-muted text-sm mt-1">
          Simula un cobro en un comercio aliado escaneando o introduciendo su ID.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-border bg-surface p-5">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted">
                Comercio (merchantId)
              </label>
              <input
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                className="mt-1 w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted">
                  Monto
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={1}
                  className="mt-1 w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted">
                  Moneda
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="COP">COP</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold rounded-lg px-4 py-2 hover:bg-primary-dark transition disabled:opacity-50"
            >
              <QrCode size={16} />
              {loading ? "Procesando..." : "Confirmar pago"}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 text-danger text-sm px-3 py-2">
              {error}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-5 flex flex-col items-center justify-center text-center">
          {result ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <p className="font-semibold text-lg">Pago {result.status}</p>
              <p className="text-muted text-sm">
                Código de autorización
              </p>
              <p className="font-mono text-base text-primary">{result.authCode}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted">
              <div className="w-40 h-40 rounded-2xl bg-white/95 flex items-center justify-center text-background">
                <QrCode size={120} strokeWidth={1.2} />
              </div>
              <p className="text-sm">Esperando confirmación del comercio...</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
