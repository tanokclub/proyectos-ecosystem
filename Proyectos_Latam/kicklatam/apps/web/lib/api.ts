// Helper para consumir el mock gateway de KickLATAM
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:4105";

export type GatewayEnvelope<T> = {
  project: string;
  route: string;
  summary: string;
  received: unknown;
  response: T;
};

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as GatewayEnvelope<T>;
    return data.response;
  } catch (err) {
    console.error(`[KickLATAM api] GET ${path} fallo:`, err);
    return null;
  }
}

export async function apiPost<TBody, TRes>(path: string, body: TBody): Promise<TRes | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GatewayEnvelope<TRes>;
    return data.response;
  } catch (err) {
    console.error(`[KickLATAM api] POST ${path} fallo:`, err);
    return null;
  }
}

export type Stream = {
  id: string;
  title: string;
  viewers: number;
  language: string;
  category: string;
  streamer: string;
  country: string;
  thumbnailPalette: [string, string];
};

export type Category = {
  id: string;
  name: string;
  viewers: number;
  palette: [string, string];
};

export type Vod = {
  id: string;
  title: string;
  duration: string;
  views: number;
  streamer: string;
};

export type ChatMessage = {
  id: string;
  user: string;
  text: string;
  color?: string;
};

export const countryFlag: Record<string, string> = {
  MX: "MX", BR: "BR", AR: "AR", CO: "CO", CL: "CL",
  VE: "VE", PE: "PE", PR: "PR", CR: "CR", UY: "UY", EC: "EC"
};

export function formatViewers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
