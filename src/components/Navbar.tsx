import { Link } from "react-router";
import { FaSearch, FaPlus, FaBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm shrink-0 sticky top-0 z-20 flex items-center justify-between px-6">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search snippets (Cmd+K)" 
            className="w-full bg-[#161823] border border-[var(--color-border)] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all placeholder:text-[var(--color-text-muted)] font-mono text-gray-200"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard/new" 
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow-md shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40"
        >
          <FaPlus />
          <span>New Snippet</span>
        </Link>
        
        <div className="w-px h-6 bg-[var(--color-border)] mx-2"></div>
        
        <button className="text-[var(--color-text-muted)] hover:text-white transition-colors relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-[var(--color-surface)]"></span>
          </span>
        </button>

        <button className="flex items-center gap-2 group ml-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=6366f1" 
            alt="User Avatar" 
            className="w-9 h-9 rounded-full ring-2 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)] transition-all bg-[var(--color-surface-hover)]"
          />
        </button>
      </div>

    </header>
  );
}
