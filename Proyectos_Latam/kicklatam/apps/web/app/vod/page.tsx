import { Play, Clock, Eye } from "lucide-react";
import { apiGet, formatViewers, type Vod } from "@/lib/api";

export const dynamic = "force-dynamic";

async function getVod(): Promise<Vod[]> {
  const data = await apiGet<{ vod: Vod[] }>("/api/v1/vod");
  return data?.vod ?? [];
}

export default async function VodPage() {
  const vods = await getVod();

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">VOD recientes</h1>
        <p className="text-muted mt-1 text-sm">Repite los mejores streams a tu ritmo.</p>
      </header>

      {vods.length === 0 ? (
        <div className="p-8 text-center text-muted bg-surface border border-border rounded-lg">
          No se pudo cargar el catalogo de VOD.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vods.map((v, idx) => {
            const palettes: [string, string][] = [
              ["#22d3ee", "#0ea5e9"], ["#f472b6", "#a855f7"], ["#facc15", "#f97316"],
              ["#34d399", "#10b981"], ["#60a5fa", "#3b82f6"], ["#fb7185", "#e11d48"],
              ["#fbbf24", "#d97706"], ["#a3e635", "#65a30d"]
            ];
            const [c1, c2] = palettes[idx % palettes.length];
            return (
              <div key={v.id} className="group flex flex-col gap-2 cursor-pointer">
                <div
                  className="relative aspect-video rounded-md overflow-hidden ring-0 group-hover:ring-2 group-hover:ring-accent transition"
                  style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition">
                    <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center">
                      <Play className="text-black ml-0.5" size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Clock size={10} /> {v.duration}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition">
                    {v.title}
                  </h3>
                  <p className="text-muted text-xs mt-0.5">{v.streamer}</p>
                  <div className="flex items-center gap-1 text-muted text-xs mt-1">
                    <Eye size={12} /> {formatViewers(v.views)} vistas
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
