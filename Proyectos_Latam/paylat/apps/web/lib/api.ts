export const API_BASE = process.env.NEXT_PUBLIC_PAYLAT_API ?? "http://127.0.0.1:4102";

export async function apiFetch<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    throw new Error(`PayLat API ${res.status}: ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export type GatewayEnvelope<T> = {
  project: string;
  route: string;
  summary: string;
  received: unknown;
  response: T;
};

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "USD" ? 2 : 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}
