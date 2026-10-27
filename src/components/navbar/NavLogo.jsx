import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/optima2027-logo.png";
import { playClickTick, playHoverChirp } from "../../utils/cyberAudio";

const NavLogo = ({ isScrolled = false }) => {
  const location = useLocation();

  const handleClick = () => {
    playClickTick();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      onMouseEnter={playHoverChirp}
      className="flex items-center group focus-visible:outline-none select-none py-1"
      aria-label="Optima 2027 Home"
    >
      {/* Commanding Bold Brand Logo Anchor (Scaled up 60%-75%) */}
      <div className="relative flex items-center justify-center">
        <img
          src={logo}
          alt="Optima 2027"
          className={`w-auto object-contain transition-all duration-300 ${
            isScrolled ? "h-10 sm:h-11" : "h-11 sm:h-13 md:h-14"
          } group-hover:brightness-115 group-hover:drop-shadow-[0_0_18px_rgba(255,107,0,0.45)]`}
        />
        {/* Ambient Brand Underglow */}
        <span className="absolute -inset-2 rounded-full bg-accent-brand/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default NavLogo;
