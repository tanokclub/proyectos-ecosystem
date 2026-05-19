"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Languages as LangIcon, Loader2, Sparkles } from "lucide-react";
import { api, type Language, type TranslateResponse } from "@/lib/api";

type Props = {
  initialLanguages: Language[];
};

export default function TextTranslator({ initialLanguages }: Props) {
  const [languages] = useState<Language[]>(initialLanguages);
  const [source, setSource] = useState<string>(
    initialLanguages.find((l) => l.code === "es-CO")?.code || initialLanguages[0]?.code || "es-MX",
  );
  const [target, setTarget] = useState<string>(
    initialLanguages.find((l) => l.code === "en-US")?.code || initialLanguages[1]?.code || "en-US",
  );
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sourceLabel = useMemo(
    () => languages.find((l) => l.code === source)?.name || source,
    [languages, source],
  );
  const targetLabel = useMemo(
    () => languages.find((l) => l.code === target)?.name || target,
    [languages, target],
  );

  function swap() {
    setSource(target);
    setTarget(source);
    setResult(null);
  }

  async function onTranslate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.translateText({
        text,
        source_lang: source,
        target_lang: target,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Language pickers + swap */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3">
        <LanguageSelect
          label="De"
          value={source}
          onChange={setSource}
          languages={languages}
        />
        <button
          onClick={swap}
          aria-label="Intercambiar idiomas"
          className="self-end md:self-center mb-1 md:mb-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface hover:bg-muted transition shadow-sm"
        >
          <ArrowLeftRight size={18} className="text-teal-700" />
        </button>
        <LanguageSelect
          label="A"
          value={target}
          onChange={setTarget}
          languages={languages}
        />
      </div>

      {/* Input / output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
              {sourceLabel}
            </span>
            <span className="text-xs text-secondary">{text.length} car.</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe lo que quieras traducir..."
            className="w-full min-h-[180px] resize-none bg-transparent outline-none text-lg leading-relaxed placeholder:text-secondary/60"
          />
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-teal-50 to-white p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {targetLabel}
            </span>
            {result && (
              <span className="text-[11px] text-secondary inline-flex items-center gap-1">
                <Sparkles size={12} className="text-teal-600" />
                {result.latencyMs} ms
              </span>
            )}
          </div>
          <div className="flex-1 min-h-[180px] text-lg leading-relaxed text-ink">
            {loading && (
              <span className="inline-flex items-center gap-2 text-secondary">
                <Loader2 size={16} className="animate-spin" /> Traduciendo...
              </span>
            )}
            {!loading && !result && !error && (
              <span className="text-secondary/70">La traduccion aparecera aqui.</span>
            )}
            {!loading && result && <span>{result.translatedText}</span>}
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </div>
          {result && (
            <div className="mt-3 pt-3 border-t border-border/70 text-xs text-secondary flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <LangIcon size={12} /> Detectado:{" "}
                <strong className="text-ink font-medium">
                  {result.detectedSource}
                </strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => {
            setText("");
            setResult(null);
            setError(null);
          }}
          className="px-4 py-2 rounded-full border border-border bg-surface text-sm font-medium text-ink hover:bg-muted transition"
        >
          Limpiar
        </button>
        <button
          onClick={onTranslate}
          disabled={loading || !text.trim()}
          className="px-6 py-2.5 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white text-sm font-semibold shadow-sm hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          Traducir
        </button>
      </div>
    </div>
  );
}

function LanguageSelect({
  label,
  value,
  onChange,
  languages,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  languages: Language[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 pr-10 text-sm font-medium text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name} ({l.code})
            </option>
          ))}
        </select>
        <LangIcon
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
        />
      </div>
    </label>
  );
}
