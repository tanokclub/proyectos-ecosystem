import { getHealth, getManifest } from "@/lib/api";

export default async function HealthPage() {
  const [h, m] = await Promise.all([getHealth(), getManifest()]);
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Estado del servicio</h2>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between">
          <span>Mock API</span>
          <span className={h.status === "ok" ? "text-primary font-mono" : "text-red-400 font-mono"}>{h.status}</span>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5">
        <h3 className="text-sm text-muted mb-3">Manifest raw</h3>
        <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-[500px]">{JSON.stringify(m, null, 2)}</pre>
      </div>
    </div>
  );
}
