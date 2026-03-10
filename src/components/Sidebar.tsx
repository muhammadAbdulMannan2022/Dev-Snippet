import { NavLink } from "react-router";
import { FaTerminal, FaCode, FaRegUser, FaGlobe, FaRegHeart, FaCog, FaTimes } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { label: "All Snippets", path: "/dashboard", icon: <FaCode /> },
    { label: "My Snippets", path: "/dashboard/my-snippets", icon: <FaRegUser /> },
    { label: "Public Snippets", path: "/dashboard/public", icon: <FaGlobe /> },
    { label: "Favorites", path: "/dashboard/favorites", icon: <FaRegHeart /> },
    { label: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col h-full shadow-lg shrink-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border)]">
        <div className="flex items-center">
          <FaTerminal className="text-[var(--color-primary)] text-2xl mr-3" />
          <span className="font-bold text-lg tracking-wide text-white">Dev Snippet</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden text-[var(--color-text-muted)] hover:text-white"
        >
          <FaTimes />
        </button>
      </div>
      
      <nav className="flex-1 flex flex-col p-4 gap-2 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm group ${
                isActive
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm font-semibold"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`text-lg transition-transform ${isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-[var(--color-primary)]"}`}>
                  {item.icon}
                </div>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--color-border)]">
        <div className="bg-[#161823] p-4 rounded-xl shadow-inner flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-primary)]/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 blur-xl"></div>
          <p className="text-xs font-semibold text-gray-300 z-10">Pro Plan</p>
          <p className="text-[10px] text-[var(--color-text-muted)] z-10 leading-relaxed">Upgrade to unlock unlimited snippets & cloud sync.</p>
          <button className="mt-2 text-xs bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-1.5 rounded-md font-medium transition-colors z-10 w-full shadow-sm">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
