import { ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";
import { apiFetch, formatMoney, type GatewayEnvelope } from "@/lib/api";

type Account = {
  currency: string;
  balance: number;
  available: number;
};

type AccountsResponse = GatewayEnvelope<{ accounts: Account[] }>;

async function getAccounts(): Promise<Account[]> {
  try {
    const data = await apiFetch<AccountsResponse>("/api/v1/accounts");
    return data.response.accounts;
  } catch (error) {
    console.error("[paylat-web] no se pudo cargar /api/v1/accounts", error);
    return [];
  }
}

export default async function DashboardPage() {
  const accounts = await getAccounts();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h1 className="text-2xl font-bold">Resumen de cuentas</h1>
          <span className="text-xs text-muted">Actualizado en vivo</span>
        </div>

        {accounts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-6 text-muted text-sm">
            No se pudo conectar al api-gateway. Verifica que esté corriendo en{" "}
            <code className="text-primary">http://127.0.0.1:4102</code>.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((acc) => (
              <article
                key={acc.currency}
                className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted text-xs uppercase tracking-widest">
                    <Wallet size={14} />
                    Cuenta {acc.currency}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    Activa
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Saldo disponible</p>
                  <p className="text-3xl font-bold tracking-tight">
                    {formatMoney(acc.available, acc.currency)}
                  </p>
                  <p className="text-xs text-muted mt-2">
                    Total: {formatMoney(acc.balance, acc.currency)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Movimientos recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Ingresos del mes"
            value={formatMoney(2_450_000, "COP")}
            icon={<ArrowDownLeft size={18} />}
            tone="text-accent"
          />
          <SummaryCard
            title="Gastos del mes"
            value={formatMoney(1_180_000, "COP")}
            icon={<ArrowUpRight size={18} />}
            tone="text-danger"
          />
          <SummaryCard
            title="Ahorro proyectado"
            value={formatMoney(1_270_000, "COP")}
            icon={<TrendingUp size={18} />}
            tone="text-primary"
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickLink href="/transferencias" label="Transferir" />
          <QuickLink href="/qr" label="Pagar con QR" />
          <QuickLink href="/tarjetas" label="Mis tarjetas" />
          <QuickLink href="/soporte" label="Soporte" />
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className={`flex items-center gap-2 text-xs ${tone} font-medium`}>
        {icon}
        <span className="uppercase tracking-widest">{title}</span>
      </div>
      <p className="mt-3 text-xl font-semibold">{value}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-xl border border-border bg-surface hover:bg-surface-2 px-4 py-5 text-sm font-medium text-center transition"
    >
      {label}
    </a>
  );
}
