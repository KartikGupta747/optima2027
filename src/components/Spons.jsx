import React from "react";
import { ArrowUpRight, Building2, ShieldCheck } from "lucide-react";

const tier1Sponsors = [
  {
    tier: "TITLE SPONSOR",
    name: "Hire3x",
    logo: "/assets/spons/spons-25/Hire3x.webp",
    url: "https://hire3x.com/",
    span: "md:col-span-6",
    height: "h-44 sm:h-52",
  },
  {
    tier: "CO-TITLE SPONSOR",
    name: "Sirius DigiTech / Adani AI",
    logo: "/assets/spons/spons-25/Adani_Ai_Sirius_Digitech.webp",
    url: "https://www.linkedin.com/company/sirius-digitech/",
    span: "md:col-span-6",
    height: "h-44 sm:h-52",
  },
];

const tier2Sponsors = [
  {
    tier: "PLATINUM SPONSOR",
    name: "ONGC",
    logo: "/assets/spons/spons-25/ONGC.webp",
    url: "https://ongcindia.com/",
    span: "md:col-span-4",
    height: "h-36 sm:h-40",
  },
  {
    tier: "STRATEGIC SPONSOR",
    name: "Optym",
    logo: "/assets/spons/spons-25/OPTYM.webp",
    url: "https://www.optym.com/",
    span: "md:col-span-4",
    height: "h-36 sm:h-40",
  },
  {
    tier: "IN ASSOCIATION WITH",
    name: "GAIL",
    logo: "/assets/spons/spons-25/GAIL.webp",
    url: "https://gailonline.com/",
    span: "md:col-span-4",
    height: "h-36 sm:h-40",
  },
];

const tier3Sponsors = [
  {
    tier: "MAJOR SPONSOR",
    name: "Blue Yonder",
    logo: "/assets/spons/spons-25/blue_yonder.webp",
    url: "https://www.blueyonder.com/",
  },
  {
    tier: "POWERED BY",
    name: "Unstop",
    logo: "/assets/spons/spons-25/Unstop.webp",
    url: "https://unstop.com/",
  },
  {
    tier: "CHALLENGE PARTNER",
    name: "Delhivery",
    logo: "/assets/spons/spons-25/Delhivery_Logo.webp",
    url: "https://www.delhivery.com/",
  },
  {
    tier: "AI PARTNER",
    name: "LiveAI",
    logo: "/assets/spons/spons-25/LiveAi.webp",
    url: "https://www.liveai.eu/",
  },
];

const tier4Sponsors = [
  {
    tier: "SILVER SPONSOR",
    name: "IEM",
    logo: "/assets/spons/spons-25/IEM.webp",
    url: "http://www.iem.edu.in/",
  },
  {
    tier: "TITLE MEDIA PARTNER",
    name: "The Times of India",
    logo: "/assets/spons/spons-25/the-times-of-india.webp",
    url: "https://timesofindia.indiatimes.com/",
  },
  {
    tier: "MEDIA PARTNER",
    name: "Campus Varta",
    logo: "/assets/spons/spons-25/CampusVarta.webp",
    url: "https://www.campusvarta.com/",
  },
  {
    tier: "EVENT PARTNER",
    name: "KGTS",
    logo: "/assets/spons/spons-25/kgts.webp",
    url: "https://www.linkedin.com/company/the-kgts/",
  },
  {
    tier: "ANALYTICS PARTNER",
    name: "DecisionOpt",
    logo: "/assets/spons/spons-25/decisionOptNew.webp",
    url: "https://decisionopt.com/",
  },
  {
    tier: "MEDIA PARTNER",
    name: "Insight Success",
    logo: "/assets/spons/spons-25/InsightSuccess.webp",
    url: "https://www.insightssuccess.in/",
  },
];

const SponsorCard = ({ sponsor, height = "h-32", span = "col-span-1" }) => {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${span} ${height} group relative cad-card p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_10px_30px_rgba(255,107,0,0.18)]`}
    >
      {/* Category Readout Pill */}
      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider text-orange-400/80 group-hover:text-orange-300 transition-colors">
        // {sponsor.tier}
      </span>

      {/* External Link Indicator */}
      <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-3.5 h-3.5 text-accent-brand" />
      </span>

      {/* Constraint 3: Monochrome white/grey by default, revealing brand colors on hover */}
      <div className="w-full h-full max-h-[70%] flex items-center justify-center p-2">
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="max-h-full max-w-[85%] object-contain transition-all duration-300 transform group-hover:scale-110 drop-shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
          loading="lazy"
        />
      </div>

      {/* Sub-label */}
      <span className="absolute bottom-2 text-[10px] font-mono uppercase tracking-wider text-text-secondary/60 group-hover:text-text-primary transition-colors">
        {sponsor.name}
      </span>
    </a>
  );
};

const Spons = () => {
  return (
    <section
      id="sponsors"
      className="relative w-full py-20 lg:py-28 bg-bg-base border-b border-border-subtle overflow-hidden"
    >
      {/* Background CAD grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deliverable 10 Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-header mb-3">
              <span className="section-header-square" />
              <h2 className="section-header-text text-xl sm:text-2xl lg:text-3xl">
                The Network // Corporate Sponsors &amp; Industry Backing
              </h2>
            </div>
            <p className="text-text-secondary text-sm max-w-2xl font-sans leading-relaxed">
              Leading global enterprises and technology pioneers driving innovation in artificial intelligence, energy, industrial operations, and enterprise software.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-text-secondary border border-border-subtle bg-bg-surface px-4 py-2 self-start md:self-auto">
            <Building2 className="w-3.5 h-3.5 text-accent-brand" />
            <span>ENTERPRISE_NETWORK: VERIFIED</span>
          </div>
        </div>

        {/* Strict Architectural Hierarchy Grid */}
        <div className="space-y-6">
          
          {/* Tier 1: Title & Co-Title Sponsors (6-Column Spans) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {tier1Sponsors.map((spons) => (
              <SponsorCard
                key={spons.name}
                sponsor={spons}
                span={spons.span}
                height={spons.height}
              />
            ))}
          </div>

          {/* Tier 2: Platinum & Strategic Sponsors (4-Column Spans) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {tier2Sponsors.map((spons) => (
              <SponsorCard
                key={spons.name}
                sponsor={spons}
                span={spons.span}
                height={spons.height}
              />
            ))}
          </div>

          {/* Tier 3: Major & Powered By (3-Column Spans) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tier3Sponsors.map((spons) => (
              <SponsorCard
                key={spons.name}
                sponsor={spons}
                height="h-32 sm:h-36"
              />
            ))}
          </div>

          {/* Tier 4: Media & Ecosystem Partners (Multi-Column Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
            {tier4Sponsors.map((spons) => (
              <SponsorCard
                key={spons.name}
                sponsor={spons}
                height="h-24 sm:h-28"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Spons;
