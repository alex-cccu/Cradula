import Link from "next/link";
import type { ArticleItem } from "@/globalTypes";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import ZigZag from "@/assets/ZigZag";

const ArticleItemList = ({ articles }: { articles: ArticleItem[] }) => {
  const colors = getShuffledColours(["cradula-orange", "cradula-pink"]);
  let i = -1;
  return (
    <div className="flex flex-col gap-2.5 font-body text-lg">
      {articles.map((article, id) => {
        i = (i + 1) % colors.length;
        return (
          <Link
            href={`/articles/${encodeURIComponent(
              article.category
            )}/${encodeURIComponent(article.id)}`}
            key={id}
            className="group text-neutral-900 dark:text-neutral-100 hover:scale-110 ease-in-out hover:font-bold transition duration-250 mx-auto"
          >
            <ZigZag text={article.title} colour={colors[i]} />
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleItemList;
