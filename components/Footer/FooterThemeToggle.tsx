"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FooterThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [flash, setFlash] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);

    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, []);

  const toggleTheme = () => {
    setFlash(true);
    const flashTimeout = window.setTimeout(() => setFlash(false), 600); // duration matches flash + rumble
    const themeTimeout = window.setTimeout(
      () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      300
    );

    timeoutsRef.current.push(flashTimeout, themeTimeout);
  };

  return (
    <div className="relative ml-3">
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="hover:scale-115 ease-in-out transition-transform duration-500 cursor-pointer"
      >
        <div className="z-2 pb-0.5 pl-0.5">
          {!mounted || !resolvedTheme ? null : resolvedTheme === "dark" ? (
            <Image
              height={96}
              width={96}
              src="/Mooney.png"
              className="-rotate-20 h-8 w-8"
              alt="Moon Icon"
            />
          ) : (
            <Image
              height={96}
              width={96}
              src="/Sunny.png"
              alt="Sun Icon"
              className="h-8 w-8"
            />
          )}
        </div>
      </button>

      {/* Thunder-like flash + subtle rumble + glow */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0.2, 1, 0],
              x: [0, -3, 3, -2, 2, 0], // subtle rumble
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              times: [0, 0.2, 0.4, 0.6, 1],
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-neutral-300 pointer-events-none z-50 shadow-[0_0_60px_30px_rgba(255,255,200,0.7)]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
