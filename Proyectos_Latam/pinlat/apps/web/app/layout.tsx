import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Search, Bell, MessageCircle, User } from "lucide-react";

export const metadata: Metadata = {
  title: "PinLat | Inspiracion visual de Latinoamerica",
  description:
    "Clon de Pinterest enfocado en estilos, sabores y paisajes LATAM. Descubre ideas, guarda pines y arma tableros.",
};

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/explorar", label: "Explorar" },
  { href: "/boards", label: "Tableros" },
  { href: "/crear", label: "Crear" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-sand">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-terracota whitespace-nowrap"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota text-cream">
                P
              </span>
              <span className="hidden sm:inline">PinLat</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 ml-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-full text-sm font-semibold text-ink hover:bg-sand transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex-1">
              <label className="relative block">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="search"
                  placeholder="Busca decoracion, recetas, destinos LATAM..."
                  className="w-full rounded-full bg-sand/60 pl-11 pr-4 py-2.5 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-terracota"
                />
              </label>
            </div>

            <div className="flex items-center gap-1">
              <IconButton label="Notificaciones">
                <Bell size={20} />
              </IconButton>
              <IconButton label="Mensajes">
                <MessageCircle size={20} />
              </IconButton>
              <IconButton label="Perfil">
                <User size={20} />
              </IconButton>
            </div>
          </div>

          <nav className="md:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-ink bg-sand/60 hover:bg-sand whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>

        <footer className="mx-auto max-w-7xl px-4 py-10 text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
          <span>© 2026 PinLat</span>
          <span>Hecho con cariño en LATAM</span>
          <span>Mock API · puerto 4103</span>
        </footer>
      </body>
    </html>
  );
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="p-2 rounded-full text-ink hover:bg-sand transition"
    >
      {children}
    </button>
  );
}
