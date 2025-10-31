"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import ThemeToggleLightning from "./components/ThemeToggleLightning";
import SunAndMoon from "./components/SunAndMoon";
import toggleTheme from "./utils/toggleTheme";

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

  return (
    <div className="relative ml-3">
      <button
        onClick={() =>
          toggleTheme({
            setFlash,
            setTheme,
            resolvedTheme,
            timeoutsRef,
          })
        }
        aria-label="Toggle dark mode"
        className="hover:scale-115 ease-in-out transition-transform duration-500 cursor-pointer"
      >
        <SunAndMoon
          mounted={mounted}
          resolvedTheme={resolvedTheme}
          className="h-8 w-8"
        />
      </button>

      <ThemeToggleLightning flash={flash} />
    </div>
  );
}
