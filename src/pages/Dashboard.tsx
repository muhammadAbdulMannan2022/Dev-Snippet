import { useState } from "react";
import SnippetCard from "../components/SnippetCard";
import { mockSnippets } from "../data/mockData";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";

export default function Dashboard() {
  const [snippets, setSnippets] = useState(mockSnippets);

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
          <button className="flex items-center gap-2 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <FaFilter className="text-[var(--color-text-muted)]" />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <FaSortAmountDown className="text-[var(--color-text-muted)]" />
            Sort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {snippets.map((snippet) => (
          <SnippetCard 
            key={snippet.id} 
            snippet={snippet} 
            onDelete={(id) => setSnippets(prev => prev.filter(s => s.id !== id))} 
          />
        ))}
      </div>
      
      {snippets.length === 0 && (
        <div className="text-center py-20 bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] rounded-2xl">
          <h2 className="text-xl font-semibold mb-2 text-white">No snippets found</h2>
          <p className="text-[var(--color-text-muted)] mb-6 text-sm">Create your first snippet to get started.</p>
        </div>
      )}
    </div>
  );
}
