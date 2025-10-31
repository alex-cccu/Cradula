import Image from "next/image";

const SunAndMoon = ({
  mounted,
  resolvedTheme,
  className,
}: {
  mounted: boolean;
  resolvedTheme: string | undefined;
  className?: string;
}) => {
  return (
    <div className="z-2 pb-0.5 pl-0.5">
      {!mounted || !resolvedTheme ? null : (
        <Image
          height={96}
          width={96}
          src={resolvedTheme === "dark" ? "/Mooney.png" : "/Sunny.png"}
          className={`-rotate-20 ${className}`}
          alt="Moon Icon"
        />
      )}
    </div>
  );
};

export default SunAndMoon;
