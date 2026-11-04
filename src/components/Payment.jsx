import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { benefitsForParticipants, payment } from "../constants/Rules";
import { useAuth } from "../context/AuthContext";
import Loading from "./design/Loading";
import { playClickTick } from "../utils/cyberAudio";

const Payment = () => {
  document.title = "Payment & Registration Fee | Optima 2027";

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      if (data.paymentStatus) {
        navigate("/profile");
      }
      setUserData(data);
    } catch (err) {
      setError(err.message || "Failed to load payment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const paymentFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdzfCEholwyzqmtr3PrZbUI3sVF2wXmvFVFkR_3esQPus-nSg/viewform?usp=pp_url&entry.457358849=${encodeURIComponent(
    userData?.fullName || ""
  )}&entry.1494407877=${encodeURIComponent(
    userData?.email || ""
  )}&entry.1954823963=${encodeURIComponent(
    userData?.phone || ""
  )}&entry.878903541=${encodeURIComponent(
    userData?.college || ""
  )}&entry.1033247168=${encodeURIComponent(
    userData?.city || ""
  )}&entry.848564609=${encodeURIComponent(
    userData?.OPID || ""
  )}&entry.1961204696=${encodeURIComponent(
    userData?.caID || ""
  )}`;

  return (
    <main className="min-h-screen bg-bg-base text-text-primary pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 bg-accent-brand/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="section-header mb-2">
            <span className="section-header-square" />
            <h1 className="section-header-text text-2xl sm:text-3xl lg:text-4xl">
              Registration Fee &amp; Payment
            </h1>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
            Confirm your participation for Optima 2027 at IIT Kharagpur. Choose between full on-campus delegate pass with accommodation or events-only access.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pricing Plans (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: With Accommodation */}
              <div className="cad-card p-6 border-accent-brand/60 shadow-brand-glow relative flex flex-col justify-between">
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent-brand/20 border border-accent-brand/40 text-[10px] font-mono text-accent-brand font-bold">
                  RECOMMENDED
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    Full Access + Stay
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-accent-brand">₹1200</span>
                    <span className="text-xs text-text-secondary font-mono">/ delegate</span>
                  </div>
                  <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
                    Includes 5 days hostel accommodation in IIT Kharagpur campus (March 11–15, 2027), delegate kit, and full event access.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      <span>Hostel Accommodation (5 Days)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      <span>All Competitions &amp; Hackathons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      <span>Official Optima 2027 Kit &amp; T-shirt</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Option B: Without Accommodation */}
              <div className="cad-card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    Fest Access Only
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-white">₹1000</span>
                    <span className="text-xs text-text-secondary font-mono">/ delegate</span>
                  </div>
                  <p className="mt-2 text-xs text-text-secondary font-sans leading-relaxed">
                    Full access to all workshops, competitions, and guest lectures without hostel stay.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                      <span>All Competitions &amp; Hackathons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                      <span>Guest Lectures &amp; Keynotes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                      <span>Official Delegate Kit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Steps Instructions */}
            <div className="cad-card p-6 space-y-4">
              <h4 className="font-display text-sm font-bold uppercase text-white tracking-wide border-b border-border-subtle pb-2">
                Payment Verification Protocol
              </h4>
              <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300">
                {payment.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-accent-brand font-bold bg-accent-brand/10 border border-accent-brand/20 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pay Action & Form Trigger (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cad-card p-6 sm:p-7 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-accent-brand/10 border border-accent-brand/30 flex items-center justify-center mx-auto">
                <CreditCard className="w-7 h-7 text-accent-brand" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Submit Payment Details
                </h3>
                <p className="text-xs text-text-secondary font-sans mt-1">
                  Delegate: <span className="text-white font-semibold">{userData?.fullName}</span> ({userData?.OPID})
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">DELEGATE ID:</span>
                  <span className="text-accent-brand font-bold">{userData?.OPID || "PENDING"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">INSTITUTION:</span>
                  <span className="text-zinc-300 truncate max-w-[180px]">{userData?.college}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CONFIRMATION:</span>
                  <span className="text-cyan-400">Within 48 hrs</span>
                </div>
              </div>

              <a
                href={paymentFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickTick}
                className="btn-primary w-full py-3.5 text-xs tracking-wider justify-center shadow-lg gap-2"
              >
                <span>Proceed to Pay &amp; Submit Proof</span>
                <ArrowRight size={16} />
              </a>

              <p className="text-[11px] font-mono text-zinc-500">
                You will be redirected to the secure Optima 2027 verification dispatch form.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-text-secondary px-2">
              <Link to="/rules" className="hover:text-white transition-colors">
                ← Review Stay Rules
              </Link>
              <Link to="/profile" className="text-accent-brand hover:underline">
                Back to Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
