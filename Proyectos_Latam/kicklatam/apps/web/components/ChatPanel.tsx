"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { apiPost, type ChatMessage } from "@/lib/api";

type Props = {
  streamerId: string;
  initialMessages: ChatMessage[];
};

export default function ChatPanel({ streamerId, initialMessages }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);

    const optimistic: ChatMessage = {
      id: `local_${Date.now()}`,
      user: "tu_usuario",
      text,
      color: "#53fc18",
    };
    setMessages((m) => [...m, optimistic]);
    setInput("");

    const res = await apiPost<{ streamerId: string; message: string }, { status: string; id: string }>(
      "/api/v1/chat/send",
      { streamerId, message: text }
    );

    if (res?.id) {
      setMessages((m) =>
        m.map((msg) => (msg.id === optimistic.id ? { ...msg, id: res.id } : msg))
      );
    }
    setSending(false);
  }

  return (
    <aside className="w-full lg:w-80 xl:w-96 shrink-0 border-l border-border bg-surface flex flex-col h-full">
      <header className="h-12 border-b border-border flex items-center justify-center text-sm font-semibold uppercase tracking-wider">
        Chat del stream
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="text-sm leading-snug">
            <span className="font-bold mr-1" style={{ color: m.color || "#53fc18" }}>
              {m.user}:
            </span>
            <span className="text-white/90">{m.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Envia un mensaje..."
          className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="bg-accent hover:bg-accentDark disabled:opacity-40 text-black font-bold px-3 rounded-md transition flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </form>
    </aside>
  );
}
