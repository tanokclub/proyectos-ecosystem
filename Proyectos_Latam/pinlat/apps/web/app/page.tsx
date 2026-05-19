import { Bookmark, Heart } from "lucide-react";
import { apiData, paletteToGradient, pseudoHeight } from "@/lib/api";

type Pin = {
  id: string;
  title: string;
  image: string;
  saves: number;
  author?: string;
  palette?: string;
  tags?: string[];
};

type FeaturedPin = Pin & { description?: string };

async function getFeed(): Promise<Pin[]> {
  try {
    const data = await apiData<{ pins: Pin[] }>("/api/v1/feed");
    return data?.pins ?? [];
  } catch (error) {
    console.error("[pinlat/web] feed error", error);
    return [];
  }
}

async function getFeatured(): Promise<FeaturedPin | null> {
  try {
    const data = await apiData<{ pin: FeaturedPin }>("/api/v1/pin/featured");
    return data?.pin ?? null;
  } catch (error) {
    console.error("[pinlat/web] featured error", error);
    return null;
  }
}

export default async function HomePage() {
  const [pins, featured] = await Promise.all([getFeed(), getFeatured()]);

  return (
    <div className="flex flex-col gap-8">
      {featured ? <FeaturedHero pin={featured} /> : null}

      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Para ti</h2>
            <p className="text-sm text-muted">
              Inspiracion fresca desde toda Latinoamerica.
            </p>
          </div>
          <span className="text-xs text-muted">{pins.length} pines</span>
        </div>

        {pins.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 [column-fill:_balance]">
            {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FeaturedHero({ pin }: { pin: FeaturedPin }) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl ${paletteToGradient(
        pin.palette
      )} text-white shadow-lg`}
    >
      <div className="relative z-10 p-8 md:p-12 max-w-2xl">
        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide">
          Pin del dia
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold drop-shadow-sm">
          {pin.title}
        </h1>
        {pin.description ? (
          <p className="mt-3 text-white/90 max-w-prose">{pin.description}</p>
        ) : null}
        <div className="mt-4 flex items-center gap-4 text-sm text-white/90">
          <span>{pin.author}</span>
          <span className="inline-flex items-center gap-1">
            <Bookmark size={14} /> {pin.saves.toLocaleString("es-CO")} guardados
          </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10" />
    </section>
  );
}

function PinCard({ pin }: { pin: Pin }) {
  const height = pseudoHeight(pin.id);
  return (
    <article className="mb-4 break-inside-avoid group">
      <div
        className={`relative rounded-2xl overflow-hidden ${paletteToGradient(
          pin.palette
        )} shadow-sm`}
        style={{ height }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
          <button
            type="button"
            className="rounded-full bg-terracota px-3 py-1.5 text-xs font-bold text-white shadow"
          >
            Guardar
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
            <Heart size={12} /> {pin.saves}
          </span>
        </div>
      </div>
      <div className="px-1 pt-2">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
          {pin.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">
          {pin.author} · {pin.saves} guardados
        </p>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-sand p-10 text-center text-muted">
      <p className="font-semibold text-ink">No pudimos cargar el feed</p>
      <p className="text-sm mt-1">
        Asegurate de tener el mock API corriendo:{" "}
        <code className="bg-sand px-1.5 py-0.5 rounded">npm run dev</code> en
        la raiz del repo.
      </p>
    </div>
  );
}
