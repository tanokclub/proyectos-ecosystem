"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { apiFetch, type GatewayEnvelope } from "@/lib/api";

type QuoteResponse = GatewayEnvelope<{
  fee: number;
  etaSeconds: number;
  channel: string;
}>;

export function TransferForm() {
  const [alias, setAlias] = useState("maria.co");
  const [amount, setAmount] = useState("45000");
  const [currency, setCurrency] = useState("COP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteResponse["response"] | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setQuote(null);
    try {
      const payload = {
        targetAlias: alias,
        amount: Number(amount),
        currency,
      };
      const data = await apiFetch<QuoteResponse>("/api/v1/transfers/quote", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setQuote(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-lg font-semibold mb-4">Nueva transferencia</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">
            Alias destino
          </label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="maria.co"
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
              <option value="ARS">ARS</option>
              <option value="PEN">PEN</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold rounded-lg px-4 py-2 hover:bg-primary-dark transition disabled:opacity-50"
        >
          <Send size={16} />
          {loading ? "Cotizando..." : "Cotizar transferencia"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-lg border border-danger/40 bg-danger/10 text-danger text-sm px-3 py-2">
          {error}
        </div>
      )}

      {quote && (
        <div className="mt-4 rounded-lg border border-primary/40 bg-primary/5 text-sm p-4">
          <p className="font-semibold text-primary mb-2">Cotización lista</p>
          <ul className="space-y-1 text-white/90">
            <li>
              Comisión: <span className="font-mono">{quote.fee}</span>
            </li>
            <li>
              ETA: <span className="font-mono">{quote.etaSeconds}s</span>
            </li>
            <li>
              Canal: <span className="font-mono">{quote.channel}</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
