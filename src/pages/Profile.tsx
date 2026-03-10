import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, profile } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Your Profile</h1>
        <p className="text-[var(--color-text-muted)] mt-1 text-sm font-mono">View your personal information.</p>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 flex flex-col items-center sm:flex-row sm:items-start gap-8">
         <img 
            src={profile?.image || user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email || 'user'}`} 
            alt="User Avatar" 
            className="w-32 h-32 rounded-full ring-4 ring-[var(--color-primary)]/20 bg-[var(--color-surface-hover)] object-cover shadow-2xl"
         />
         <div className="flex-1 text-center sm:text-left mt-2 relative w-full space-y-6">
             
             <div>
               <h2 className="text-3xl font-bold text-white mb-2">{profile?.name || user?.user_metadata?.name || 'Developer'}</h2>
               <div className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs font-mono font-bold rounded-lg uppercase tracking-widest cursor-default">
                   Pro Member
               </div>
             </div>

             <div className="space-y-4 pt-4 border-t border-[var(--color-border)] w-full">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#161823] border border-[var(--color-border)] rounded-xl">
                 <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Email Address</span>
                 <span className="text-sm font-mono break-all text-gray-200">{user?.email}</span>
               </div>
               
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#161823] border border-[var(--color-border)] rounded-xl">
                 <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Unique ID</span>
                 <span className="text-xs font-mono break-all text-gray-500 truncate max-w-[200px]">{user?.id}</span>
               </div>
             </div>

         </div>
      </div>
    </div>
  );
}
