import { Activity, TrendingUp } from "lucide-react";
import { getTraffic, type TrafficZone } from "@/lib/api";

const LEVEL_BAR: Record<TrafficZone["level"], { pct: number; color: string; label: string }> = {
  low:    { pct: 33,  color: "#22c55e", label: "Fluido"   },
  medium: { pct: 66,  color: "#f59e0b", label: "Moderado" },
  high:   { pct: 100, color: "#ef4444", label: "Saturado" },
};

export default async function TraficoPage() {
  const { zones } = await getTraffic();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="text-amber-glow" /> Trafico LATAM
        </h1>
        <p className="text-muted text-sm mt-1">Zonas monitoreadas en tiempo real por la comunidad ViaLatin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {zones.map((zone) => {
          const meta = LEVEL_BAR[zone.level];
          return (
            <article
              key={zone.id}
              className="rounded-2xl bg-navy-900/60 border border-navy-700/60 p-5 flex flex-col gap-3 hover:border-amber-glow/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted">Zona</div>
                  <h2 className="font-bold text-base mt-0.5">{zone.area}</h2>
                </div>
                <span
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: `${meta.color}22`, color: meta.color }}
                >
                  {meta.label}
                </span>
              </div>

              <div>
                <div className="h-2 rounded-full bg-navy-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${meta.pct}%`, background: meta.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Nivel</span>
                  <span className="font-semibold" style={{ color: meta.color }}>
                    {zone.level.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-amber-glow border-t border-navy-700/60 pt-3">
                <TrendingUp size={14} />
                <span>Impacto ETA: <strong>{zone.etaImpact}</strong></span>
              </div>
            </article>
          );
        })}
        {zones.length === 0 && (
          <div className="col-span-full text-sm text-muted p-4">
            No se pudo obtener informacion de trafico desde el mock API (puerto 4106).
          </div>
        )}
      </div>
    </div>
  );
}
