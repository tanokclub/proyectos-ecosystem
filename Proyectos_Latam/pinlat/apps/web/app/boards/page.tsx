import Link from "next/link";
import { apiData, paletteToGradient } from "@/lib/api";

type Board = {
  id: string;
  name: string;
  pinCount: number;
  cover?: string;
  owner?: string;
};

async function getBoards(): Promise<Board[]> {
  try {
    const data = await apiData<{ boards: Board[] }>("/api/v1/boards");
    return data?.boards ?? [];
  } catch (error) {
    console.error("[pinlat/web] boards error", error);
    return [];
  }
}

export default async function BoardsPage() {
  const boards = await getBoards();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Tableros destacados</h1>
          <p className="text-sm text-muted">
            Colecciones armadas por la comunidad PinLat.
          </p>
        </div>
        <Link
          href="/crear"
          className="rounded-full bg-terracota px-5 py-2 text-sm font-semibold text-white hover:bg-terracota/90 transition"
        >
          Crear pin
        </Link>
      </header>

      {boards.length === 0 ? (
        <p className="text-muted">No hay tableros disponibles ahora mismo.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}

function BoardCard({ board }: { board: Board }) {
  return (
    <article className="rounded-3xl bg-white shadow-sm border border-sand overflow-hidden hover:shadow-md transition">
      <div
        className={`h-44 ${paletteToGradient(board.cover)} grid grid-cols-3 gap-1 p-1`}
      >
        <div className="rounded-l-2xl bg-white/20" />
        <div className="bg-white/10" />
        <div className="rounded-r-2xl bg-white/30" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{board.name}</h2>
        <p className="text-xs text-muted mt-1">
          {board.pinCount} pines · {board.owner ?? "Equipo PinLat"}
        </p>
      </div>
    </article>
  );
}
