import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTextScramble } from "../../hooks/useTextScramble";
import { playClickTick, playHoverChirp } from "../../utils/cyberAudio";
import RegisterButton from "./RegisterButton";
import logo from "../../assets/optima2027-logo.png";

const CommandGridItem = ({ item, index, isActive, onClick }) => {
  const { text, trigger } = useTextScramble(item.name, 220);

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.25, ease: "easeOut" },
        },
        exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
      }}
      className="list-none"
    >
      <button
        type="button"
        onClick={() => {
          playClickTick();
          onClick(item);
        }}
        onMouseEnter={() => {
          trigger();
          playHoverChirp();
        }}
        className={`w-full text-left py-3 px-3.5 flex items-center justify-between rounded-lg transition-all select-none border-l-2 ${
          isActive
            ? "border-accent-brand bg-accent-brand/10 text-white"
            : "border-transparent text-zinc-300 hover:text-white hover:bg-white/[0.04] hover:border-cyan-400"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent-brand font-semibold">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <span
            className={`font-mono text-base sm:text-lg font-bold tracking-wider ${
              isActive
                ? "text-accent-brand drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]"
                : "text-zinc-200"
            }`}
          >
            {text}
          </span>
        </div>

        <ArrowUpRight
          size={16}
          className={`${
            isActive ? "text-accent-brand" : "text-zinc-500"
          } transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        />
      </button>
    </motion.li>
  );
};

const CyberMenu = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onItemClick,
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[1000] bg-[#030305]/98 backdrop-blur-2xl flex flex-col justify-between px-5 pt-4 pb-8 overflow-y-auto bg-cad-grid select-none"
        >
          {/* Header Bar: Brand Logo + Close Button */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 pt-1">
            <img
              src={logo}
              alt="Optima 2027"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => {
                playClickTick();
                onClose();
              }}
              className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items List */}
          <div className="relative z-10 my-auto py-6 max-w-lg mx-auto w-full">
            <motion.ul
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                },
                exit: { opacity: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col space-y-1"
            >
              {navItems.map((item, index) => (
                <CommandGridItem
                  key={item.name}
                  item={item}
                  index={index}
                  isActive={activeSection === item.sectionId}
                  onClick={(it) => {
                    onItemClick(it);
                    onClose();
                  }}
                />
              ))}
            </motion.ul>
          </div>

          {/* Bottom Actions & Metadata */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col items-center gap-3 max-w-lg mx-auto w-full">
            <div className="w-full flex items-center justify-center gap-3">
              <RegisterButton />
              <Link
                to="/signin"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all tracking-wider"
              >
                SIGN IN
              </Link>
            </div>

            <div className="flex items-center justify-between w-full font-mono text-[10px] text-zinc-500 tracking-tight pt-1">
              <span>IIT KHARAGPUR</span>
              <span className="text-accent-brand font-semibold">MARCH 12–14, 2027</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CyberMenu;
