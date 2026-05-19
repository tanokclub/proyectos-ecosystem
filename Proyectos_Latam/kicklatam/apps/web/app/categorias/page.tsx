import Link from "next/link";
import { apiGet, formatViewers, type Category } from "@/lib/api";

export const dynamic = "force-dynamic";

async function getCategories(): Promise<Category[]> {
  const data = await apiGet<{ categories: Category[] }>("/api/v1/categories");
  return data?.categories ?? [];
}

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Categorias</h1>
        <p className="text-muted mt-1 text-sm">Explora streams por categoria.</p>
      </header>

      {categories.length === 0 ? (
        <div className="p-8 text-center text-muted bg-surface border border-border rounded-lg">
          No se pudieron cargar las categorias.
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((c) => (
              <Link
                key={c.id}
                href="/"
                className="bg-surface border border-border hover:border-accent text-sm px-3 py-1.5 rounded-full transition"
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((c) => {
              const [c1, c2] = c.palette;
              return (
                <Link
                  key={c.id}
                  href="/"
                  className="group flex flex-col gap-2"
                >
                  <div
                    className="aspect-[3/4] rounded-md overflow-hidden ring-0 group-hover:ring-2 group-hover:ring-accent transition flex items-end p-3"
                    style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
                  >
                    <span className="text-white font-black text-lg drop-shadow">{c.name}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-muted">{formatViewers(c.viewers)} viewers</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
