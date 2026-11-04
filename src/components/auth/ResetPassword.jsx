import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://optima2025-backend-b8hkdwa4gkfuhya6.centralindia-01.azurewebsites.net";
      const response = await fetch(`${baseUrl}/user/password-reset-init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setUserId(data.userId);
      setShowOTPForm(true);
      setSuccess("OTP sent to your email. Please check your inbox or spam folder.");
    } catch (err) {
      setError(err.message || "Failed to initiate password reset");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://optima2025-backend-b8hkdwa4gkfuhya6.centralindia-01.azurewebsites.net";
      const response = await fetch(`${baseUrl}/user/password-reset-complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setSuccess("Password reset successful! Redirecting to sign in...");
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setError(err.message || "Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030305] text-white pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
      {/* Ambient Sci-Fi Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#ff4500]/12 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 bg-cyan-400/12 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2">
            {!showOTPForm
              ? "Enter your account email to receive a verification OTP."
              : "Enter the OTP received along with your new password."}
          </p>
        </div>

        <div className="relative rounded-3xl bg-[#07070c]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>{success}</div>
            </div>
          )}

          {!showOTPForm ? (
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="yourname@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs tracking-wider justify-center shadow-lg disabled:opacity-50"
              >
                <span>{isLoading ? "Transmitting..." : "Send Reset OTP"}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  One-Time Password (OTP)
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm font-mono tracking-widest transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs tracking-wider justify-center shadow-lg disabled:opacity-50"
              >
                <span>{isLoading ? "Updating..." : "Confirm New Password"}</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <Link
              to="/signin"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
            <Link to="/register" className="text-accent-brand hover:underline">
              New Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
