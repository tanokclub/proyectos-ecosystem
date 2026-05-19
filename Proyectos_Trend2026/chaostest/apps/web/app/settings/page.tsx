"use client";
import { useEffect, useState } from "react";
import { DEFAULT_API_BASE } from "@/lib/api";

export default function SettingsPage() {
  const [apiBase, setApiBase] = useState(DEFAULT_API_BASE);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiBase(localStorage.getItem("apiBase") || DEFAULT_API_BASE);
    const t = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(t);
    document.documentElement.classList.toggle("light", t === "light");
  }, []);

  function save() {
    localStorage.setItem("apiBase", apiBase);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function clearHistory() {
    localStorage.removeItem("apiCalls");
    alert("Historial limpiado");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <label className="text-xs text-muted block mb-2">API base URL</label>
        <input value={apiBase} onChange={e => setApiBase(e.target.value)} className="w-full bg-bg border border-muted/30 rounded p-3 font-mono text-sm" />
        <p className="text-xs text-muted mt-2">Default: <code>{DEFAULT_API_BASE}</code></p>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <label className="text-xs text-muted block mb-2">Theme</label>
        <div className="flex gap-2">
          <button onClick={() => setTheme("dark")} className={`px-4 py-2 rounded ${theme === "dark" ? "bg-primary text-white" : "bg-bg"}`}>Dark</button>
          <button onClick={() => setTheme("light")} className={`px-4 py-2 rounded ${theme === "light" ? "bg-primary text-white" : "bg-bg"}`}>Light</button>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <p className="text-sm mb-3">Limpiar historial de llamadas API guardado en localStorage</p>
        <button onClick={clearHistory} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded text-sm">Limpiar historial</button>
      </div>
      <button onClick={save} className="bg-primary hover:bg-primary/90 px-5 py-2 rounded font-semibold">Guardar</button>
      {saved && <span className="ml-3 text-primary text-sm">✓ Guardado</span>}
    </div>
  );
}
