import ZigZag from "@/assets/ZigZag";
import { ArticleItem } from "@/globalTypes";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import Link from "next/link";

const RecommendedArticles = ({ articles }: { articles: ArticleItem[] }) => {
  const colours = getShuffledColours(["cradula-green", "cradula-orange"]);
  let colourIndex = -1;

  return (
    <div className="text-center flex flex-col mb-20">
      <div className="mb-6 ">
        <h2 className="font-title text-3xl dark:font-titleDark dark:text-4xl">
          Enjoy this article?
        </h2>
        <p className="font-body">Why not take a look at some of our others!</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {articles.map((article) => {
          colourIndex++;
          return (
            <Link
              href={`/articles/${encodeURIComponent(
                article.category
              )}/${encodeURIComponent(article.id)}`}
              key={article.id}
              className="group mx-auto border bg-neutral-100 dark:bg-neutral-900 border-cradula-green 
              dark:border-cradula-red px-8 pt-8 rounded-3xl shadow-lg transition-transform hover:scale-[1.1] 
              ease-in-out duration-800 z-2"
            >
              <h3 className="font-title dark:font-titleDark text-2xl dark:text-3xl">
                {article.title}
              </h3>
              <ZigZag
                colour={colours[colourIndex % colours.length]}
                animated={true}
              />
              <div className="flex flex-col mx-auto">
                <p>{article.subtitle}</p>
                <div className="flex flex-row justify-between mx-8 my-4">
                  <small>{article.readTime}</small>
                  <small>{article.date}</small>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedArticles;
