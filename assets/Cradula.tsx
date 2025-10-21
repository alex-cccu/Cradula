const letters = [
  { char: "c", effect: "group-hover:animate-wiggle text-cradula-red" },
  { char: "r", effect: "group-hover:animate-bounce-up text-cradula-green" },
  { char: "a", effect: "group-hover:animate-beat-slow text-cradula-pink" },
  { char: "d", effect: "group-hover:animate-shake text-cradula-blue" },
  {
    char: "u",
    effect: "group-hover:animate-beat-fast text-cradula-yellow",
  },
  { char: "l", effect: "group-hover:animate-wiggle text-cradula-purple" },
  {
    char: "a",
    effect:
      "group-hover:animate-bounce-down dark:lowercase text-cradula-orange",
  },
];

const Cradula = ({ isColour }: { isColour: boolean }) => {
  if (isColour) {
    return (
      <div className="gap-1 sm:text-8xl text-7xl sm:dark:text-8xl inline-block font-bold dark:uppercase">
        {letters.map((l, i) => (
          <span
            key={i}
            className={`inline-block transition-transform p-0.5 sm:p-1 dark:px-2 sm:dark:px-3 ease dark:text-cradula-red ${l.effect}`}
          >
            {l.char}
          </span>
        ))}
      </div>
    );
  } else {
    return (
      <div className="gap-1 sm:text-5xl text-5xl dark:text-5xl inline-block font-bold dark:uppercase">
        {letters.map((l, i) => (
          <span
            key={i}
            className={`inline-block transition-transform p-1 md:p-0.5 dark:px-2 ease dark:text-neutral-100 text-neutral-100 ${l.effect}`}
          >
            {l.char}
          </span>
        ))}
      </div>
    );
  }
};

export default Cradula;
