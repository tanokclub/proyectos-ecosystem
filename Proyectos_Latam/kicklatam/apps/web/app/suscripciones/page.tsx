"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { apiPost } from "@/lib/api";

type Tier = "bronze" | "silver" | "gold";

type SubResponse = { status: string; renewsAt: string };

export default function SuscripcionesPage() {
  const [streamerId, setStreamerId] = useState("streamer_77");
  const [tier, setTier] = useState<Tier>("gold");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    const res = await apiPost<{ streamerId: string; tier: Tier }, SubResponse>(
      "/api/v1/subscriptions",
      { streamerId, tier }
    );
    if (res) setResult(res);
    else setError("No se pudo conectar con el gateway en :4105");
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Suscripciones</h1>
        <p className="text-muted mt-1 text-sm">Apoya a tu streamer favorito con una suscripcion mensual.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">ID del streamer</label>
          <input
            value={streamerId}
            onChange={(e) => setStreamerId(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition"
          >
            <option value="bronze">Bronze &mdash; $4.99/mes</option>
            <option value="silver">Silver &mdash; $9.99/mes</option>
            <option value="gold">Gold &mdash; $24.99/mes</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accentDark disabled:opacity-50 text-black font-bold py-3 rounded-md transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
          {loading ? "Procesando..." : "Confirmar suscripcion"}
        </button>

        {result && (
          <div className="bg-accent/10 border border-accent text-accent text-sm rounded-md p-3">
            Suscripcion <strong>{result.status}</strong>. Renueva el {new Date(result.renewsAt).toLocaleDateString("es-419")}.
          </div>
        )}
        {error && (
          <div className="bg-live/10 border border-live text-live text-sm rounded-md p-3">{error}</div>
        )}
      </form>
    </div>
  );
}
