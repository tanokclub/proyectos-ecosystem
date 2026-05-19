"use client";

import { useState } from "react";
import { Navigation, Clock, Route as RouteIcon, AlertTriangle, Loader2 } from "lucide-react";
import { planRoute, type RoutePlanResponse } from "@/lib/api";

export default function RutasPage() {
  const [from, setFrom] = useState("Bogota - Chapinero");
  const [to, setTo] = useState("Bogota - Usaquen");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoutePlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await planRoute({ from, to });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Navigation className="text-amber-glow" /> Planificador de rutas
        </h1>
        <p className="text-muted text-sm mt-1">
          Calcula tiempo estimado, distancia y advertencias usando la red comunitaria de ViaLatin.
        </p>
      </header>

      <form onSubmit={onSubmit} className="rounded-2xl bg-navy-900/60 border border-navy-700/60 p-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-muted">Origen</span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-glow"
              placeholder="Ej: Bogota - Chapinero"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-muted">Destino</span>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-glow"
              placeholder="Ej: Bogota - Usaquen"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-amber-glow text-navy-950 font-bold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
          {loading ? "Calculando..." : "Planificar ruta"}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-danger/10 border border-danger/40 text-danger px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {result && (
        <section className="rounded-2xl bg-navy-900/60 border border-navy-700/60 p-5 flex flex-col gap-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Stat icon={<Clock />} label="ETA" value={`${result.etaMinutes} min`} />
            <Stat icon={<RouteIcon />} label="Distancia" value={`${result.distanceKm} km`} />
            <Stat icon={<Navigation />} label="Alternativas" value={String(result.alternatives ?? 1)} />
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted mb-2">Advertencias</div>
            <ul className="flex flex-col gap-2">
              {result.warnings.map((w, i) => (
                <li key={i} className="flex items-center gap-2 text-sm bg-navy-950/60 border border-navy-700/60 rounded-lg px-3 py-2">
                  <AlertTriangle size={14} className="text-warning" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] text-muted">routeId: {result.routeId}</div>
        </section>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-navy-950/60 border border-navy-700/60 p-4">
      <div className="flex items-center gap-2 text-amber-glow">{icon}</div>
      <div className="mt-2 text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
