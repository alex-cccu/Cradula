"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const BackArrow = () => {
  const { resolvedTheme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ArrowLeftIcon
        width={20}
        className="stroke-cradula-green fill-cradula-green dark:stroke-cradula-red dark:fill-cradula-red group-hover:animate-back-bounce"
      />
    );
  }

  const imageSrc =
    !resolvedTheme || resolvedTheme === "light"
      ? "/GreenArrow.png"
      : "/RedArrow.png";

  const arrowColor =
    !resolvedTheme || resolvedTheme === "light"
      ? "fill-cradula-green stroke-cradula-green" // Green for light theme
      : "fill-cradula-red stroke-cradula-red"; // Red for dark theme

  return (
    <div className="relative w-5 h-5">
      {/* SVG Fallback - hidden once image loads */}
      {!imageLoaded && (
        <ArrowLeftIcon
          width={20}
          className={`${arrowColor} group-hover:animate-back-bounce`}
        />
      )}

      <Image
        height={20}
        width={20}
        src={imageSrc}
        alt="Back arrow"
        onLoad={() => setImageLoaded(true)}
        className={`group-hover:animate-back-bounce transition-opacity ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default BackArrow;
