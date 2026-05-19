"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Send, Loader2, Play, Square } from "lucide-react";
import { api, type Language } from "@/lib/api";

type Speaker = "A" | "B";

type ChatMessage = {
  id: string;
  speaker: Speaker;
  text: string;
  translated?: string;
  detectedSource?: string;
  latencyMs?: number;
  createdAt: number;
};

export default function ConversacionPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [langA, setLangA] = useState<string>("es-MX");
  const [langB, setLangB] = useState<string>("pt-BR");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "creating" | "active">("idle");
  const [error, setError] = useState<string | null>(null);

  const [speaker, setSpeaker] = useState<Speaker>("A");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    api
      .languages()
      .then((data) => setLanguages(data.items || []))
      .catch((err) => console.error("[traduceLA] languages", err));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const labelA = useMemo(
    () => languages.find((l) => l.code === langA)?.name || langA,
    [languages, langA],
  );
  const labelB = useMemo(
    () => languages.find((l) => l.code === langB)?.name || langB,
    [languages, langB],
  );

  async function startSession() {
    setStatus("creating");
    setError(null);
    try {
      const res = await api.createSession(langA, langB);
      setSessionId(res.sessionId);
      setStatus("active");
      setMessages([]);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  function endSession() {
    setStatus("idle");
    setSessionId(null);
  }

  async function send() {
    if (!input.trim() || status !== "active" || sending) return;
    const source = speaker === "A" ? langA : langB;
    const target = speaker === "A" ? langB : langA;
    const draft: ChatMessage = {
      id: `m_${Date.now()}`,
      speaker,
      text: input.trim(),
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, draft]);
    setInput("");
    setSending(true);
    try {
      const res = await api.translateText({
        text: draft.text,
        source_lang: source,
        target_lang: target,
      });
      setMessages((m) =>
        m.map((it) =>
          it.id === draft.id
            ? {
                ...it,
                translated: res.translatedText,
                detectedSource: res.detectedSource,
                latencyMs: res.latencyMs,
              }
            : it,
        ),
      );
      setSpeaker((s) => (s === "A" ? "B" : "A"));
    } catch (err) {
      setMessages((m) =>
        m.map((it) =>
          it.id === draft.id
            ? { ...it, translated: "(error al traducir)" }
            : it,
        ),
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background/85 backdrop-blur-md z-10 border-b border-border px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold">Modo conversacion</h1>
            <p className="text-sm text-secondary mt-0.5">
              Sesion bilingue con traduccion en tiempo real.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                status === "active"
                  ? "bg-teal-50 text-teal-700 border-teal-200"
                  : "bg-muted text-secondary border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "active" ? "bg-teal-500" : "bg-secondary/40"
                }`}
              />
              {status === "active"
                ? `Sesion ${sessionId} activa`
                : status === "creating"
                ? "Iniciando..."
                : "Sin sesion"}
            </span>
          </div>
        </div>
      </div>

      {/* Setup or chat */}
      {status !== "active" ? (
        <section className="px-6 py-8 max-w-2xl w-full mx-auto flex-1">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-base font-semibold mb-1">Configura los idiomas</h2>
            <p className="text-sm text-secondary mb-5">
              Cada participante hablara en uno de los dos idiomas seleccionados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LangPicker label="Participante A" value={langA} onChange={setLangA} languages={languages} accent="from-teal-500 to-teal-700" />
              <LangPicker label="Participante B" value={langB} onChange={setLangB} languages={languages} accent="from-slate-500 to-slate-700" />
            </div>
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
            <button
              onClick={startSession}
              disabled={status === "creating" || langA === langB}
              className="mt-6 w-full px-5 py-3 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-semibold shadow-sm hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {status === "creating" ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              Iniciar conversacion
            </button>
            {langA === langB && (
              <p className="text-xs text-amber-600 mt-2">
                Elige dos idiomas distintos para activar el modo conversacion.
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="flex-1 flex flex-col min-h-0">
          <div className="px-6 py-3 border-b border-border bg-surface/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                A: <strong className="text-ink">{labelA}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                B: <strong className="text-ink">{labelB}</strong>
              </span>
            </div>
            <button
              onClick={endSession}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-muted text-secondary font-medium"
            >
              <Square size={12} /> Terminar
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-3 no-scrollbar">
            {messages.length === 0 && (
              <p className="text-center text-sm text-secondary py-12">
                Aun no hay mensajes. Escribe el primero abajo.
              </p>
            )}
            {messages.map((m) => (
              <Bubble key={m.id} message={m} labelA={labelA} labelB={labelB} />
            ))}
          </div>

          <div className="border-t border-border bg-surface px-4 md:px-6 py-4">
            <div className="flex items-center gap-2 mb-2">
              <SpeakerToggle current={speaker} onChange={setSpeaker} labelA={labelA} labelB={labelB} />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                aria-label="Activar microfono (mock)"
                className="w-11 h-11 rounded-full border border-border bg-muted text-secondary inline-flex items-center justify-center hover:bg-teal-50 hover:text-teal-700 transition"
                title="Microfono mock"
              >
                <Mic size={18} />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={`Mensaje como ${speaker === "A" ? labelA : labelB}...`}
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition max-h-32"
              />
              <button
                onClick={send}
                disabled={!input.trim() || sending}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white inline-flex items-center justify-center shadow-sm hover:opacity-95 transition disabled:opacity-40"
                aria-label="Enviar"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Bubble({
  message,
  labelA,
  labelB,
}: {
  message: ChatMessage;
  labelA: string;
  labelB: string;
}) {
  const isA = message.speaker === "A";
  return (
    <div className={`flex ${isA ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[78%] flex flex-col gap-1">
        <span className={`text-[11px] text-secondary ${isA ? "ml-1" : "mr-1 self-end"}`}>
          {isA ? labelA : labelB}
        </span>
        <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${isA ? "bubble-a text-ink" : "bubble-b"}`}>
          <p className="text-[15px] leading-relaxed">{message.text}</p>
          {message.translated && (
            <p
              className={`mt-1.5 pt-1.5 border-t text-[13px] leading-relaxed ${
                isA ? "border-border/70 text-secondary" : "border-white/30 text-white/90"
              }`}
            >
              {message.translated}
            </p>
          )}
        </div>
        {message.latencyMs !== undefined && (
          <span className={`text-[10px] text-secondary ${isA ? "ml-1" : "mr-1 self-end"}`}>
            {message.detectedSource} - {message.latencyMs} ms
          </span>
        )}
      </div>
    </div>
  );
}

function SpeakerToggle({
  current,
  onChange,
  labelA,
  labelB,
}: {
  current: Speaker;
  onChange: (s: Speaker) => void;
  labelA: string;
  labelB: string;
}) {
  return (
    <div className="inline-flex p-1 rounded-full border border-border bg-muted text-xs">
      {(["A", "B"] as Speaker[]).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1.5 rounded-full font-medium transition ${
            current === s
              ? "bg-surface shadow-sm text-ink"
              : "text-secondary hover:text-ink"
          }`}
        >
          Hablar como {s} ({s === "A" ? labelA : labelB})
        </button>
      ))}
    </div>
  );
}

function LangPicker({
  label,
  value,
  onChange,
  languages,
  accent,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  languages: Language[];
  accent: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
        {label}
      </span>
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 w-1.5 rounded-l-xl bg-gradient-to-b ${accent}`} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-surface pl-5 pr-10 py-3 text-sm font-medium text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
        >
          {languages.length === 0 && <option value={value}>{value}</option>}
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name} ({l.code})
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
