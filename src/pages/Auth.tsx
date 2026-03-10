import { useState } from "react";
import { useNavigate, Link } from "react-router";
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans text-gray-200">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-xl overflow-hidden p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-4 rounded-full ring-2 ring-primary/40">
              <FaTerminal className="text-primary text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dev Snippet Manager
          </h1>
          <p className="text-text-muted text-sm">
            {isLogin
              ? "Sign in to access your snippets."
              : "Create an account to save snippets."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#161823] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              placeholder="developer@example.com"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Password
              </label>
              {isLogin && (
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot?
                </Link>
              )}
            </div>
            <input
              type="password"
              required
              className="w-full bg-[#161823] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-border"></div>
          <span className="shrink-0 mx-4 text-text-muted text-xs uppercase font-medium">
            Or continue with
          </span>
          <div className="grow border-t border-border"></div>
        </div>

        <button
          type="button"
          className="w-full bg-[#242738] hover:bg-surface-hover border border-border text-gray-200 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaGithub className="text-lg" />
          GitHub
        </button>

        <p className="text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
