import { apiData, paletteToGradient } from "@/lib/api";

type Category = {
  id: string;
  label: string;
  emoji?: string;
  palette?: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiData<{ categories: Category[] }>(
      "/api/v1/categories"
    );
    return data?.categories ?? [];
  } catch (error) {
    console.error("[pinlat/web] categories error", error);
    return [];
  }
}

export default async function ExplorarPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-extrabold">Explora LATAM</h1>
        <p className="text-sm text-muted mt-1">
          Toca una categoria para empezar a inspirarte.
        </p>
      </header>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Categorias populares
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="rounded-full bg-white border border-sand px-4 py-2 text-sm font-semibold text-ink hover:bg-sand transition"
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
          Mosaico visual
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className={`relative h-40 rounded-2xl overflow-hidden text-white ${paletteToGradient(
                cat.palette
              )} hover:scale-[1.02] transition cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative h-full flex flex-col justify-end p-4">
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-lg font-bold drop-shadow">{cat.label}</span>
              </div>
            </article>
          ))}
        </div>
        {categories.length === 0 ? (
          <p className="text-muted">No hay categorias disponibles aun.</p>
        ) : null}
      </section>
    </div>
  );
}
