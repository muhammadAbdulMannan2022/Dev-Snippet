import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaTerminal, FaEnvelope, FaKey, FaLock, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length > 3) setStep(3); // Mock verification
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 5) {
      setStep(4); // Success step
    } else {
      alert("Passwords must match and be at least 6 characters.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4 font-sans text-gray-200">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden p-8 space-y-8 relative">
        
        {step !== 4 && (
          <button 
            onClick={() => step === 1 ? navigate("/auth") : setStep((prev) => prev - 1 as 1|2|3)} 
            className="absolute top-6 left-6 text-[var(--color-text-muted)] hover:text-white transition-colors"
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Header */}
        <div className="text-center space-y-2 mt-4">
          <div className="flex justify-center mb-4">
            <div className="bg-[var(--color-primary)]/20 p-4 rounded-full ring-2 ring-[var(--color-primary)]/40">
              {step === 4 ? (
                <FaCheckCircle className="text-green-500 text-3xl" />
              ) : (
                <FaTerminal className="text-[var(--color-primary)] text-3xl" />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {step === 1 && "Forgot Password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
            {step === 4 && "All Done!"}
          </h1>
          <p className="text-[var(--color-text-muted)] text-sm">
            {step === 1 && "Enter your email to receive a reset code."}
            {step === 2 && `We sent a code to ${email}`}
            {step === 3 && "Create a new strong password."}
            {step === 4 && "Your password has been reset successfully."}
          </p>
        </div>

        {/* Form Steps */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-[var(--color-primary)]/20 shadow-lg"
            >
              Send Reset OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-1 text-center">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">One-Time Password</label>
              <div className="relative max-w-[200px] mx-auto">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input 
                  type="text" 
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-[#161823] border border-[var(--color-border)] rounded-lg pl-10 pr-4 py-3 text-center text-lg tracking-[0.5em] font-bold focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-mono"
                  placeholder="••••"
                  maxLength={6}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-[var(--color-primary)]/20 shadow-lg"
            >
              Verify OTP
            </button>
            <p className="text-center text-xs mt-4 text-[var(--color-text-muted)]">
              Didn't receive the code? <button type="button" className="text-[var(--color-primary)] hover:underline">Resend</button>
            </p>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[var(--color-primary)]/20 shadow-lg"
            >
              Reset Password
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="pt-4 animate-in fade-in zoom-in-95 duration-300">
            <Link 
              to="/auth" 
              className="w-full bg-[#242738] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-gray-200 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Back to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
