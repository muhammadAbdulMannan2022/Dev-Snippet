import { Link } from "react-router";
import { FaSearch, FaPlus, FaBell, FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, profile, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm shrink-0 sticky top-0 z-20 flex items-center justify-between px-4 md:px-6">
      
      <div className="flex items-center md:hidden mr-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-[var(--color-text-muted)] hover:text-white rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
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
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 shadow-md shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 whitespace-nowrap"
        >
          <FaPlus />
          <span className="hidden sm:inline">New Snippet</span>
        </Link>
        
        <div className="w-px h-6 bg-[var(--color-border)] mx-2"></div>
        
        <button className="text-[var(--color-text-muted)] hover:text-white transition-colors relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-[var(--color-surface)]"></span>
          </span>
        </button>

        <div className="relative ml-2" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-full"
          >
            <img 
              src={profile?.image || user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email || 'user'}`} 
              alt="User Avatar" 
              className="w-9 h-9 rounded-full ring-2 ring-[var(--color-border)] group-hover:ring-[var(--color-primary)] transition-all bg-[var(--color-surface-hover)] object-cover"
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                <div className="px-4 py-2 border-b border-[var(--color-border)] mb-1">
                  <p className="text-sm font-semibold text-white">{profile?.name || user?.user_metadata?.name || 'Developer'}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{user?.email}</p>
                </div>
                <Link to="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors">
                  <FaUser className="text-[var(--color-text-muted)]" /> Profile
                </Link>
                <Link to="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-primary)] transition-colors">
                  <FaCog className="text-[var(--color-text-muted)]" /> Settings
                </Link>
                <div className="h-px bg-[var(--color-border)] my-1"></div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <FaSignOutAlt className="text-red-400" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
