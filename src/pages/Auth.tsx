import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { FaGithub, FaTerminal, FaSpinner } from "react-icons/fa";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
      // Effect hook relies on `user` context to safely handle redirect.
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      } else {
        if (!data.session) {
          setSuccessMsg("Success! Please check your email to verify your account before logging in.");
          setIsLogin(true);
          setPassword(""); // Clear password for safety
          setLoading(false);
        }
        // Effect hook relies on `user` context to safely handle redirect.
      }
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.origin + '/dashboard' }
    });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
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
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-sm text-center">
              {successMsg}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#161823] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
                placeholder="Developer Name"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#161823] border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <FaSpinner className="animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
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
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full bg-[#242738] hover:bg-surface-hover border border-border text-gray-200 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaGithub className="text-lg" />
          GitHub
        </button>

        <p className="text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
