import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
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
 * Highly kinetic, strictly sticky navigation entity fixed top-4 z-[999].
 * Pure minimalist layout: commanding brand logo, kinetic links with data particle,
 * and high-voltage perimeter-beam Register CTA.
 */
const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll velocity physics setup
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 280,
    damping: 24,
    mass: 0.15,
  });

  // Fast-scroll aerodynamic capsule compression
  const scaleX = useTransform(
    smoothVelocity,
    [-2400, -800, 0, 800, 2400],
    [0.965, 0.985, 1, 0.98, 0.96]
  );
  const scaleY = useTransform(
    smoothVelocity,
    [-2400, -800, 0, 800, 2400],
    [1.02, 1.01, 1, 0.985, 0.97]
  );

  // Scrolling Up: Deep-orange (#ff4500) underglow flare
  const orangeUnderglowOpacity = useTransform(
    smoothVelocity,
    [-1800, -120, -10, 60],
    [0.85, 0.45, 0, 0]
  );

  // Monitor Idle vs Scrolled status
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 15) {
      setIsAtTop(true);
    } else {
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
      <header className="fixed top-4 left-0 right-0 z-[999] hidden xl:flex items-center justify-center px-4 pointer-events-none">
        <motion.div
          style={{
            scaleX,
            scaleY,
          }}
          className="relative pointer-events-auto flex items-center justify-center"
        >
          {/* Reactive Deep-Orange Underglow on Scrolling Up */}
          <motion.div
            style={{ opacity: orangeUnderglowOpacity }}
            className="absolute -inset-2 rounded-full bg-gradient-to-b from-transparent via-[#ff4500]/25 to-[#ff4500]/60 blur-xl pointer-events-none -z-10"
          />

          {/* Morphing Ribbon Body */}
          <motion.div
            animate={{
              borderRadius: isAtTop ? "20px" : "9999px",
              paddingTop: isAtTop ? "10px" : "8px",
              paddingBottom: isAtTop ? "10px" : "8px",
              paddingLeft: isAtTop ? "28px" : "20px",
              paddingRight: isAtTop ? "28px" : "20px",
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative flex items-center justify-between gap-6 transition-colors duration-500 ${
              isAtTop
                ? "w-full max-w-7xl bg-black/20 backdrop-blur-2xl border border-white/5"
                : "w-auto bg-[#050505]/85 backdrop-blur-3xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            }`}
          >
            {/* Left: Bold, Commanding Brand Logo Anchor */}
            <div className="flex items-center pr-3">
              <NavLogo isScrolled={!isAtTop} />
            </div>

            {/* Center: Kinetic Typography, Scramble, & Data Particle */}
            <nav className="flex items-center gap-1.5 relative">
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
            <div className="flex items-center pl-3">
              <RegisterButton />
            </div>
          </motion.div>
        </motion.div>
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
