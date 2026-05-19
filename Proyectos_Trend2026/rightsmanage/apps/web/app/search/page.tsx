"use client";
import { useEffect, useMemo, useState } from "react";
import { getManifest } from "@/lib/api";

export default function SearchPage() {
  const [manifest, setManifest] = useState<any>({ project: null, apiRoutes: [] });
  const [query, setQuery] = useState("");
  useEffect(() => { getManifest().then(setManifest); }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { routes: [], modules: [], stack: [] };
    const q = query.toLowerCase();
    const routes = (manifest.apiRoutes || []).filter((r: any) =>
      r.path.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.method.toLowerCase().includes(q)
    );
    const modules = (manifest.project?.modules || []).filter((m: string) => m.toLowerCase().includes(q));
    const stack = (manifest.project?.stack || []).filter((s: string) => s.toLowerCase().includes(q));
    return { routes, modules, stack };
  }, [query, manifest]);

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Buscar</h2>
      <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar en rutas, módulos o stack..."
        className="w-full bg-surface border border-muted/30 rounded-lg p-4 text-lg mb-6" />
      {query.trim() && (
        <div className="space-y-6">
          {results.routes.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Rutas ({results.routes.length})</h3>
              <ul className="space-y-2">{results.routes.map((rt: any) => (
                <li key={`${rt.method} ${rt.path}`} className="flex items-center gap-3 text-sm">
                  <span className={`px-2 py-0.5 rounded font-mono text-xs ${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}`}>{rt.method}</span>
                  <span className="font-mono">{rt.path}</span><span className="text-muted ml-auto">{rt.summary}</span>
                </li>
              ))}</ul>
            </div>
          )}
          {results.modules.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Módulos ({results.modules.length})</h3>
              <ul className="flex flex-wrap gap-2">{results.modules.map((m: string) => <li key={m} className="px-3 py-1 bg-bg rounded-full text-sm">{m}</li>)}</ul>
            </div>
          )}
          {results.stack.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Stack ({results.stack.length})</h3>
              <ul className="flex flex-wrap gap-2">{results.stack.map((s: string) => <li key={s} className="px-3 py-1 bg-bg rounded-full text-sm">{s}</li>)}</ul>
            </div>
          )}
          {results.routes.length === 0 && results.modules.length === 0 && results.stack.length === 0 && (
            <p className="text-muted">Sin resultados para "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
