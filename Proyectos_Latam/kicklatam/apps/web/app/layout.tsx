import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Home, Compass, Heart, Grid, Video, Search, Bell, User } from "lucide-react";

export const metadata: Metadata = {
  title: "KickLATAM | Streaming en vivo LATAM",
  description: "Plataforma de streaming en vivo para Latinoamerica: gaming, IRL, musica, esports y mas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-background text-white min-h-screen font-sans antialiased">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <nav className="w-16 lg:w-56 shrink-0 flex flex-col bg-surface border-r border-border">
            <Link href="/" className="flex items-center gap-2 px-4 py-4 border-b border-border">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-black font-black text-lg">K</div>
              <span className="hidden lg:block font-black tracking-tight text-lg">KickLATAM</span>
            </Link>
            <div className="flex-1 py-4 flex flex-col gap-1 px-2">
              <NavItem href="/" icon={<Home size={20} />} label="Inicio" />
              <NavItem href="/" icon={<Compass size={20} />} label="Explorar" />
              <NavItem href="/suscripciones" icon={<Heart size={20} />} label="Siguiendo" />
              <NavItem href="/categorias" icon={<Grid size={20} />} label="Categorias" />
              <NavItem href="/vod" icon={<Video size={20} />} label="VOD" />
            </div>
            <div className="hidden lg:block px-4 py-3 border-t border-border text-xs text-muted">
              <p>Mock gateway: <span className="text-accent">:4105</span></p>
              <p className="mt-1">v0.1.0 MVP</p>
            </div>
          </nav>

          {/* Main column */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top bar */}
            <header className="h-14 shrink-0 border-b border-border bg-background/80 backdrop-blur flex items-center px-4 gap-4">
              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="search"
                  placeholder="Buscar canales, categorias..."
                  className="w-full bg-surface border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-accent transition"
                />
              </div>
              <button className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-white transition">
                <Bell size={18} />
              </button>
              <Link
                href="/suscripciones"
                className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accentDark text-black font-bold px-4 py-2 rounded-md text-sm transition"
              >
                Suscribirse
              </Link>
              <div className="w-9 h-9 rounded-full bg-surfaceAlt border border-border flex items-center justify-center">
                <User size={16} className="text-muted" />
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/80 hover:bg-surfaceAlt hover:text-white transition"
    >
      <span className="shrink-0">{icon}</span>
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
}
