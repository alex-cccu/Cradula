import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const ArticleHeader = ({
  category,
  colour,
}: {
  category: string;
  colour: string;
}) => {
  // Some unfortunate nastiness to do with the way Tailwind handles dynamic class names
  const decoration =
    colour === "cradula-pink"
      ? "decoration-cradula-pink"
      : colour === "cradula-blue"
      ? "decoration-cradula-blue"
      : colour === "cradula-yellow"
      ? "decoration-cradula-yellow"
      : colour === "cradula-purple"
      ? "decoration-cradula-purple"
      : colour === "cradula-orange"
      ? "decoration-cradula-orange"
      : colour === "cradula-green"
      ? "decoration-cradula-green"
      : "decoration-cradula-red";

  return (
    <div className="flex justify-between font-body place-items-center">
      <Link
        href={"/"}
        className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
      >
        <ArrowLeftIcon
          width={20}
          className="stroke-cradula-green fill-cradula-green dark:stroke-cradula-red dark:fill-cradula-red 
          group-hover:animate-back-bounce"
        />
        <p>Back to safety</p>
      </Link>
      <Link
        href={`/articles/${encodeURIComponent(category)}`}
        className={`font-title dark:font-titleDark dark:tracking-wider text-xl dark:text-2xl animate-appear-fast 
        hover:scale-115 ease-in-out transition-transform duration-500 underline ${decoration} dark:decoration-cradula-red`}
      >
        {category}
      </Link>
    </div>
  );
};

export default ArticleHeader;
