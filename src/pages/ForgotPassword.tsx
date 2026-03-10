import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaTerminal, FaEnvelope, FaLock, FaArrowLeft, FaCheckCircle, FaSpinner } from "react-icons/fa";
import supabase from "../lib/supabase";

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is arriving from a password reset email link
    const hashParams = new URLSearchParams(location.hash.replace("#", "?"));
    if (hashParams.get("type") === "recovery" && hashParams.get("access_token")) {
      setStep(3);
    }
  }, [location]);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/forgot-password',
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setStep(2);
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSuccessMsg("Password updated successfully! Redirecting to login...");
      setLoading(false);
      await supabase.auth.signOut();
      setTimeout(() => navigate('/auth'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4 font-sans text-gray-200">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-8 space-y-8 relative">
        
        {step === 1 && (
          <button 
            onClick={() => navigate("/auth")} 
            className="absolute top-6 left-6 text-[var(--color-text-muted)] hover:text-white transition-colors"
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Header */}
        <div className="text-center space-y-2 mt-4">
          <div className="flex justify-center mb-4">
            <div className="bg-[var(--color-primary)]/20 p-4 rounded-full ring-2 ring-[var(--color-primary)]/40">
              {step === 2 ? (
                <FaCheckCircle className="text-green-500 text-3xl" />
              ) : (
                <FaTerminal className="text-[var(--color-primary)] text-3xl" />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Email Sent!"}
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            {step === 1 && "Enter your email to receive a password reset link."}
            {step === 2 && "We've sent a password reset link to your email address. Please check your inbox and click the link to continue."}
          </p>
        </div>

        {/* Form Steps */}
        {step === 1 && (
          <form onSubmit={handleSendResetEmail} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                {errorMsg}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
                  placeholder="developer@example.com"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-[var(--color-primary)]/20 shadow-lg disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Send Reset Link"}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="pt-4 animate-in fade-in zoom-in-95 duration-300">
            <Link 
              to="/auth" 
              className="w-full bg-[#242738] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-gray-200 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Back to Login
            </Link>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">New Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="space-y-1 pb-2">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading || successMsg !== ""} // Disable if success message is showing
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[var(--color-primary)]/20 shadow-lg disabled:opacity-50"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Update Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
