"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

type Props = {
  words?: string[];
  interval?: number;
  className?: string;
};

export default function AnimatedWords({
  words = ["articles", "portfolio", "photography", "website"],
  interval = 3000,
  className = "",
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  // refs for timers & to read latest index from inside timeouts
  const visibleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const switchTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const indexRef = React.useRef(index);

  React.useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // animation timing (ms) — tweak to taste
  const enterDelayMs = 40; // delay between letters when entering
  const enterDurationMs = 320; // per-letter animation length (ms)
  const exitDelayMs = 30; // delay between letters when exiting (reverse order)
  const exitDurationMs = 240; // per-letter exit duration (ms)

  // helper to clear timers
  const clearTimers = () => {
    if (visibleTimerRef.current) {
      clearTimeout(visibleTimerRef.current);
      visibleTimerRef.current = null;
    }
    if (switchTimerRef.current) {
      clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }
  };

  // schedule loop function: shows current word for a while, then hides it, swaps, shows next
  React.useEffect(() => {
    let mounted = true;

    function scheduleNext() {
      if (!mounted) return;

      // compute lengths for the current visible word
      const currentIndex = indexRef.current;
      const currentLetters = words[currentIndex] ?? "";
      const lettersCount = Math.max(currentLetters.length, 1);

      const enterTotalMs =
        enterDurationMs + enterDelayMs * (lettersCount - 1 || 0);
      const exitTotalMs =
        exitDurationMs + exitDelayMs * (lettersCount - 1 || 0);

      // how long to leave it visible (clamp to at least 300ms)
      const visiblePeriodMs = Math.max(
        interval - enterTotalMs - exitTotalMs,
        300
      );

      // after visiblePeriod, start exit
      visibleTimerRef.current = setTimeout(() => {
        if (!mounted) return;
        setIsVisible(false);

        // after exit animation has finished, flip to next and show it
        switchTimerRef.current = setTimeout(() => {
          if (!mounted) return;
          setIndex((s) => (s + 1) % words.length);
          setIsVisible(true);

          // schedule next cycle for the new word
          scheduleNext();
        }, exitTotalMs);
      }, visiblePeriodMs);
    }

    // start initial cycle
    scheduleNext();

    return () => {
      mounted = false;
      clearTimers();
    };
    // intentionally only recreate when words or interval change
  }, [
    words,
    interval,
    enterDelayMs,
    enterDurationMs,
    exitDelayMs,
    exitDurationMs,
  ]);

  // compute box width in ch so trailing text doesn't move
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");
  const boxWidth = `${Math.max(longest.length, 1)}ch`;

  // easing arrays for framer-motion
  const easeIn: Easing = [0.4, 0, 0.2, 1];
  const easeOut: Easing = [0.25, 0.8, 0.25, 1];

  const current = words[index] || "";
  const letters = current.split("");

  return (
    <div
      className={`inline-flex items-center ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="relative"
        style={{
          width: boxWidth,
          minWidth: boxWidth,
          lineHeight: 1,
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        {/* the inner container remounts when 'index' changes, but we control enter/exit via `isVisible` */}
        <div
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
          style={{ pointerEvents: "none" }}
        >
          {letters.map((ch, i) => {
            // transitions use seconds for framer-motion
            const enterDelay = (i * enterDelayMs) / 1000;
            const exitDelay = ((letters.length - 1 - i) * exitDelayMs) / 1000;

            const enterTransition = {
              delay: enterDelay,
              duration: enterDurationMs / 1000,
              ease: easeOut,
            };

            const exitTransition = {
              delay: exitDelay,
              duration: exitDurationMs / 1000,
              ease: easeIn,
            };

            return (
              <motion.span
                key={`${current}-${i}`} // ensure remount for new word
                initial={{ y: 18, opacity: 0 }}
                animate={
                  isVisible
                    ? { y: 0, opacity: 1, transition: enterTransition }
                    : { y: -18, opacity: 0, transition: exitTransition }
                }
                className="inline-block"
                aria-hidden={false}
                style={{ display: "inline-block", marginRight: "0.04ch" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            );
          })}
        </div>
      </div>

      <span className="align-middle">by alex</span>
    </div>
  );
}
