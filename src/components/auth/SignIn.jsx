import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowUpRight, LogIn, AlertCircle } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Sign In | Optima 2027";
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://optima2025-backend-b8hkdwa4gkfuhya6.centralindia-01.azurewebsites.net";
      const response = await fetch(`${baseUrl}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      login(data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Invalid email or password");
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
            Sign In
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2">
            Sign in to access your Optima ID, profile, and credentials.
          </p>
        </div>

        <div className="relative rounded-3xl bg-[#07070c]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@domain.com"
                className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono font-semibold uppercase text-zinc-400">
                  Password
                </label>
                <Link
                  to="/reset-password"
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your account password"
                className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider justify-center gap-2 uppercase shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 text-center text-xs text-zinc-400">
              Don't have an Optima ID yet?{" "}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold underline ml-1">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
