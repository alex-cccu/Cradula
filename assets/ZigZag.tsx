"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ZigzagUnderline({
  children,
  colour,
  animated = true,
}: {
  children: React.ReactNode;
  colour: string;
  animated?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const backgroundImage = isDark
    ? "zigzag-cradula-red.png"
    : `zigzag-${colour}.png`;

  return (
    <div className="flex items-center justify-center pb-2">
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children} {/* Text to be underlined */}
        <div className="absolute left-0 right-0 -bottom-3 h-4 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/zigzags/${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundPosition: "left center",
            }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
              clipPath:
                !animated || isHovered
                  ? "inset(0 0% 0 0)"
                  : "inset(0 100% 0 0)",
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
