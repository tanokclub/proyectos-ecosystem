import { apiFetch, type GatewayEnvelope } from "@/lib/api";
import { TransferForm } from "./transfer-form";
import { CheckCircle2, Clock } from "lucide-react";

type Transfer = {
  id: string;
  alias: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | string;
  createdAt: string;
};

type RecentResponse = GatewayEnvelope<{ transfers: Transfer[] }>;

async function getRecentTransfers(): Promise<Transfer[]> {
  try {
    const data = await apiFetch<RecentResponse>("/api/v1/transfers/recent");
    return data.response.transfers;
  } catch (error) {
    console.error("[paylat-web] no se pudo cargar /api/v1/transfers/recent", error);
    return [];
  }
}

export default async function TransferenciasPage() {
  const transfers = await getRecentTransfers();

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <header>
        <h1 className="text-2xl font-bold">Transferencias</h1>
        <p className="text-muted text-sm mt-1">
          Envía dinero instantáneamente a cualquier alias PayLat de LATAM.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransferForm />

        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold mb-4">Recientes</h2>
          {transfers.length === 0 ? (
            <p className="text-sm text-muted">No hay transferencias para mostrar.</p>
          ) : (
            <ul className="divide-y divide-border">
              {transfers.map((t) => (
                <li key={t.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-sm font-bold uppercase">
                      {t.alias.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">@{t.alias}</p>
                      <p className="text-xs text-muted">
                        {new Date(t.createdAt).toLocaleString("es-CO", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: t.currency,
                        maximumFractionDigits: t.currency === "USD" ? 2 : 0,
                      }).format(t.amount)}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] mt-1 px-2 py-0.5 rounded-full ${
                        t.status === "completed"
                          ? "bg-primary/10 text-primary"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {t.status === "completed" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {t.status === "completed" ? "Completada" : "Pendiente"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
