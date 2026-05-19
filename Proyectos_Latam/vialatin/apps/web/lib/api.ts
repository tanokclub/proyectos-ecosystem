export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:4106";

export type Incident = {
  id: string;
  type: "accident" | "pothole" | "police" | "hazard" | "traffic";
  severity: "low" | "medium" | "high";
  city: string;
  country: string;
  lat: number;
  lng: number;
  reportedAt: string;
  votes: number;
};

export type TrafficZone = {
  id: string;
  area: string;
  level: "low" | "medium" | "high";
  etaImpact: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
};

export type RoutePlanResponse = {
  routeId: string;
  etaMinutes: number;
  distanceKm: number;
  warnings: string[];
  alternatives?: number;
};

type GatewayEnvelope<T> = {
  project: string;
  route: string;
  summary: string;
  received: unknown;
  response: T;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {})
    }
  });
  if (!res.ok) {
    throw new Error(`API ${path} ${res.status}`);
  }
  const data = (await res.json()) as GatewayEnvelope<T>;
  return data.response;
}

export async function getIncidents(): Promise<{ incidents: Incident[] }> {
  try {
    return await apiFetch<{ incidents: Incident[] }>("/api/v1/incidents");
  } catch (err) {
    console.error(err);
    return { incidents: [] };
  }
}

export async function getTraffic(): Promise<{ zones: TrafficZone[] }> {
  try {
    return await apiFetch<{ zones: TrafficZone[] }>("/api/v1/traffic");
  } catch (err) {
    console.error(err);
    return { zones: [] };
  }
}

export async function getCities(): Promise<{ cities: City[] }> {
  try {
    return await apiFetch<{ cities: City[] }>("/api/v1/cities");
  } catch (err) {
    console.error(err);
    return { cities: [] };
  }
}

export async function planRoute(payload: { from: string; to: string }): Promise<RoutePlanResponse> {
  return apiFetch<RoutePlanResponse>("/api/v1/routes/plan", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function postReport(payload: {
  type: string;
  lat: number;
  lng: number;
  description?: string;
}): Promise<{ status: string; review: string }> {
  return apiFetch<{ status: string; review: string }>("/api/v1/reports", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
