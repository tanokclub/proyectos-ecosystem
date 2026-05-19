import { getManifest, getHealth } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const [manifest, health] = await Promise.all([getManifest(), getHealth()]);
  const project = manifest.project;
  const routes = manifest.apiRoutes || [];
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">MerchPrint</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-mono ${health.status === "ok" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>
          API {health.status === "ok" ? "ONLINE" : "DOWN"}
        </span>
      </div>
      <p className="text-muted mb-8">Print-on-demand LATAM: catálogo merchandising, integración tiendas, dropshipping.</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Stack</h3>
          <ul className="space-y-1"><li className="text-sm">• Next.js 14</li><li className="text-sm">• NestJS</li><li className="text-sm">• PostgreSQL</li><li className="text-sm">• Stripe</li><li className="text-sm">• Stripe Connect</li></ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Módulos</h3>
          <ul className="space-y-1"><li className="text-sm">• catálogo</li><li className="text-sm">• tiendas</li><li className="text-sm">• pedidos</li><li className="text-sm">• producción</li><li className="text-sm">• envíos</li></ul>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-muted">Rutas mock disponibles ({routes.length})</h3>
          <Link href="/explorer" className="text-primary text-sm hover:underline">Probar →</Link>
        </div>
        <ul className="space-y-2">
          {routes.map((rt: any) => (
            <li key={`${rt.method} ${rt.path}`} className="flex items-center gap-3 text-sm">
              <span className={`px-2 py-0.5 rounded font-mono text-xs ${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}`}>{rt.method}</span>
              <span className="font-mono">{rt.path}</span>
              <span className="text-muted ml-auto">{rt.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
