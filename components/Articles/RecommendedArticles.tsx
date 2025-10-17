import ZigZag from "@/assets/ZigZag";
import { ArticleItem } from "@/globalTypes";
import getShuffledColours from "@/lib/utils/getShuffledColours";

const RecommendedArticles = ({ articles }: { articles: ArticleItem[] }) => {
  const colours = getShuffledColours(["cradula-green", "cradula-orange"]);
  let colourIndex = -1;

  return (
    <div className="text-center flex flex-col mb-20">
      <div className="mb-4">
        <h2 className="font-title text-3xl dark:font-titleDark dark:text-4xl">
          Enjoy this article?
        </h2>
        <p className="font-body">Why not take a look some of our others!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {articles.map((article) => {
          colourIndex++;
          return (
            <div key={article.id} className="group mx-auto">
              <h3 className="font-title dark:font-titleDark text-2xl dark:text-3xl">
                {article.title}
              </h3>
              <ZigZag colour={colours[colourIndex]} animated={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedArticles;
