import { ArrowRight, Clock } from "lucide-react";
import { api, type HistoryItem } from "@/lib/api";

async function getHistory(): Promise<HistoryItem[]> {
  try {
    const data = await api.history();
    return data.items || [];
  } catch (err) {
    console.error("[traduceLA] no se pudo cargar /history", err);
    return [];
  }
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function HistorialPage() {
  const items = await getHistory();

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-background/85 backdrop-blur-md z-10 border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold">Historial</h1>
        <p className="text-sm text-secondary mt-0.5">
          Traducciones recientes en este dispositivo.
        </p>
      </div>

      <section className="px-6 py-6 max-w-3xl w-full mx-auto flex flex-col gap-3">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-secondary">
            Aun no hay traducciones registradas.
          </div>
        )}
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center justify-between mb-2 text-xs">
              <div className="inline-flex items-center gap-2 text-secondary">
                <span className="font-mono">{item.sourceLang || "?"}</span>
                <ArrowRight size={12} />
                <span className="font-mono">{item.targetLang || "?"}</span>
              </div>
              {item.createdAt && (
                <span className="inline-flex items-center gap-1 text-secondary">
                  <Clock size={12} /> {formatDate(item.createdAt)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-secondary mb-1">
                  Original
                </span>
                <p className="text-sm text-ink leading-relaxed">{item.input}</p>
              </div>
              <div className="md:border-l md:border-border md:pl-3">
                <span className="block text-[11px] uppercase tracking-wider text-teal-700 mb-1">
                  Traduccion
                </span>
                <p className="text-sm text-ink leading-relaxed">{item.output}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
