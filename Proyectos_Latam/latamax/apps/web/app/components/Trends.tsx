import { TrendingUp } from "lucide-react";

async function getTrends() {
  try {
    const res = await fetch("http://127.0.0.1:4101/api/v1/trends", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch trends");
    const data = await res.json();
    return data.response?.items ?? data.items ?? [];
  } catch (error) {
    return [];
  }
}

function formatPosts(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export async function Trends() {
  const items: { name: string; country: string; posts: number }[] = await getTrends();

  if (items.length === 0) {
    return <p className="text-secondary text-sm">No hay tendencias disponibles.</p>;
  }

  return (
    <ul className="flex flex-col -mx-4 -mb-4">
      {items.map((trend) => (
        <li
          key={trend.name}
          className="px-4 py-3 hover:bg-white/5 transition cursor-pointer flex justify-between items-start"
        >
          <div>
            <p className="text-secondary text-xs">Tendencia en {trend.country}</p>
            <p className="font-bold mt-1">{trend.name}</p>
            <p className="text-secondary text-xs mt-1">{formatPosts(trend.posts)} posts</p>
          </div>
          <TrendingUp size={16} className="text-secondary" />
        </li>
      ))}
    </ul>
  );
}
