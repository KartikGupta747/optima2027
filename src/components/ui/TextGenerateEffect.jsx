/**
 * TextGenerateEffect — Aceternity UI
 * Source: https://ui.aceternity.com/components/text-generate-effect
 *
 * Adapted for this project:
 *  - Uses framer-motion (already installed) instead of motion/react
 *  - `cn` pulled from local utils
 *  - Added `delay` prop so the terminal header and date can stagger independently
 *  - Added `once` prop (default true) — animates only once on mount, not on every re-render
 */
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * @param {string}  words      — the full string to animate word-by-word
 * @param {string}  className  — extra classes for the outer wrapper
 * @param {boolean} filter     — enable blur-to-clear per-word (default: true)
 * @param {number}  duration   — per-word fade/blur duration in seconds (default: 0.5)
 * @param {number}  staggerDelay — seconds between each word reveal (default: 0.12)
 * @param {number}  initialDelay — seconds before the whole sequence starts (default: 0)
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.12,
  initialDelay = 0,
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    // Small timeout so `initialDelay` works cleanly with framer's stagger
    const timer = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        }
      );
    }, initialDelay * 1000);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]);

  return (
    <div className={cn(className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="opacity-0 inline"
            style={{
              filter: filter ? "blur(8px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default TextGenerateEffect;
