import { useState, useEffect } from "react";
import SnippetCard from "../components/SnippetCard";
import type { Snippet } from "../data/mockData";
import { FaFilter, FaSortAmountDown, FaSpinner } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const searchQuery = searchParams.get("q") || "";
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      let query = supabase.from('snippets').select('*');
      
      if (location.pathname === '/dashboard/favorites') {
        query = query.eq('is_favorite', true);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,code_content.ilike.%${searchQuery}%`);
      }

      if (languageFilter !== "all") {
        query = query.eq('language', languageFilter);
      }
      
      if (sortBy === "oldest") {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === "a-z") {
        query = query.order('title', { ascending: true });
      } else {
        query = query.order('created_at', { ascending: false }); // newest
      }
      
      const { data, error } = await query;
      if (data && !error) {
        setSnippets(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchSnippets();
    }
  }, [location.pathname, user, searchQuery, languageFilter, sortBy]);

  const handleDelete = async (id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
    await supabase.from('snippets').delete().eq('id', id);
  };

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    // Optimistic update
    setSnippets(prev => 
      prev.map(s => s.id === id ? { ...s, is_favorite: !currentStatus } : s)
    );
    await supabase.from('snippets').update({ is_favorite: !currentStatus }).eq('id', id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            All Snippets
            <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm px-2.5 py-0.5 rounded-full font-medium ml-2 border border-[var(--color-primary)]/40">
              {snippets.length}
            </span>
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1 font-mono text-sm">Organize, discover, and share your code pieces.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            <select 
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="appearance-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] pl-9 pr-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
            >
              <option value="all">Languages</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="Rust">Rust</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Go">Go</option>
            </select>
          </div>
          
          <div className="relative group">
            <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] pl-9 pr-6 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A - Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-[var(--color-text-muted)]">
             <FaSpinner className="animate-spin text-3xl text-[var(--color-primary)] mb-4" />
             <p>Loading snippets...</p>
          </div>
        ) : (
          snippets.map((snippet) => (
            <SnippetCard 
              key={snippet.id} 
              snippet={snippet} 
              onDelete={handleDelete} 
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>
      
      {!loading && snippets.length === 0 && (
        <div className="text-center py-20 bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-2xl">
          <h2 className="text-xl font-semibold mb-2 text-white">No snippets found</h2>
          <p className="text-[var(--color-text-muted)] mb-6 text-sm">Create your first snippet to get started.</p>
        </div>
      )}
    </div>
  );
}
