import React, { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import NavLogo from "./NavLogo";
import NavLinkItem from "./NavLinkItem";
import RegisterButton from "./RegisterButton";
import CyberMenu from "./CyberMenu";
import { playClickTick } from "../../utils/cyberAudio";

const NAV_ITEMS = [
  { name: "HOME", href: "/#hero", path: "/", sectionId: "hero" },
  { name: "ABOUT", href: "/#about", path: "/about", sectionId: "about" },
  { name: "COMPETITIONS", href: "/#events", path: "/competitions", sectionId: "events" },
  { name: "GUEST LECTURES", href: "/#speakers", path: "/guest-lectures", sectionId: "speakers" },
  { name: "SCHEDULE", href: "/#schedule", path: "/schedule", sectionId: "schedule" },
  { name: "GALLERY", href: "/#gallery", path: "/gallery", sectionId: "gallery" },
  { name: "SPONSORS", href: "/#sponsors", path: "/sponsors", sectionId: "sponsors" },
  { name: "TEAM", href: "/#team", path: "/team", sectionId: "team" },
  { name: "CONTACT", href: "/query-us", path: "/query-us", sectionId: "contact" },
];

/**
 * THE ALGORITHMIC RIBBON
 * - 0 Scroll: Expansive, prominent command ribbon (max-w-7xl) with larger logo & generous padding.
 * - Scrolled: Smoothly transitions into a sleek compact dock (max-w-[1120px]) with tight padding.
 * - Hardware-accelerated CSS transition replaces Framer layout to guarantee buttery 60/120fps performance.
 */
const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  // Hysteresis threshold: prevents boundary jitter
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 25) {
      setIsAtTop(true);
    } else if (latest > 55) {
      setIsAtTop(false);
    }
  });

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== "/") {
      const match = NAV_ITEMS.find((item) => item.path === location.pathname);
      if (match) setActiveSection(match.sectionId);
      return;
    }

    const sectionIds = NAV_ITEMS.map((item) => item.sectionId).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (item) => {
    playClickTick();
    if (item.href.startsWith("/#")) {
      const targetId = item.href.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(item.href);
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* 
        Sticky Desktop Ribbon (Never leaves screen, fixed top-4 z-[999])
        Hidden on mobile viewports (< 1280px) where the Command Grid takes over
      */}
      <header className="fixed top-4 left-0 right-0 z-[999] hidden xl:flex items-center justify-center px-4 sm:px-6 pointer-events-none">
        <div className="relative pointer-events-auto flex items-center justify-center w-full max-w-7xl">
          {/* Ambient Backing Glow */}
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-b from-transparent via-[#ff4500]/10 to-[#ff4500]/25 blur-lg pointer-events-none -z-10 transition-opacity duration-300 ${
              isAtTop ? "opacity-30" : "opacity-75"
            }`}
          />

          {/* Morphing Ribbon: Smooth native CSS transition with 0 layout calculation lag */}
          <div
            className={`relative flex items-center justify-between gap-4 transition-all duration-300 ease-out will-change-[max-width,padding,border-radius] ${
              isAtTop
                ? "w-full max-w-7xl px-8 py-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                : "w-full max-w-[1120px] px-5 py-2 rounded-full bg-[#050505]/92 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            }`}
          >
            {/* Left: Brand Logo (Scales up smoothly via CSS) */}
            <div className="flex items-center pr-2 flex-shrink-0">
              <NavLogo isScrolled={!isAtTop} />
            </div>

            {/* Center: Kinetic Typography & Active Route Indicator */}
            <nav className="flex items-center gap-0.5 sm:gap-1 relative flex-shrink-0">
              {/* Geometric SVG guide path */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-[1px] pointer-events-none opacity-20 overflow-visible"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#00f0ff"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              </svg>

              {NAV_ITEMS.map((item) => (
                <NavLinkItem
                  key={item.name}
                  name={item.name}
                  isActive={activeSection === item.sectionId}
                  onClick={() => handleNavClick(item)}
                />
              ))}
            </nav>

            {/* Right: Apex Register CTA Button */}
            <div className="flex items-center pl-2 flex-shrink-0">
              <RegisterButton />
            </div>
          </div>
        </div>
      </header>

      {/* 
        Mobile Experience: "The Command Grid"
        Fixed glowing hexagon trigger at bottom-center + screen-shatter circular clip-path reveal
      */}
      <CyberMenu
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        onItemClick={handleNavClick}
      />
    </>
  );
};

export default Navbar;
