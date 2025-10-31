const toggleTheme = ({
  setFlash,
  setTheme,
  resolvedTheme,
  timeoutsRef,
}: {
  setFlash: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  timeoutsRef: React.RefObject<number[]>;
}) => {
  setFlash(true);
  const flashTimeout = window.setTimeout(() => setFlash(false), 600);
  const themeTimeout = window.setTimeout(
    () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    300
  );

  timeoutsRef.current.push(flashTimeout, themeTimeout);
};

export default toggleTheme;
