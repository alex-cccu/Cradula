import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import getArticleContent from "@/lib/articles/getArticleContent";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import ZigZag from "@/assets/ZigZag";
import ArticleHeader from "@/components/Articles/ArticleHeader";
import getRecommendedArticles from "@/lib/articles/getRecommendedArticles";
import RecommendedArticles from "@/components/Articles/RecommendedArticles";

const Article = async ({
  params,
}: {
  params: { category: string; article: string };
}) => {
  const loadedParams = await params;
  const [articleContent, recommendedArticles] = await Promise.all([
    getArticleContent({
      category: loadedParams.category,
      article: loadedParams.article,
    }),
    getRecommendedArticles({
      currentArticleId: loadedParams.article,
      currentCategory: loadedParams.category,
    }),
  ]);
  const colours = getShuffledColours(["cradula-green"]);

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden w-screen">
      <section className="mx-auto w-10/12 md:w-2/3 lg:w-1/2 mt-20 flex flex-col gap-5">
        <ArticleHeader category={articleContent.category} colour={colours[0]} />
        <div className="flex flex-col mx-auto text-center my-5 animate-appear-fast">
          <h1 className="font-title dark:font-titleDark text-4xl/12 dark:text-5xl text-center tracking-tight dark:tracking-normal">
            <ZigZag
              colour={colours[0]}
              animated={false}
              text={articleContent.title}
            />
          </h1>
          <small className="text-neutral-600 dark:text-neutral-300 font-body pt-1.5 dark:pt-1">
            {articleContent.readTime} | Published {articleContent.date}
          </small>
        </div>
        <article
          className="article z-2 animate-appear"
          dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }}
        />
        <div className="animate-appear">
          <hr className="bg-cradula-green dark:bg-cradula-red rounded-sm h-1 border-0 w-full justify-center m-5 mx-auto z-2" />
          <RecommendedArticles articles={recommendedArticles} />
        </div>
      </section>
      <div className="z-0 absolute md:-right-[180px] -right-[300px] top-1/4 lg:top-1/6 animate-appear-slow">
        <Splodge />
      </div>
      <div className="bottom-60 z-0 absolute md:-left-[120px] -left-[200px] animate-appear-slow">
        <Splodge2 />
      </div>
    </div>
  );
};

export default Article;
