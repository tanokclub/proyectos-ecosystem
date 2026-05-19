export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:4104";

export type Language = {
  code: string;
  name: string;
  flag: string;
  family: string;
};

export type Dialect = {
  code: string;
  name: string;
  region: string;
  baseLang: string;
  description: string;
};

export type HistoryItem = {
  id: string;
  input: string;
  output: string;
  sourceLang?: string;
  targetLang?: string;
  createdAt?: string;
};

export type TranslatePayload = {
  text: string;
  source_lang: string;
  target_lang: string;
};

export type TranslateResponse = {
  translatedText: string;
  detectedSource: string;
  latencyMs: number;
};

type Envelope<T> = {
  project: string;
  route: string;
  summary: string;
  received: unknown;
  response: T;
};

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    headers: { "content-type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API ${path} -> ${res.status}`);
  }
  const data = (await res.json()) as Envelope<T> | T;
  if (data && typeof data === "object" && "response" in (data as object)) {
    return (data as Envelope<T>).response;
  }
  return data as T;
}

export const api = {
  languages: () => call<{ items: Language[] }>("/api/v1/languages"),
  dialects: () => call<{ items: Dialect[] }>("/api/v1/dialects"),
  history: () => call<{ items: HistoryItem[] }>("/api/v1/history"),
  translateText: (payload: TranslatePayload) =>
    call<TranslateResponse>("/api/v1/translate/text", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  createSession: (langA: string, langB: string) =>
    call<{ sessionId: string; status: string }>("/api/v1/conversation/session", {
      method: "POST",
      body: JSON.stringify({ langA, langB }),
    }),
  translateVoice: (payload: { audioBase64: string; source_lang: string; target_lang: string }) =>
    call<{
      transcript: string;
      translatedText: string;
      detectedSource: string;
      confidence: number;
      latencyMs: number;
    }>("/api/v1/translate/voice", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
