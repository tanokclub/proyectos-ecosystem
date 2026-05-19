import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Home, Search, Bell, Mail, User, Hash, MoreHorizontal } from "lucide-react";
import { Trends } from "./components/Trends";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LatamaX | La red social de Latinoamérica",
  description: "Clon de Twitter/X enfocado en audiencias de Latinoamérica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <div className="max-w-7xl mx-auto flex h-screen overflow-hidden">
          {/* Sidebar Nav */}
          <nav className="w-20 xl:w-64 flex flex-col justify-between py-4 px-2 border-r border-surface sticky top-0">
            <div className="flex flex-col space-y-2">
              <div className="p-3 mb-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">L</span>
                </div>
              </div>
              <NavItem icon={<Home size={28} />} label="Inicio" active />
              <NavItem icon={<Hash size={28} />} label="Explorar" />
              <NavItem icon={<Bell size={28} />} label="Notificaciones" />
              <NavItem icon={<Mail size={28} />} label="Mensajes" />
              <NavItem icon={<User size={28} />} label="Perfil" />
            </div>
            <div className="flex items-center space-y-2 p-3 hover:bg-surface rounded-full cursor-pointer transition">
              <div className="w-10 h-10 bg-surface rounded-full" />
              <div className="hidden xl:block ml-3">
                <p className="font-bold text-sm">Latamax User</p>
                <p className="text-secondary text-xs">@latamax_oficial</p>
              </div>
              <MoreHorizontal className="hidden xl:block ml-auto text-secondary" size={18} />
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto border-r border-surface no-scrollbar">
            {children}
          </main>

          {/* Right Panel (Trends) */}
          <aside className="hidden lg:block w-80 xl:w-96 p-4 h-full overflow-y-auto no-scrollbar">
            <div className="bg-surface rounded-2xl p-4 sticky top-4 overflow-hidden">
              <h2 className="text-xl font-bold mb-4">Qué está pasando</h2>
              <Trends />
            </div>
            <div className="text-secondary text-xs p-4 flex flex-wrap gap-x-3 gap-y-1">
              <span>Condiciones de Servicio</span>
              <span>Política de Privacidad</span>
              <span>Accesibilidad</span>
              <span>Información de anuncios</span>
              <span>© 2026 LatamaX Corp.</span>
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center space-x-4 p-3 rounded-full cursor-pointer transition hover:bg-surface w-fit xl:w-full ${active ? 'font-bold' : ''}`}>
      {icon}
      <span className="hidden xl:block text-xl">{label}</span>
    </div>
  );
}
