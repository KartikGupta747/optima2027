import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowUpRight, CheckCircle2, AlertCircle, ShieldCheck, UserPlus } from "lucide-react";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const caID = searchParams.get("caID");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    college: "",
    city: "",
    age: "",
    state: "",
    gender: "",
    yearOfStudy: "",
    campusAmbassadorId: caID || "",
    isFromIITKGP: false,
  });

  useEffect(() => {
    document.title = "Register | Optima 2027";
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
      ...(e.target.name === "isFromIITKGP" && value
        ? { college: "IIT Kharagpur" }
        : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://optima2025-backend-b8hkdwa4gkfuhya6.centralindia-01.azurewebsites.net";
      const response = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          caID: formData.campusAmbassadorId || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((err) => err.msg).join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Registration failed");
      }

      login(data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An unexpected error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030305] text-white pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Sci-Fi Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#ff4500]/12 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 bg-cyan-400/12 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white">
            Register
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 max-w-md mx-auto leading-relaxed">
            Register for Optima 2027.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative rounded-3xl bg-[#07070c]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                Full Name <span className="text-[#ff4500]">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Swabhiman Nayak"
                className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                Email Address <span className="text-[#ff4500]">*</span>
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

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Password <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Confirm Password <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Phone Number <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Age <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  min="14"
                  max="45"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* IIT KGP Checkbox */}
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04] transition-colors select-none">
              <input
                type="checkbox"
                name="isFromIITKGP"
                checked={formData.isFromIITKGP}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#ff4500] focus:ring-[#ff4500] bg-black/60 border-white/20"
              />
              <span className="text-xs sm:text-sm text-zinc-300 font-medium">
                Currently studying at IIT Kharagpur
              </span>
            </label>

            {/* College & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  College / Institute <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Institute Name"
                  disabled={formData.isFromIITKGP}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  City <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Kolkata"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>
            </div>

            {/* State & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  State <span className="text-[#ff4500]">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. West Bengal"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Gender <span className="text-[#ff4500]">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                >
                  <option value="" className="bg-[#07070c] text-zinc-400">Select Gender</option>
                  <option value="male" className="bg-[#07070c] text-white">Male</option>
                  <option value="female" className="bg-[#07070c] text-white">Female</option>
                  <option value="other" className="bg-[#07070c] text-white">Other</option>
                </select>
              </div>
            </div>

            {/* Year of Study & CA ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Year of Study <span className="text-[#ff4500]">*</span>
                </label>
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  required
                >
                  <option value="" className="bg-[#07070c] text-zinc-400">Select Year</option>
                  <option value="1" className="bg-[#07070c] text-white">1st Year</option>
                  <option value="2" className="bg-[#07070c] text-white">2nd Year</option>
                  <option value="3" className="bg-[#07070c] text-white">3rd Year</option>
                  <option value="4" className="bg-[#07070c] text-white">4th Year</option>
                  <option value="5" className="bg-[#07070c] text-white">5th Year</option>
                  <option value="other" className="bg-[#07070c] text-white">Postgraduate / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase text-zinc-400 mb-1">
                  Campus Ambassador ID (Optional)
                </label>
                <input
                  type="text"
                  name="campusAmbassadorId"
                  value={formData.campusAmbassadorId}
                  onChange={handleChange}
                  placeholder="e.g. OP27CA-XXXX"
                  className="w-full px-4 py-3 bg-black/60 rounded-xl border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider justify-center gap-2 uppercase shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-zinc-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-cyan-400 hover:text-cyan-300 font-semibold underline ml-1">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
