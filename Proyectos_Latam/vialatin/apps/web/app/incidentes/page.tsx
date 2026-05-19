"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Filter } from "lucide-react";
import { getIncidents, type Incident } from "@/lib/api";

const severityColor: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const typeLabel: Record<Incident["type"], string> = {
  accident: "Accidente",
  pothole: "Hueco",
  police: "Policia",
  hazard: "Peligro",
  traffic: "Trafico",
};

export default function IncidentesPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [severity, setSeverity] = useState<string>("all");
  const [city, setCity] = useState<string>("all");

  useEffect(() => {
    getIncidents()
      .then(({ incidents }) => setIncidents(incidents))
      .finally(() => setLoading(false));
  }, []);

  const cities = useMemo(() => Array.from(new Set(incidents.map((i) => i.city))).sort(), [incidents]);
  const filtered = useMemo(
    () =>
      incidents.filter(
        (i) => (severity === "all" || i.severity === severity) && (city === "all" || i.city === city)
      ),
    [incidents, severity, city]
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="text-amber-glow" /> Incidentes
          </h1>
          <p className="text-muted text-sm mt-1">Reportes activos en la red ViaLatin LATAM.</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Filter size={14} className="text-muted" />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="bg-navy-900 border border-navy-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-glow"
          >
            <option value="all">Severidad: todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-navy-900 border border-navy-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-glow"
          >
            <option value="all">Ciudad: todas</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="rounded-2xl bg-navy-900/60 border border-navy-700/60 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy-950/60 text-muted text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Tipo</th>
              <th className="text-left px-4 py-3">Severidad</th>
              <th className="text-left px-4 py-3">Ciudad</th>
              <th className="text-left px-4 py-3">Pais</th>
              <th className="text-right px-4 py-3">Votos</th>
              <th className="text-right px-4 py-3">Reportado</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-6">
                  Cargando incidentes...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted py-6">
                  No hay incidentes que coincidan con el filtro.
                </td>
              </tr>
            )}
            {filtered.map((inc) => (
              <tr key={inc.id} className="border-t border-navy-700/40 hover:bg-navy-800/30">
                <td className="px-4 py-3 font-mono text-xs text-muted">{inc.id}</td>
                <td className="px-4 py-3 font-medium">{typeLabel[inc.type]}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ background: `${severityColor[inc.severity]}22`, color: severityColor[inc.severity] }}
                  >
                    {inc.severity}
                  </span>
                </td>
                <td className="px-4 py-3">{inc.city}</td>
                <td className="px-4 py-3 text-muted">{inc.country}</td>
                <td className="px-4 py-3 text-right text-amber-glow font-semibold">{inc.votes}</td>
                <td className="px-4 py-3 text-right text-xs text-muted">
                  {new Date(inc.reportedAt).toLocaleString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
