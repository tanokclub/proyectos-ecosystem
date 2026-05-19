import { apiGet, formatViewers, type ChatMessage, type Stream } from "@/lib/api";
import ChatPanel from "@/components/ChatPanel";
import { Heart, Share2, Bell } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStreamData(id: string) {
  const [streamsData, chatData] = await Promise.all([
    apiGet<{ streams: Stream[] }>("/api/v1/streams"),
    apiGet<{ messages: ChatMessage[] }>("/api/v1/chat/demo"),
  ]);
  const stream = streamsData?.streams.find((s) => s.id === id) ?? null;
  const messages = chatData?.messages ?? [];
  return { stream, messages };
}

export default async function ChannelPage({ params }: { params: { id: string } }) {
  const { stream, messages } = await getStreamData(params.id);

  if (!stream) {
    return (
      <div className="p-8 text-center text-muted">
        No se encontro el canal <code>{params.id}</code>.
      </div>
    );
  }

  const [c1, c2] = stream.thumbnailPalette;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Video player mock */}
        <div className="bg-black border-b border-border">
          <div
            className="relative aspect-video w-full max-h-[70vh] mx-auto"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="flex items-center gap-2 bg-live/95 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                <span className="live-dot" />
                Live
              </div>
              <p className="mt-4 text-2xl font-black tracking-tight">{stream.title}</p>
              <p className="mt-1 text-sm opacity-80">LIVE &mdash; {stream.id}</p>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {formatViewers(stream.viewers)} viewers
            </div>
          </div>
        </div>

        {/* Stream info */}
        <div className="p-5 border-b border-border">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-full border-2 border-accent shrink-0"
              style={{ background: `linear-gradient(135deg, ${c2}, ${c1})` }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black">{stream.streamer}</h1>
              <p className="text-sm text-white/90 mt-0.5">{stream.title}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs bg-surfaceAlt border border-border text-muted px-2 py-0.5 rounded">
                  {stream.category}
                </span>
                <span className="text-xs uppercase text-muted">{stream.country}</span>
                <span className="text-xs uppercase text-muted">{stream.language}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 bg-surfaceAlt border border-border hover:border-accent text-white text-sm font-bold px-3 py-2 rounded-md transition">
                <Heart size={16} /> Seguir
              </button>
              <button className="flex items-center gap-1.5 bg-accent hover:bg-accentDark text-black text-sm font-bold px-3 py-2 rounded-md transition">
                <Bell size={16} /> Suscribirse
              </button>
              <button className="flex items-center justify-center bg-surfaceAlt border border-border hover:border-accent text-white p-2 rounded-md transition">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 text-sm text-muted">
          <p>
            Transmision en vivo desde {stream.country}. Categoria: <strong className="text-white">{stream.category}</strong>.
            Disfruta del stream y participa en el chat.
          </p>
        </div>
      </div>

      <ChatPanel streamerId={stream.id} initialMessages={messages} />
    </div>
  );
}
