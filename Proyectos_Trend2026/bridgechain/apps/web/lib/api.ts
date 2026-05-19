export const DEFAULT_API_BASE = "http://127.0.0.1:4263";

export function getApiBase() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("apiBase") || DEFAULT_API_BASE;
  }
  return DEFAULT_API_BASE;
}

export async function getManifest() {
  try {
    const r = await fetch(`${getApiBase()}/manifest`, { cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  } catch (e: any) {
    return { error: e.message, project: null, apiRoutes: [] };
  }
}

export async function getHealth() {
  try {
    const r = await fetch(`${getApiBase()}/health`, { cache: "no-store" });
    return r.json();
  } catch (e: any) {
    return { status: "down", error: e.message };
  }
}

export async function callRoute(method: string, path: string, body?: any) {
  const init: RequestInit = { method, cache: "no-store" };
  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    init.headers = { "content-type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const t0 = Date.now();
  const r = await fetch(`${getApiBase()}${path}`, init);
  const elapsed = Date.now() - t0;
  const data = await r.json();
  recordCall(method, path, r.status, elapsed);
  return { status: r.status, elapsedMs: elapsed, data };
}

export function recordCall(method: string, path: string, status: number, ms: number) {
  if (typeof window === "undefined") return;
  try {
    const k = "apiCalls";
    const list = JSON.parse(localStorage.getItem(k) || "[]");
    list.unshift({ at: Date.now(), method, path, status, ms });
    localStorage.setItem(k, JSON.stringify(list.slice(0, 200)));
  } catch {}
}

export function getCallHistory(): Array<{ at: number; method: string; path: string; status: number; ms: number }> {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("apiCalls") || "[]"); } catch { return []; }
}
