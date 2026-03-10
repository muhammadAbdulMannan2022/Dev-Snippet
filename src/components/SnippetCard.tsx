import type { Snippet } from "../data/mockData";
import { Link, useNavigate } from "react-router";
import { FaCopy, FaEdit, FaTrash, FaLock, FaGlobeAmericas, FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface SnippetCardProps {
  snippet: Snippet;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string, currentStatus: boolean) => void;
}

export default function SnippetCard({ snippet, onDelete, onToggleFavorite }: SnippetCardProps) {
  const { user } = useAuth();
  const isOwner = snippet.user_id === user?.id;
  const navigate = useNavigate();

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code_content);
    // could add a toast here
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(confirm('Delete snippet?')){
       if(onDelete) onDelete(snippet.id);
    }
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(onToggleFavorite) onToggleFavorite(snippet.id, snippet.is_favorite);
  };

  return (
    <div onClick={() => navigate(`/dashboard/snippet/${snippet.id}`)} className="block group h-full cursor-pointer">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-md hover:shadow-xl hover:border-[var(--color-primary)]/50 transition-all flex flex-col h-[280px] overflow-hidden group-hover:-translate-y-1 relative">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="p-5 pb-3 flex justify-between items-start gap-3">
          <div className="w-full truncate">
            <h3 className="font-bold text-gray-100 text-lg truncate mb-1 pr-8">{snippet.title}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded-full font-mono font-bold tracking-wider ${
                snippet.language.toLowerCase() === 'typescript' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                snippet.language.toLowerCase() === 'javascript' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                snippet.language.toLowerCase() === 'css' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                snippet.language.toLowerCase() === 'rust' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              }`}>
                {snippet.language}
              </span>
              
              <div className="flex items-center gap-1 text-[var(--color-text-muted)] mt-0.5">
                {snippet.is_public ? (
                  <><FaGlobeAmericas className="text-[10px]" /> <span className="opacity-80">Public</span></>
                ) : (
                  <><FaLock className="text-[10px]" /> <span className="opacity-80">Private</span></>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 py-2 overflow-hidden relative group/code bg-[#161823]/50 border-y border-[var(--color-border)]/50 mx-2 rounded-md">
          <button 
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-[var(--color-surface)]/80 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-white transition-colors opacity-0 group-hover/code:opacity-100 z-10 backdrop-blur-sm shadow-sm"
            title="Copy code"
          >
            <FaCopy size={12} />
          </button>
          <pre className="text-xs font-mono text-[var(--color-text)] whitespace-pre-wrap overflow-hidden h-full text-ellipsis line-clamp-[6] opacity-80 group-hover/code:opacity-100 transition-opacity drop-shadow-sm pointer-events-none">
            {snippet.code_content.length > 200 ? snippet.code_content.slice(0, 200) + '\\n...' : snippet.code_content}
          </pre>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--color-surface)] to-transparent"></div>
        </div>

        <div className="p-4 pt-4 mt-auto flex justify-between items-center bg-[var(--color-surface)]">
          <div className="flex flex-wrap gap-1.5 truncate max-w-[60%]">
            {snippet.tags && snippet.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border)] px-2 py-1 rounded-md lowercase hover:bg-[var(--color-border)] transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
            {snippet.tags && snippet.tags.length > 3 && (
              <span className="text-[11px] text-[var(--color-text-muted)] flex items-center px-1">+{snippet.tags.length - 3}</span>
            )}
          </div>

          <div className="flex gap-2 isolate">
            <button 
              onClick={handleToggleFav}
              className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-pink-500 ${snippet.is_favorite ? 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20' : 'text-[var(--color-text-muted)] hover:text-pink-500 hover:bg-pink-500/10'}`}
              title={snippet.is_favorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              {snippet.is_favorite ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
            </button>
            {isOwner && (
              <>
                <Link 
                  to={`/dashboard/edit/${snippet.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
                  title="Edit Snippet"
                >
                  <FaEdit size={14} />
                </Link>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors focus:ring-2 focus:ring-red-500"
                  title="Delete Snippet"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
