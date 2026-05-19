"use client";

import { useState } from "react";
import { Plus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { postReport } from "@/lib/api";

const TYPES = [
  { value: "accident", label: "Accidente" },
  { value: "pothole",  label: "Hueco" },
  { value: "police",   label: "Policia" },
  { value: "hazard",   label: "Peligro" },
  { value: "traffic",  label: "Trafico" },
];

export default function ReportarPage() {
  const [type, setType] = useState("accident");
  const [lat, setLat] = useState("4.6097");
  const [lng, setLng] = useState("-74.0817");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ status: string; review: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await postReport({
        type,
        lat: Number(lat),
        lng: Number(lng),
        description: description || undefined,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Plus className="text-amber-glow" /> Reportar incidente
        </h1>
        <p className="text-muted text-sm mt-1">Ayuda a la comunidad reportando lo que ves en la via.</p>
      </header>

      <form onSubmit={onSubmit} className="rounded-2xl bg-navy-900/60 border border-navy-700/60 p-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-muted">Tipo de reporte</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-glow"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-muted">Latitud</span>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              inputMode="decimal"
              className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-amber-glow"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wider text-muted">Longitud</span>
            <input
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              inputMode="decimal"
              className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-amber-glow"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-muted">Descripcion (opcional)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-glow resize-none"
            placeholder="Detalla la situacion para los demas conductores..."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="self-start bg-amber-glow text-navy-950 font-bold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {loading ? "Enviando..." : "Enviar reporte"}
        </button>
      </form>

      {error && (
        <div className="rounded-xl bg-danger/10 border border-danger/40 text-danger px-4 py-3 text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {result && (
        <div className="rounded-xl bg-ok/10 border border-ok/40 text-ok px-4 py-3 text-sm flex items-center gap-2">
          <CheckCircle2 size={16} /> Reporte <strong>{result.status}</strong> - revision: {result.review}
        </div>
      )}
    </div>
  );
}
