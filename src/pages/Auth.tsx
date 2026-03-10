import { useState } from "react";
import { useNavigate } from "react-router";
import { FaGithub, FaTerminal } from "react-icons/fa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock auth success: navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4 font-sans text-gray-200">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-[var(--color-primary)]/20 p-4 rounded-full ring-2 ring-[var(--color-primary)]/40">
              <FaTerminal className="text-[var(--color-primary)] text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Dev Snippet Manager</h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            {isLogin ? "Sign in to access your snippets." : "Create an account to save snippets."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
              placeholder="developer@example.com"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Password</label>
              {isLogin && <a href="#" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">Forgot?</a>}
            </div>
            <input 
              type="password" 
              required
              className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[var(--color-border)]"></div>
          <span className="flex-shrink-0 mx-4 text-[var(--color-text-muted)] text-xs uppercase font-medium">Or continue with</span>
          <div className="flex-grow border-t border-[var(--color-border)]"></div>
        </div>

        <button 
          type="button" 
          className="w-full bg-[#242738] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-gray-200 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaGithub className="text-lg" />
          GitHub
        </button>

        <p className="text-center text-sm text-[var(--color-text-muted)]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>

      </div>
    </div>
  );
}
