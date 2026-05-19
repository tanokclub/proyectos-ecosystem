import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  QrCode,
  LifeBuoy,
  Bell,
  Settings,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayLat | Neobanco LATAM",
  description: "Cuentas digitales, transferencias instantáneas, QR y tarjetas virtuales para LATAM.",
};

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/cuentas", label: "Cuentas", icon: Wallet },
  { href: "/transferencias", label: "Transferencias", icon: ArrowLeftRight },
  { href: "/tarjetas", label: "Tarjetas", icon: CreditCard },
  { href: "/qr", label: "Pagos QR", icon: QrCode },
  { href: "/soporte", label: "Soporte", icon: LifeBuoy },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-white min-h-screen`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <nav className="w-20 xl:w-72 flex flex-col justify-between py-6 px-3 xl:px-5 border-r border-border bg-surface/60 backdrop-blur-md">
            <div className="flex flex-col gap-1">
              <Link href="/" className="flex items-center gap-3 px-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-background font-black text-lg">P</span>
                </div>
                <div className="hidden xl:block">
                  <p className="font-bold text-lg leading-tight">PayLat</p>
                  <p className="text-muted text-xs">Neobanco LATAM</p>
                </div>
              </Link>
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-surface-2 transition"
                >
                  <Icon size={22} className="flex-shrink-0" />
                  <span className="hidden xl:block">{label}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-2 cursor-pointer transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center font-bold text-sm">
                PL
              </div>
              <div className="hidden xl:block flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">PayLat User</p>
                <p className="text-muted text-xs truncate">paylat@spheriq.co</p>
              </div>
              <Settings size={16} className="hidden xl:block text-muted" />
            </div>
          </nav>

          {/* Main */}
          <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto no-scrollbar">
            {/* Topbar */}
            <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-muted">PayLat</span>
                <span className="text-lg font-semibold">Tu dinero, sin fronteras</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-surface hover:bg-surface-2 flex items-center justify-center transition">
                  <Bell size={18} />
                </button>
                <button className="hidden md:inline-flex items-center gap-2 bg-primary text-background font-semibold px-4 py-2 rounded-full hover:bg-primary-dark transition">
                  Recargar saldo
                </button>
              </div>
            </header>

            <div className="flex-1 px-6 py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
