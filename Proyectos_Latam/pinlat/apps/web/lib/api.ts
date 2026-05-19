export const API_BASE_URL =
  process.env.NEXT_PUBLIC_PINLAT_API_URL || "http://127.0.0.1:4103";

type FetchOptions = RequestInit & { cache?: RequestCache };

export async function apiFetch<T = any>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} para ${path}`);
  }

  return (await res.json()) as T;
}

// El servidor mock envuelve la respuesta en { project, route, summary, received, response }.
// Este helper extrae el payload util.
export async function apiData<T = any>(path: string, options: FetchOptions = {}): Promise<T> {
  const wrapped = await apiFetch<{ response: T }>(path, options);
  return wrapped.response;
}

// Paleta -> clases de gradiente para placeholders visuales.
export function paletteToGradient(palette?: string): string {
  switch (palette) {
    case "terracota":
      return "bg-gradient-to-br from-orange-400 via-terracota to-red-700";
    case "maiz":
      return "bg-gradient-to-br from-amber-200 via-maiz to-orange-500";
    case "verde-cafe":
      return "bg-gradient-to-br from-emerald-300 via-amber-700 to-stone-800";
    case "arena":
      return "bg-gradient-to-br from-amber-100 via-sand to-amber-300";
    case "fucsia":
      return "bg-gradient-to-br from-pink-300 via-fucsia to-purple-700";
    case "amarillo":
      return "bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600";
    case "coral":
      return "bg-gradient-to-br from-rose-300 via-coral to-orange-600";
    case "ocre":
      return "bg-gradient-to-br from-yellow-700 via-ocre to-amber-900";
    case "morado":
      return "bg-gradient-to-br from-violet-300 via-purple-500 to-indigo-800";
    case "limon":
      return "bg-gradient-to-br from-lime-200 via-lime-400 to-emerald-600";
    case "tierra":
      return "bg-gradient-to-br from-stone-300 via-amber-700 to-stone-800";
    case "arcoiris":
      return "bg-gradient-to-br from-pink-400 via-yellow-400 to-emerald-500";
    case "verde-piedra":
      return "bg-gradient-to-br from-emerald-200 via-stone-500 to-stone-800";
    case "verde-mate":
      return "bg-gradient-to-br from-lime-300 via-emerald-600 to-emerald-900";
    default:
      return "bg-gradient-to-br from-amber-200 via-orange-400 to-rose-500";
  }
}

// Altura pseudo-aleatoria pero estable, para masonry sin layout shift.
export function pseudoHeight(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const heights = [180, 220, 260, 300, 340, 380, 420];
  return heights[hash % heights.length];
}
