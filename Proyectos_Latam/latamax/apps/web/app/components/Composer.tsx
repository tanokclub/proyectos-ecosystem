"use client";

import { useState } from "react";
import { Image as ImageIcon, Smile, Calendar, MapPin } from "lucide-react";

export function Composer() {
  const [content, setContent] = useState("");
  const [lang, setLang] = useState("es-CO");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { id: string; status: string; moderation: string }>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:4101/api/v1/posts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content, lang })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data.response ?? data);
      setContent("");
    } catch (err: any) {
      setError(err?.message ?? "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  const charCount = content.length;
  const maxChars = 280;
  const over = charCount > maxChars;

  return (
    <div className="p-4 border-b border-surface flex space-x-4">
      <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0" />
      <div className="flex-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué está pasando en LATAM?"
          className="w-full bg-transparent text-xl border-none focus:ring-0 focus:outline-none resize-none min-h-[120px] placeholder:text-secondary"
        />
        <div className="flex justify-between items-center pt-3 border-t border-surface">
          <div className="flex space-x-3 text-primary">
            <button className="p-2 rounded-full hover:bg-primary/10 transition" aria-label="Imagen">
              <ImageIcon size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition" aria-label="Emoji">
              <Smile size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition" aria-label="Programar">
              <Calendar size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10 transition" aria-label="Ubicación">
              <MapPin size={18} />
            </button>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-secondary text-sm border border-surface rounded-full px-3 py-1 hover:bg-surface transition"
            >
              <option value="es-CO">es-CO</option>
              <option value="es-MX">es-MX</option>
              <option value="es-AR">es-AR</option>
              <option value="es-CL">es-CL</option>
              <option value="es-PE">es-PE</option>
              <option value="pt-BR">pt-BR</option>
              <option value="en-US">en-US</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${over ? "text-red-500" : "text-secondary"}`}>
              {charCount}/{maxChars}
            </span>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || submitting || over}
              className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Enviando..." : "Postear"}
            </button>
          </div>
        </div>
        {result && (
          <div className="mt-3 p-3 rounded-lg bg-primary/10 text-primary text-sm">
            Post encolado · id <span className="font-mono">{result.id}</span> · moderación{" "}
            <span className="font-semibold">{result.moderation}</span>
          </div>
        )}
        {error && (
          <div className="mt-3 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}
