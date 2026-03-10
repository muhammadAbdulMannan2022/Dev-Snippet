import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Initialize the session from localStorage on mount.
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (mounted) {
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        setLoading(false); // Make sure the app renders immediately.
        
        // Load data in the background.
        if (initialSession?.user) {
          saveUserToDb(initialSession.user);
          fetchProfile(initialSession.user);
        }
      }
    });

    // 2. Listen for auth changes (login, logout, token refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          saveUserToDb(newSession.user);
          fetchProfile(newSession.user);
        } else {
          setProfile(null);
        }
        setLoading(false); // Failsafe.
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const saveUserToDb = async (user: User) => {
    const { email, id, user_metadata } = user;
    const name = user_metadata?.name || user_metadata?.full_name || email?.split('@')[0];
    const image = user_metadata?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=6366f1`;

    // Upsert user to the public "users" table
    const { error } = await supabase.from('users').upsert([
      { id, email, name, image }
    ], { onConflict: 'id' });

    if (error) {
       console.error("Error saving user to DB (Make sure you have a `users` table created in Supabase with id, email, name, image fields):", error.message);
    }
  };

  const fetchProfile = async (user: User) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
    if (!error && data) {
      setProfile(data);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
