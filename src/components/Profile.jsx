import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  CreditCard,
  FileText,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Loading from "./design/Loading";
import { playClickTick } from "../utils/cyberAudio";

const Profile = () => {
  document.title = "Profile | Optima 2027";
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const { logout } = useAuth();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://optima2025-backend-b8hkdwa4gkfuhya6.centralindia-01.azurewebsites.net";
      const response = await fetch(`${baseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate("/signin");
        }
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCopyOPID = () => {
    if (userData?.OPID) {
      playClickTick();
      navigator.clipboard.writeText(userData.OPID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 bg-accent-brand/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="section-header mb-2">
              <span className="section-header-square" />
              <h1 className="section-header-text text-2xl sm:text-3xl">
                Participant Portal
              </h1>
            </div>
            <p className="text-text-secondary text-xs sm:text-sm font-sans">
              Welcome back, {userData?.fullName || "Delegate"}. View your registration credentials and status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 font-mono text-xs hover:bg-red-500/20 transition-all"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: ID Card & Status */}
          <div className="md:col-span-1 space-y-6">
            {/* OPID Identity Badge */}
            <div className="cad-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent-brand/10 border border-accent-brand/30 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-accent-brand" />
              </div>

              <h2 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                {userData?.fullName}
              </h2>
              <p className="text-xs text-text-secondary font-mono mt-0.5">
                {userData?.college}
              </p>

              {/* OPID Pill with Click to Copy */}
              <div className="mt-5 w-full pt-4 border-t border-border-subtle">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5">
                  Official Delegate OPID
                </span>
                <button
                  type="button"
                  onClick={handleCopyOPID}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-black/60 border border-accent-brand/40 hover:border-accent-brand text-accent-brand font-mono text-xs font-bold transition-all"
                >
                  <span>{userData?.OPID || "OP-2027-PENDING"}</span>
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                <span className="text-[10px] font-mono text-zinc-500 block mt-1">
                  {copied ? "Copied to clipboard!" : "Click to copy OPID"}
                </span>
              </div>
            </div>

            {/* Payment Status Card */}
            <div className="cad-card p-5">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-2">
                Registration &amp; Payment Status
              </span>

              {userData?.paymentStatus ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <CheckCircle2 size={16} />
                    <span>REGISTRATION COMPLETE</span>
                  </div>
                  <p className="text-xs text-text-secondary font-sans leading-snug">
                    Amount Paid: ₹{userData?.paymentAmount || "1200"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                    <Clock size={16} />
                    <span>PAYMENT INCOMPLETE</span>
                  </div>
                  <p className="text-xs text-text-secondary font-sans leading-snug">
                    Please complete registration payment to confirm campus access and accommodation.
                  </p>
                  <Link
                    to="/payment"
                    className="btn-primary w-full py-2 px-4 text-xs tracking-wider justify-center"
                  >
                    <span>Proceed to Payment</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Participant Details Grid */}
          <div className="md:col-span-2">
            <div className="cad-card p-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5">
                <h3 className="font-display text-base font-bold uppercase text-white tracking-wide">
                  Delegate Details
                </h3>
                <span className="font-mono text-xs text-accent-brand">
                  // CREDENTIALS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Email</span>
                  <span className="text-xs font-medium text-white truncate block">{userData?.email}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Phone</span>
                  <span className="text-xs font-medium text-white block">{userData?.phone}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">College / Institute</span>
                  <span className="text-xs font-medium text-white truncate block">{userData?.college}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">City &amp; State</span>
                  <span className="text-xs font-medium text-white block">{userData?.city}, {userData?.state}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Year of Study</span>
                  <span className="text-xs font-medium text-white block">{userData?.yearOfStudy || "N/A"}</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Gender &amp; Age</span>
                  <span className="text-xs font-medium text-white block">{userData?.gender ? userData.gender.toUpperCase() : "N/A"} · {userData?.age || "N/A"} yrs</span>
                </div>

                {userData?.caID && (
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 sm:col-span-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">Campus Ambassador Referral</span>
                    <span className="text-xs font-mono font-bold text-cyan-400 block">{userData.caID}</span>
                  </div>
                )}
              </div>

              {/* Quick Navigation Links */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <Link
                  to="/rules"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <FileText size={14} className="text-accent-brand" />
                  <span>View Accommodation Rules</span>
                </Link>

                <Link
                  to="/query-us"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <MessageSquare size={14} className="text-cyan-400" />
                  <span>Contact Organizing Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
