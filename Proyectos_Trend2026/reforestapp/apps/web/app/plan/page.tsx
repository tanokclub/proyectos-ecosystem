import { getManifest } from "@/lib/api";

export default async function PlanPage() {
  const m = await getManifest();
  const p = m.project;
  if (!p) return <p className="text-muted">No se pudo cargar el manifest. ¿Está corriendo el mock API?</p>;
  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-2">{p.title}</h2>
      <p className="text-muted mb-6">{p.summary}</p>
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Categoría</h3><p>{p.category}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Codename</h3><p className="font-mono">{p.codename}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">API port</h3><p className="font-mono text-primary">:{p.server?.port}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Web port</h3><p className="font-mono text-primary">:{p.web?.port}</p></div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4"><h3 className="text-sm text-muted mb-3 uppercase">Stack</h3><ul className="flex flex-wrap gap-2">{(p.stack || []).map((s: string) => <li key={s} className="px-3 py-1 bg-bg rounded-full text-sm">{s}</li>)}</ul></div>
      <div className="bg-surface rounded-xl p-5"><h3 className="text-sm text-muted mb-3 uppercase">Módulos</h3><ul className="space-y-2">{(p.modules || []).map((mod: string) => <li key={mod} className="flex items-center gap-2 text-sm">→ {mod}</li>)}</ul></div>
    </div>
  );
}
