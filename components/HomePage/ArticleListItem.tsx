import Link from "next/link";
import type { ArticleItem } from "@/globalTypes";
import { shuffle } from "@/lib/shuffle";

interface Props {
  category: string;
  articles: ArticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  const colors = [
    "stroke-cradula-red",
    "stroke-cradula-green",
    "stroke-cradula-blue",
    "stroke-cradula-yellow",
    "stroke-cradula-purple",
  ];
  shuffle(colors);
  let i = -1;
  return (
    <div className="flex flex-col gap-2.5 font-body text-lg">
      {articles.map((article, id) => {
        i++;
        return (
          <Link
            href={`/articles/${article.category}/${article.id}`}
            key={id}
            className="group text-neutral-900 dark:text-neutral-100 hover:scale-110 ease-in-out hover:font-bold transition duration-250"
          >
            {article.title}
            <svg
              className="mx-auto block w-[75%] h-3"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 8 L10 2 L20 8 L30 2 L40 8 L50 2 L60 8 L70 2 L80 8 L90 2 L100 8"
                //   stroke={colors[i]}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
                className={`group-hover:animate-draw ease-in-out duration-300 dark:stroke-cradula-red ${colors[i]}`}
              />
            </svg>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleItemList;
