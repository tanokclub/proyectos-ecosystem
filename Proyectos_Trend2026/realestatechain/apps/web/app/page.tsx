import { getManifest, getHealth } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const [manifest, health] = await Promise.all([getManifest(), getHealth()]);
  const project = manifest.project;
  const routes = manifest.apiRoutes || [];
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">RealEstateChain</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-mono ${health.status === "ok" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}`}>
          API {health.status === "ok" ? "ONLINE" : "DOWN"}
        </span>
      </div>
      <p className="text-muted mb-8">Fractionalize real estate: tokens ERC-3643, rentas on-chain, marketplace LATAM.</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Stack</h3>
          <ul className="space-y-1"><li className="text-sm">• Next.js 14</li><li className="text-sm">• Foundry</li><li className="text-sm">• Solidity</li><li className="text-sm">• Ethers</li><li className="text-sm">• PostgreSQL</li></ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Módulos</h3>
          <ul className="space-y-1"><li className="text-sm">• propiedades</li><li className="text-sm">• tokenización</li><li className="text-sm">• rentas</li><li className="text-sm">• governance</li><li className="text-sm">• mercado secundario</li></ul>
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
