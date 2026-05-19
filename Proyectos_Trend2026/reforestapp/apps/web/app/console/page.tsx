"use client";
import { useState } from "react";
import { callRoute, getManifest, getHealth } from "@/lib/api";

const helpers = { callRoute, getManifest, getHealth };

export default function ConsolePage() {
  const [code, setCode] = useState('// Ejemplos:\n// await callRoute("GET", "/api/v1/metrics");\n// await callRoute("POST", "/api/v1/search", { query: "demo" });\n// await getManifest();\n\nawait callRoute("GET", "/api/v1/metrics");');
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true); setError(null); setOutput(null);
    try {
      const fn = new Function("callRoute", "getManifest", "getHealth", `return (async () => { return ${code.includes("await") || code.includes("return") ? code : "return " + code} })()`);
      const result = await fn(helpers.callRoute, helpers.getManifest, helpers.getHealth);
      setOutput(result);
    } catch (e: any) {
      setError(e.message);
    } finally { setRunning(false); }
  }

  return (
    <div className="max-w-5xl">
      <h2 className="text-3xl font-bold mb-2">Console</h2>
      <p className="text-muted mb-6">Helpers disponibles: <code className="text-primary">callRoute(method, path, body?)</code>, <code className="text-primary">getManifest()</code>, <code className="text-primary">getHealth()</code></p>
      <textarea value={code} onChange={e => setCode(e.target.value)} rows={10}
        className="w-full bg-surface border border-muted/30 rounded p-4 font-mono text-sm mb-4" />
      <button onClick={run} disabled={running} className="bg-primary hover:bg-primary/90 disabled:opacity-50 px-5 py-2 rounded font-semibold mb-4">
        {running ? "Ejecutando..." : "Run"}
      </button>
      {error && <pre className="bg-red-500/10 text-red-400 rounded p-4 text-xs mb-4 overflow-auto">{error}</pre>}
      {output !== null && (
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Output</h3>
          <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-[500px]">{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
