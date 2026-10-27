import { useState, useRef, useEffect, useCallback } from "react";

const CIPHER_CHARS = "0101_#<>[]{}*+~=X%&$!/\\";

/**
 * High-performance 300ms Matrix/Cryptographic Scramble hook
 * Smoothly resolves characters from left to right at 60fps
 */
export const useTextScramble = (finalText, duration = 300) => {
  const [text, setText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef(null);

  const trigger = useCallback(() => {
    setIsScrambling(true);
    const startTime = performance.now();
    const len = finalText.length;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const settledCount = Math.floor(progress * len);

      let scrambled = "";
      for (let i = 0; i < len; i++) {
        if (finalText[i] === " ") {
          scrambled += " ";
        } else if (i < settledCount) {
          scrambled += finalText[i];
        } else {
          scrambled += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
      }

      setText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setText(finalText);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [finalText, duration]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setText(finalText);
    setIsScrambling(false);
  }, [finalText]);

  useEffect(() => {
    setText(finalText);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [finalText]);

  return { text, trigger, reset, isScrambling };
};

export default useTextScramble;
