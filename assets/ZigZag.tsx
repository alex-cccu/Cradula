const ZigZag = ({
  colour,
  animated,
}: {
  colour: string;
  animated: boolean;
}) => {
  // Some unfortunate nastiness to do with the way Tailwind handles dynamic class names
  const strokeColours: { [key: string]: string } = {
    "cradula-pink": "stroke-cradula-pink",
    "cradula-blue": "stroke-cradula-blue",
    "cradula-yellow": "stroke-cradula-yellow",
    "cradula-purple": "stroke-cradula-purple",
    "cradula-orange": "stroke-cradula-orange",
    "cradula-green": "stroke-cradula-green",
    "cradula-red": "stroke-cradula-red",
  };
  const stroke = strokeColours[colour] || "stroke-neutral-900";

  return (
    <svg
      className="mx-auto block w-[100%] h-3"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <path
        d="M0 8 L10 2 L20 8 L30 2 L40 8 L50 2 L60 8 L70 2 L80 8 L90 2 L100 8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        {...(animated
          ? { strokeDasharray: "200", strokeDashoffset: "200" }
          : {})}
        className={`group-hover:animate-draw ease-in-out duration-300 dark:stroke-cradula-red ${stroke}`}
      />
    </svg>
  );
};

export default ZigZag;
