"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";

type CreateResult = {
  id: string;
  status: string;
  indexed: boolean;
};

export default function CrearPinPage() {
  const [title, setTitle] = useState("");
  const [boardId, setBoardId] = useState("board_1");
  const [status, setStatus] = useState<
    "idle" | "saving" | "ok" | "error"
  >("idle");
  const [result, setResult] = useState<CreateResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    setStatus("saving");
    setErrorMsg("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/pins`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, boardId }),
      });

      if (!res.ok) {
        throw new Error(`API ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.response as CreateResult);
      setStatus("ok");
      setTitle("");
    } catch (error: any) {
      setErrorMsg(error?.message ?? "Error desconocido");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Crear pin</h1>
        <p className="text-sm text-muted mt-1">
          Sube una idea y guardala en tu tablero favorito.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white border border-sand p-6 shadow-sm flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Titulo del pin</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Sala minimalista con textiles wayuu"
            className="rounded-xl border border-sand bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracota"
            required
            minLength={3}
            maxLength={120}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Tablero</span>
          <select
            value={boardId}
            onChange={(e) => setBoardId(e.target.value)}
            className="rounded-xl border border-sand bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracota"
          >
            <option value="board_1">Recetas latinas</option>
            <option value="board_2">Viajes en Sudamerica</option>
            <option value="board_3">Hogar calido LATAM</option>
            <option value="board_4">Moda andina contemporanea</option>
            <option value="board_5">Artesanias y textiles</option>
            <option value="board_6">Cafes con encanto</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-terracota px-5 py-2.5 text-sm font-bold text-white hover:bg-terracota/90 transition disabled:opacity-60"
        >
          {status === "saving" ? "Publicando..." : "Crear pin"}
        </button>

        {status === "ok" && result ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-900">
            Pin creado con id <code>{result.id}</code> (estado:{" "}
            <strong>{result.status}</strong>,
            {" "}indexado: {result.indexed ? "si" : "no"}).
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-900">
            No pudimos crear el pin: {errorMsg}
          </div>
        ) : null}
      </form>
    </div>
  );
}
