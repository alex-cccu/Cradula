import Link from "next/link";
import BackArrow from "@/assets/BackArrow";

const ArticleHeader = ({
  category,
  colour,
}: {
  category: string;
  colour: string;
}) => {
  // Some unfortunate nastiness to do with the way Tailwind handles dynamic class names
  const decorationColours: { [key: string]: string } = {
    "cradula-pink": "decoration-cradula-pink",
    "cradula-blue": "decoration-cradula-blue",
    "cradula-yellow": "decoration-cradula-yellow",
    "cradula-purple": "decoration-cradula-purple",
    "cradula-orange": "decoration-cradula-orange",
    "cradula-green": "decoration-cradula-green",
    "cradula-red": "decoration-cradula-red",
  };
  const decoration = decorationColours[colour] || "decoration-neutral-900";

  return (
    <div className="flex justify-between font-body place-items-center">
      <Link
        href={"/"}
        className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
      >
        <BackArrow />
        <p>Back to safety</p>
      </Link>
      <Link
        href={`/articles/${encodeURIComponent(category)}`}
        className={`font-title dark:font-titleDark dark:tracking-wider text-xl/8 dark:text-2xl animate-appear-fast 
        hover:scale-115 ease-in-out transition-transform duration-500 underline ${decoration} dark:decoration-cradula-red`}
      >
        {category}
      </Link>
    </div>
  );
};

export default ArticleHeader;
