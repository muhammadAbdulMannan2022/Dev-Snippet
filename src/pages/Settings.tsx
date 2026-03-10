import { useAuth } from "../context/AuthContext";
import supabase from "../lib/supabase";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

export default function Settings() {
  const { user, logout } = useAuth();
  
  const handleDeleteAccount = async () => {
    if (confirm("Are you absolutely sure you want to completely delete your account? This will wipe your profile and everything associated with it forever.")) {
      // Delete user's profile DB entry. Since you added "on delete cascade", this deletes all snippets too!
      await supabase.from('users').delete().eq('id', user?.id);
      
      // If there's an RPC implemented in the DB to delete auth identities, this attempts to fire it.
      await supabase.rpc('delete_user'); 
      
      // Boot them to the login screen
      await logout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm font-mono">Manage your preferences and account.</p>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 space-y-8">
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
          <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-red-500 flex items-center gap-2">
                <FaExclamationTriangle />
                Delete Account
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Permanently remove your personal account and all of its contents (snippets, favorites) from the platform. This action cannot be reversed.
              </p>
            </div>
            
            <button 
              onClick={handleDeleteAccount}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-auto border border-red-500/30 hover:border-red-500/50"
            >
              <FaTrash />
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
