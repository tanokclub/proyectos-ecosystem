import Link from "next/link";
import { apiGet, formatViewers, type Stream } from "@/lib/api";

export const dynamic = "force-dynamic";

async function getStreams(): Promise<Stream[]> {
  const data = await apiGet<{ streams: Stream[] }>("/api/v1/streams");
  return data?.streams ?? [];
}

export default async function ExplorePage() {
  const streams = await getStreams();
  const totalViewers = streams.reduce((acc, s) => acc + s.viewers, 0);

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Explorar</h1>
        <p className="text-muted mt-1 text-sm">
          {streams.length} canales en vivo en LATAM &middot; {formatViewers(totalViewers)} espectadores ahora
        </p>
      </header>

      {streams.length === 0 ? (
        <div className="p-8 text-center text-muted bg-surface border border-border rounded-lg">
          No se pudo cargar la lista de streams. Verifica que el gateway corra en <code>:4105</code>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {streams.map((s) => (
            <StreamCard key={s.id} stream={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function StreamCard({ stream }: { stream: Stream }) {
  const [c1, c2] = stream.thumbnailPalette;
  return (
    <Link
      href={`/canal/${stream.id}`}
      className="group flex flex-col gap-2 hover:opacity-95 transition"
    >
      <div
        className="relative aspect-video rounded-md overflow-hidden ring-0 group-hover:ring-2 group-hover:ring-accent transition"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        <div className="absolute top-2 left-2 flex items-center gap-2 bg-live/95 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
          <span className="live-dot" />
          Live
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-sm">
          {formatViewers(stream.viewers)} viewers
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-sm">
          {stream.country}
        </div>
      </div>
      <div className="flex gap-3">
        <div
          className="w-10 h-10 rounded-full shrink-0 border border-border"
          style={{ background: `linear-gradient(135deg, ${c2}, ${c1})` }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition">{stream.title}</h3>
          <p className="text-muted text-xs mt-0.5">{stream.streamer}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase tracking-wider bg-surfaceAlt border border-border text-muted px-1.5 py-0.5 rounded">
              {stream.category}
            </span>
            <span className="text-[10px] uppercase text-muted">{stream.language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
