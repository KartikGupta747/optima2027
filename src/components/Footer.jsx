import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import logo from "../assets/optima2027-logo.png";

const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Competitions", href: "/#events" },
  { name: "Schedule", href: "/#schedule" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Team", href: "/#team" },
];

const SOCIAL_ICONS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/optima-iitkgp/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/optima.iitkgp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/optima.iitkharagpur",
    icon: Facebook,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@optima.iitkgp?si=awtEARkQ8C7UUDxi",
    icon: Youtube,
  },
];

/**
 * THE SLEEK HORIZON (MINIMALIST CYBER-ELEGANCE FOOTER)
 * Grounded, low-profile, clean 4-column architecture.
 */
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(href);
      }
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 text-gray-400 py-12 lg:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Anchor */}
          <div className="flex flex-col">
            <Link to="/" data-cursor="pointer" className="inline-block mb-4">
              <img
                src={logo}
                alt="Optima 2027 Logo"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              IIT Kharagpur's premier Techno-Optimization Fest by the Department
              of Industrial & Systems Engineering.
            </p>
            <div className="mt-4 text-xs font-mono text-gray-500">
              OPTIMA 2027 &middot; 7TH - 9TH MARCH
            </div>
          </div>

          {/* Column 2: Quick Links (Navigation) */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    data-cursor="pointer"
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 inline-block py-0.5"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Terminal Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
              Contact
            </h4>

            {/* Department Address */}
            <a
              href="https://maps.app.goo.gl/7t9fs2Z4KE2Dqjnb6"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="group flex items-start gap-2.5 text-gray-400 hover:text-white text-sm leading-relaxed transition-colors mb-4"
            >
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>
                Department of Industrial & Systems Engineering, IIT Kharagpur,
                WB - 721302
              </span>
            </a>

            {/* Contacts Stack */}
            <div className="space-y-3 pt-3 border-t border-white/5 text-xs">
              <div>
                <div className="font-semibold text-white/90">Kshitij Nayan</div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400 mt-1">
                  <a
                    href="tel:+919835075835"
                    data-cursor="pointer"
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span>+91 98350 75835</span>
                  </a>
                  <a
                    href="mailto:KSHITIJ.NAYAN.24@kgpian.iitkgp.ac.in"
                    data-cursor="pointer"
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-gray-500" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="font-semibold text-white/90">Anora Ankur</div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400 mt-1">
                  <a
                    href="tel:+918484050146"
                    data-cursor="pointer"
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span>+91 84840 50146</span>
                  </a>
                  <a
                    href="mailto:ANORAANKUR.24@kgpian.iitkgp.ac.in"
                    data-cursor="pointer"
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-gray-500" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Social & Query */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold mb-4">
                Connect
              </h4>

              {/* Horizontal Row of Minimalist SVG Icons */}
              <div className="flex items-center gap-3">
                {SOCIAL_ICONS.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="pointer"
                      className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all duration-300"
                      title={soc.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Sleek Low-Profile Outline Query Button */}
              <Link
                to="/query-us"
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-white/15 hover:border-cyan-400 bg-white/[0.02] hover:bg-white/[0.06] text-white/90 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] mt-5"
              >
                <span>Submit Query</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* The Copyright Bar (Bottom Sub-Footer) */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; 2027 Optima. Department of Industrial and Systems Engineering, IIT Kharagpur.
          </div>
          <div>
            Designed with Algorithmic Elegance.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
