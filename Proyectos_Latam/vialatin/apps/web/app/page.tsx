import { getIncidents, type Incident } from "@/lib/api";
import { AlertTriangle, Car, Construction, Shield, CloudRain, MapPin, type LucideIcon } from "lucide-react";

// Bounding box aproximado de LATAM para mapear lat/lng al viewBox SVG.
const BBOX = { minLat: -40, maxLat: 25, minLng: -90, maxLng: -45 };
const VIEW = { w: 1000, h: 700 };

function project(lat: number, lng: number) {
  const x = ((lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng)) * VIEW.w;
  const y = VIEW.h - ((lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * VIEW.h;
  return { x, y };
}

const severityColor: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const typeIcon: Record<Incident["type"], LucideIcon> = {
  accident: Car,
  pothole: Construction,
  police: Shield,
  hazard: AlertTriangle,
  traffic: CloudRain,
};

const typeLabel: Record<Incident["type"], string> = {
  accident: "Accidente",
  pothole: "Hueco",
  police: "Policia",
  hazard: "Peligro",
  traffic: "Trafico",
};

export default async function MapaPage() {
  const { incidents } = await getIncidents();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 h-full">
      {/* Mapa mock */}
      <section className="relative rounded-2xl overflow-hidden border border-navy-700/60 map-grid min-h-[560px]">
        <div className="absolute top-4 left-4 z-10 bg-navy-900/80 backdrop-blur px-3 py-2 rounded-lg border border-navy-700/60">
          <div className="text-[10px] uppercase tracking-wider text-muted">Visualizacion</div>
          <div className="font-semibold text-sm flex items-center gap-2">
            <MapPin size={14} className="text-amber-glow" /> LATAM live mock
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 text-xs">
          {(["high", "medium", "low"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2 bg-navy-900/80 px-2 py-1 rounded border border-navy-700/60">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: severityColor[s] }} />
              <span className="capitalize">{s}</span>
            </div>
          ))}
        </div>

        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="w-full h-full block">
          {/* Calles troncales simuladas */}
          <g stroke="rgba(36,85,160,0.6)" strokeWidth="2" fill="none">
            <path d="M 80 120 C 240 80, 360 220, 520 200 S 820 280, 940 220" />
            <path d="M 60 380 C 200 360, 340 480, 540 460 S 800 520, 960 480" />
            <path d="M 120 600 C 280 560, 420 660, 600 620 S 840 660, 960 640" />
            <path d="M 300 40 L 320 680" />
            <path d="M 560 40 L 600 680" />
            <path d="M 780 40 L 820 680" />
          </g>
          {/* Ruta destacada */}
          <path
            d="M 200 480 C 320 420, 440 360, 600 320 S 820 240, 900 180"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            fill="none"
            opacity="0.85"
          />

          {/* Incidentes */}
          {incidents.map((inc) => {
            const { x, y } = project(inc.lat, inc.lng);
            return (
              <g key={inc.id}>
                <circle cx={x} cy={y} r={12} fill={severityColor[inc.severity]} fillOpacity={0.18} />
                <circle cx={x} cy={y} r={6} fill={severityColor[inc.severity]} stroke="#06101f" strokeWidth={2} />
                <text x={x + 10} y={y - 8} fontSize={11} fill="#e2e8f0" className="font-medium">
                  {inc.city}
                </text>
              </g>
            );
          })}
        </svg>
      </section>

      {/* Panel lateral incidentes */}
      <aside className="flex flex-col gap-3 min-w-0">
        <div className="rounded-2xl bg-navy-900/60 border border-navy-700/60 p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold tracking-tight">Incidentes en vivo</h2>
            <span className="text-xs text-muted">{incidents.length} activos</span>
          </div>
          <p className="text-xs text-muted">Reportes de la comunidad en los ultimos minutos.</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2 pr-1">
          {incidents.map((inc) => {
            const Icon = typeIcon[inc.type] || AlertTriangle;
            return (
              <div
                key={inc.id}
                className="rounded-xl bg-navy-900/50 border border-navy-700/60 p-3 hover:border-amber-glow/60 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg grid place-items-center shrink-0"
                    style={{ background: `${severityColor[inc.severity]}22`, color: severityColor[inc.severity] }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm truncate">{typeLabel[inc.type]}</span>
                      <span
                        className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ background: `${severityColor[inc.severity]}22`, color: severityColor[inc.severity] }}
                      >
                        {inc.severity}
                      </span>
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {inc.city} - {inc.country}
                    </div>
                    <div className="text-[11px] text-muted mt-1 flex items-center justify-between">
                      <span>{new Date(inc.reportedAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}</span>
                      <span className="text-amber-glow">{inc.votes} votos</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {incidents.length === 0 && (
            <div className="text-sm text-muted p-4">Mock API no disponible. Asegurate de correr <code>npm run dev</code> en la raiz.</div>
          )}
        </div>
      </aside>
    </div>
  );
}
