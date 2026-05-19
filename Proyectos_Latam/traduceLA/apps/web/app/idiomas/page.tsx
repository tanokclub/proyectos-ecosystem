import { api, type Language } from "@/lib/api";

async function getLanguages(): Promise<Language[]> {
  try {
    const data = await api.languages();
    return data.items || [];
  } catch (err) {
    console.error("[traduceLA] no se pudo cargar /languages", err);
    return [];
  }
}

const familyLabels: Record<string, string> = {
  es: "Espanol",
  pt: "Portugues",
  en: "Ingles",
  indigena: "Indigenas",
};

const familyAccent: Record<string, string> = {
  es: "bg-teal-50 text-teal-700 border-teal-200",
  pt: "bg-amber-50 text-amber-700 border-amber-200",
  en: "bg-sky-50 text-sky-700 border-sky-200",
  indigena: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
};

export default async function IdiomasPage() {
  const items = await getLanguages();
  const grouped = items.reduce<Record<string, Language[]>>((acc, l) => {
    (acc[l.family] = acc[l.family] || []).push(l);
    return acc;
  }, {});

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-background/85 backdrop-blur-md z-10 border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold">Idiomas soportados</h1>
        <p className="text-sm text-secondary mt-0.5">
          Variantes regionales y lenguas indigenas disponibles en la API.
        </p>
      </div>

      <section className="px-6 py-6 max-w-5xl w-full mx-auto space-y-6">
        {Object.keys(grouped).length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-secondary">
            No hay idiomas registrados.
          </div>
        ) : (
          Object.entries(grouped).map(([family, list]) => (
            <div key={family}>
              <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                {familyLabels[family] || family}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {list.map((l) => (
                  <div
                    key={l.code}
                    className="rounded-xl border border-border bg-surface p-3 shadow-sm flex items-center gap-3"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border text-[11px] font-bold ${
                        familyAccent[family] || "bg-muted text-secondary border-border"
                      }`}
                    >
                      {l.flag}
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-ink">{l.name}</p>
                      <p className="text-[11px] font-mono text-secondary">{l.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
