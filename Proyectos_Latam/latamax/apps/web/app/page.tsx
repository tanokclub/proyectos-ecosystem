import { MessageSquare, Repeat2, Heart, Share, BarChart2 } from "lucide-react";
import { Composer } from "./components/Composer";

async function getFeed() {
  try {
    const res = await fetch('http://127.0.0.1:4101/api/v1/feed', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch feed');
    const data = await res.json();
    return data.response ?? data;
  } catch (error) {
    return { items: [] };
  }
}

export default async function HomePage() {
  const feed = await getFeed();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-surface p-4">
        <h1 className="text-xl font-bold">Inicio</h1>
        <div className="flex mt-4">
          <div className="flex-1 text-center font-bold pb-3 border-b-4 border-primary cursor-pointer hover:bg-surface transition">Para ti</div>
          <div className="flex-1 text-center text-secondary font-medium pb-3 cursor-pointer hover:bg-surface transition">Siguiendo</div>
        </div>
      </div>

      <Composer />

      {/* Feed */}
      <div className="flex flex-col">
        {feed.items && feed.items.length > 0 ? (
          feed.items.map((post: any) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className="p-8 text-center text-secondary">
            No hay posts para mostrar en este momento.
          </div>
        )}
      </div>
    </div>
  );
}

function Post({ post }: { post: any }) {
  return (
    <div className="p-4 border-b border-surface hover:bg-white/5 cursor-pointer transition flex space-x-3">
      <div className="w-12 h-12 bg-surface rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="font-bold hover:underline">{post.author.split('@')[1] || 'Usuario'}</span>
          <span className="text-secondary">{post.author}</span>
          <span className="text-secondary">· 2h</span>
        </div>
        <p className="mt-1 text-[15px]">{post.content}</p>
        <div className="flex justify-between mt-3 text-secondary max-w-md">
          <ActionIcon icon={<MessageSquare size={18} />} count="12" hoverColor="hover:text-primary hover:bg-primary/10" />
          <ActionIcon icon={<Repeat2 size={18} />} count="5" hoverColor="hover:text-green-500 hover:bg-green-500/10" />
          <ActionIcon icon={<Heart size={18} />} count="84" hoverColor="hover:text-pink-500 hover:bg-pink-500/10" />
          <ActionIcon icon={<BarChart2 size={18} />} count="1.2k" hoverColor="hover:text-primary hover:bg-primary/10" />
          <ActionIcon icon={<Share size={18} />} hoverColor="hover:text-primary hover:bg-primary/10" />
        </div>
      </div>
    </div>
  );
}

function ActionIcon({ icon, count, hoverColor }: { icon: React.ReactNode, count?: string, hoverColor: string }) {
  return (
    <div className={`flex items-center space-x-2 group transition cursor-pointer`}>
      <div className={`p-2 rounded-full transition ${hoverColor}`}>
        {icon}
      </div>
      {count && <span className="text-xs group-hover:underline">{count}</span>}
    </div>
  );
}
