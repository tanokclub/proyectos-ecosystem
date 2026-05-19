"use client";
import { useEffect, useState } from "react";
import { callRoute, getManifest } from "@/lib/api";

export default function ExplorerPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [bodyText, setBodyText] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getManifest().then(m => {
      setRoutes(m.apiRoutes || []);
      if (m.apiRoutes?.[0]) {
        setSelected(m.apiRoutes[0]);
        setBodyText(JSON.stringify(m.apiRoutes[0].requestExample || {}, null, 2));
      }
    });
  }, []);

  async function send() {
    if (!selected) return;
    setLoading(true); setError(null); setResponse(null);
    try {
      let body: any = undefined;
      if (selected.method !== "GET" && bodyText.trim()) body = JSON.parse(bodyText);
      const r = await callRoute(selected.method, selected.path, body);
      setResponse(r);
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold mb-6">API Explorer</h2>
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="bg-surface rounded-xl p-3 max-h-[80vh] overflow-auto">
          <h3 className="text-sm text-muted mb-2 px-2">Rutas ({routes.length})</h3>
          <ul className="space-y-1">
            {routes.map((rt: any) => (
              <li key={`${rt.method} ${rt.path}`}>
                <button onClick={() => { setSelected(rt); setBodyText(JSON.stringify(rt.requestExample || {}, null, 2)); setResponse(null); }}
                  className={`w-full text-left px-2 py-2 rounded text-sm flex items-center gap-2 hover:bg-bg ${selected?.path === rt.path && selected?.method === rt.method ? "bg-bg" : ""}`}>
                  <span className={`px-1.5 py-0.5 rounded font-mono text-xs ${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}`}>{rt.method}</span>
                  <span className="font-mono text-xs truncate">{rt.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          {selected ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded font-mono text-xs ${selected.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}`}>{selected.method}</span>
                <code className="font-mono">{selected.path}</code>
              </div>
              <p className="text-muted text-sm mb-4">{selected.summary}</p>
              {selected.method !== "GET" && (
                <div className="mb-4">
                  <label className="text-xs text-muted block mb-1">Body (JSON)</label>
                  <textarea value={bodyText} onChange={e => setBodyText(e.target.value)} rows={6} className="w-full bg-bg border border-muted/30 rounded p-3 font-mono text-xs" />
                </div>
              )}
              <button onClick={send} disabled={loading} className="bg-primary hover:bg-primary/90 disabled:opacity-50 px-5 py-2 rounded font-semibold">
                {loading ? "Enviando..." : "Send"}
              </button>
              {error && <p className="mt-4 text-red-400 text-sm">Error: {error}</p>}
              {response && (
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-2 text-xs">
                    <span className="text-muted">Status:</span>
                    <span className={`font-mono ${response.status >= 200 && response.status < 300 ? "text-primary" : "text-red-400"}`}>{response.status}</span>
                    <span className="text-muted ml-4">Latency:</span>
                    <span className="font-mono">{response.elapsedMs}ms</span>
                  </div>
                  <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-96">{JSON.stringify(response.data, null, 2)}</pre>
                </div>
              )}
            </>
          ) : <p className="text-muted">Selecciona una ruta</p>}
        </div>
      </div>
    </div>
  );
}
