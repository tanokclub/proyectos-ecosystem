import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Map, Navigation, AlertTriangle, Activity, Plus, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "ViaLatin | Navegacion comunitaria para LATAM",
  description: "Rutas, trafico y reportes comunitarios estilo Waze para Latinoamerica.",
};

const nav = [
  { href: "/",           label: "Mapa",       icon: Map },
  { href: "/rutas",      label: "Rutas",      icon: Navigation },
  { href: "/incidentes", label: "Incidentes", icon: AlertTriangle },
  { href: "/trafico",    label: "Trafico",    icon: Activity },
  { href: "/reportar",   label: "Reportar",   icon: Plus },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans text-ink min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-20 xl:w-64 shrink-0 bg-navy-950/80 backdrop-blur-md border-r border-navy-700/60 flex flex-col">
            <div className="p-4 flex items-center gap-3 border-b border-navy-700/60">
              <div className="w-10 h-10 rounded-xl bg-amber-glow text-navy-950 grid place-items-center font-black shadow-lg shadow-amber-glow/20">
                <Compass size={22} />
              </div>
              <div className="hidden xl:block">
                <div className="font-bold tracking-tight">ViaLatin</div>
                <div className="text-xs text-muted">Comunidad LATAM</div>
              </div>
            </div>

            <nav className="flex-1 p-3 flex flex-col gap-1">
              {nav.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink/80 hover:bg-navy-800 hover:text-amber-glow transition-colors group"
                >
                  <Icon size={20} className="text-amber-glow/90 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:block text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-3 border-t border-navy-700/60 hidden xl:block">
              <div className="text-[11px] uppercase tracking-wider text-muted mb-1">Estado</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-ok animate-pulse" />
                Mock API :4106
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 flex flex-col">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-navy-950/70 border-b border-navy-700/60 px-6 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted uppercase tracking-wider">Plataforma</div>
                <div className="font-semibold">Navegacion comunitaria</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex text-xs px-2 py-1 rounded bg-navy-800 border border-navy-700 text-muted">
                  beta MVP
                </span>
                <div className="w-9 h-9 rounded-full bg-navy-700 grid place-items-center text-sm font-bold">VL</div>
              </div>
            </header>
            <div className="flex-1 p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
