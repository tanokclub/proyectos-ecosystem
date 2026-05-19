import { Sparkles } from "lucide-react";
import TextTranslator from "@/components/TextTranslator";
import { api, type Language } from "@/lib/api";

async function getLanguages(): Promise<Language[]> {
  try {
    const data = await api.languages();
    return data.items || [];
  } catch (err) {
    console.error("[traduceLA] no se pudo cargar /languages", err);
    return [
      { code: "es-MX", name: "Espanol (Mexico)", flag: "MX", family: "es" },
      { code: "en-US", name: "Ingles (EE.UU.)", flag: "US", family: "en" },
    ];
  }
}

export default async function HomePage() {
  const languages = await getLanguages();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background/85 backdrop-blur-md z-10 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Traductor de texto
              <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                Beta
              </span>
            </h1>
            <p className="text-sm text-secondary mt-0.5">
              Convierte entre variantes regionales de LATAM con deteccion automatica.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-secondary">
            <Sparkles size={14} className="text-teal-600" />
            Mock API local en puerto 4104
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="px-6 py-6 max-w-5xl w-full mx-auto">
        <TextTranslator initialLanguages={languages} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Variantes LATAM"
            body="Soporta 13 codigos de idioma incluyendo quechua, guarani y aimara."
          />
          <FeatureCard
            title="Dialectos regionales"
            body="Detecta paisa, rioplatense, nortenio, andino y caribenio."
          />
          <FeatureCard
            title="Modo conversacion"
            body="Sesion bilingue en tiempo real con burbujas tipo chat."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-ink mb-1">{title}</h3>
      <p className="text-xs text-secondary leading-relaxed">{body}</p>
    </div>
  );
}
