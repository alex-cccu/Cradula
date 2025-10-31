import { AnimatePresence, motion } from "framer-motion";

const ThemeToggleLightning = ({ flash }: { flash: boolean }) => {
  return (
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
  );
};

export default ThemeToggleLightning;
