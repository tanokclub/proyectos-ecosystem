import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Telescope, FileText, Activity, BarChart3, Settings, Search, Terminal } from "lucide-react";

export const metadata = { title: "AireSensor", description: "Red IoT de sensores de calidad de aire en ciudades LATAM con alertas." };

const pages = [
  { href: "/", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/explorer", label: "API Explorer", Icon: Telescope },
  { href: "/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/search", label: "Buscar", Icon: Search },
  { href: "/console", label: "Console", Icon: Terminal },
  { href: "/plan", label: "Plan", Icon: FileText },
  { href: "/health", label: "Health", Icon: Activity },
  { href: "/settings", label: "Settings", Icon: Settings }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-white">
        <div className="flex h-screen">
          <nav className="w-64 border-r border-surface p-4 flex flex-col">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-primary">AireSensor</h1>
              <p className="text-xs text-muted mt-1">ClimateTech</p>
            </div>
            <ul className="flex-1 space-y-1">
              {pages.map(({ href, label, Icon }) => (
                <li key={href}><Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm"><Icon size={18}/>{label}</Link></li>
              ))}
            </ul>
            <div className="text-xs text-muted">
              <p>API: <span className="text-primary">:4232</span></p>
              <p>Web: <span className="text-primary">:3232</span></p>
            </div>
          </nav>
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
