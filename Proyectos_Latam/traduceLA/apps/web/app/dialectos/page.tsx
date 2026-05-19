import { MapPin } from "lucide-react";
import { api, type Dialect } from "@/lib/api";

async function getDialects(): Promise<Dialect[]> {
  try {
    const data = await api.dialects();
    return data.items || [];
  } catch (err) {
    console.error("[traduceLA] no se pudo cargar /dialects", err);
    return [];
  }
}

const palette = [
  "from-teal-500 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-green-600",
  "from-rose-500 to-pink-600",
];

export default async function DialectosPage() {
  const items = await getDialects();

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-background/85 backdrop-blur-md z-10 border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold">Dialectos regionales</h1>
        <p className="text-sm text-secondary mt-0.5">
          Variantes detectadas y modeladas por TraduceLA.
        </p>
      </div>

      <section className="px-6 py-6 max-w-5xl w-full mx-auto">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-secondary">
            No hay dialectos registrados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((d, idx) => (
              <article
                key={d.code}
                className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden flex flex-col"
              >
                <div
                  className={`h-1.5 bg-gradient-to-r ${palette[idx % palette.length]}`}
                />
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-ink">{d.name}</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-secondary">
                      {d.code}
                    </span>
                  </div>
                  <p className="inline-flex items-center gap-1 text-xs text-secondary">
                    <MapPin size={12} /> {d.region}
                  </p>
                  <p className="text-sm text-ink/80 leading-relaxed flex-1">
                    {d.description}
                  </p>
                  <div className="pt-2 mt-1 border-t border-border text-xs text-secondary">
                    Idioma base:{" "}
                    <span className="font-mono text-ink">{d.baseLang}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
