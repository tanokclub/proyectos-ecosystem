import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Home, Languages, MessageCircle, Mic, History } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TraduceLA | Traductor conversacional LATAM",
  description:
    "Traduce texto y conversaciones entre variantes regionales de Latinoamerica (espanol, portugues, quechua, guarani, aimara y mas).",
};

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/historial", label: "Historial", icon: History },
  { href: "/conversacion", label: "Conversacion", icon: MessageCircle },
  { href: "/dialectos", label: "Dialectos", icon: Mic },
  { href: "/idiomas", label: "Idiomas", icon: Languages },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-ink min-h-screen`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <nav className="w-20 xl:w-64 flex flex-col justify-between py-5 px-3 border-r border-border bg-surface sticky top-0">
            <div className="flex flex-col space-y-1">
              <Link href="/" className="flex items-center gap-3 px-3 py-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="hidden xl:flex flex-col leading-tight">
                  <span className="font-bold text-base">TraduceLA</span>
                  <span className="text-xs text-secondary">LATAM beta</span>
                </div>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-ink hover:bg-muted transition group"
                  >
                    <Icon
                      size={22}
                      className="text-secondary group-hover:text-teal-600 transition"
                    />
                    <span className="hidden xl:block text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="hidden xl:flex items-center gap-3 p-3 rounded-xl bg-muted">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                T
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Usuario LATAM</p>
                <p className="text-xs text-secondary">demo@traducela.lat</p>
              </div>
            </div>
          </nav>

          {/* Main */}
          <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto no-scrollbar">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
