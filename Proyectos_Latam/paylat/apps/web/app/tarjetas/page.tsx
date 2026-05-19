import { CreditCard, Snowflake } from "lucide-react";
import { apiFetch, formatMoney, type GatewayEnvelope } from "@/lib/api";

type Card = {
  id: string;
  last4: string;
  brand: string;
  holder: string;
  status: "active" | "frozen" | string;
  limitMonthly: number;
};

type CardsResponse = GatewayEnvelope<{ cards: Card[] }>;

async function getCards(): Promise<Card[]> {
  try {
    const data = await apiFetch<CardsResponse>("/api/v1/cards");
    return data.response.cards;
  } catch (error) {
    console.error("[paylat-web] no se pudo cargar /api/v1/cards", error);
    return [];
  }
}

export default async function TarjetasPage() {
  const cards = await getCards();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">Tarjetas virtuales</h1>
        <p className="text-muted text-sm mt-1">
          Genera, congela y administra tus tarjetas para compras online y suscripciones.
        </p>
      </header>

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-6 text-muted text-sm">
          No se pudieron cargar las tarjetas. Verifica el api-gateway.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cards.map((card) => (
            <VirtualCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}

function VirtualCard({ card }: { card: Card }) {
  const isFrozen = card.status === "frozen";
  return (
    <article
      className={`relative rounded-2xl p-5 h-56 flex flex-col justify-between text-white shadow-xl overflow-hidden ${
        isFrozen
          ? "bg-gradient-to-br from-surface-2 to-surface border border-border"
          : "bg-gradient-to-br from-primary-dark via-primary to-accent"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-90">
          <CreditCard size={14} />
          PayLat {card.brand}
        </div>
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
            isFrozen ? "bg-white/10 text-white/80" : "bg-black/20 text-white"
          }`}
        >
          {isFrozen ? (
            <span className="inline-flex items-center gap-1">
              <Snowflake size={11} />
              Congelada
            </span>
          ) : (
            "Activa"
          )}
        </span>
      </div>
      <div>
        <p className="font-mono text-lg tracking-widest">
          •••• •••• •••• {card.last4}
        </p>
      </div>
      <div className="flex items-end justify-between text-xs">
        <div>
          <p className="opacity-75 uppercase tracking-widest text-[10px]">
            Titular
          </p>
          <p className="font-semibold">{card.holder}</p>
        </div>
        <div className="text-right">
          <p className="opacity-75 uppercase tracking-widest text-[10px]">
            Límite mensual
          </p>
          <p className="font-semibold">{formatMoney(card.limitMonthly, "COP")}</p>
        </div>
      </div>
    </article>
  );
}
