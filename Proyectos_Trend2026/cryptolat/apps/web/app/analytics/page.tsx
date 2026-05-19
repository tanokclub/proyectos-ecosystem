"use client";
import { useEffect, useState } from "react";
import { getCallHistory } from "@/lib/api";

export default function AnalyticsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  useEffect(() => { setCalls(getCallHistory()); }, []);

  const total = calls.length;
  const ok = calls.filter(c => c.status >= 200 && c.status < 300).length;
  const errs = calls.filter(c => c.status >= 400).length;
  const avgMs = total ? Math.round(calls.reduce((a, c) => a + c.ms, 0) / total) : 0;
  const p95Ms = total ? Math.round([...calls].sort((a, b) => a.ms - b.ms)[Math.floor(total * 0.95)]?.ms || 0) : 0;
  const byPath: Record<string, number> = {};
  for (const c of calls) byPath[c.path] = (byPath[c.path] || 0) + 1;
  const topPaths = Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="max-w-5xl">
      <h2 className="text-3xl font-bold mb-6">Analytics</h2>
      {total === 0 ? <p className="text-muted">No hay llamadas registradas todavía. Usa el API Explorer o la Console.</p> : null}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Total calls</p><p className="text-2xl font-bold">{total}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">2xx</p><p className="text-2xl font-bold text-primary">{ok}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Errors</p><p className="text-2xl font-bold text-red-400">{errs}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Avg / p95</p><p className="text-2xl font-bold">{avgMs}<span className="text-sm text-muted"> / {p95Ms}ms</span></p></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-3">Top rutas</h3>
          <ul className="space-y-2">{topPaths.map(([p, n]) => <li key={p} className="flex justify-between text-sm"><span className="font-mono">{p}</span><span className="text-primary">{n}</span></li>)}</ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-3">Últimas 10</h3>
          <ul className="space-y-1 text-xs">
            {calls.slice(0, 10).map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={`px-1.5 rounded font-mono ${c.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}`}>{c.method}</span>
                <span className="font-mono truncate flex-1">{c.path}</span>
                <span className={`font-mono ${c.status >= 200 && c.status < 300 ? "text-primary" : "text-red-400"}`}>{c.status}</span>
                <span className="text-muted">{c.ms}ms</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
