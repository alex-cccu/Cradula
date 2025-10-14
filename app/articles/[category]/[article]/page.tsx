import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import getArticleContent from "@/lib/articles/getArticleContent";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import ZigZag from "@/assets/ZigZag";
import ArticleHeader from "@/components/Articles/ArticleHeader";

const Article = async ({
  params,
}: {
  params: { category: string; article: string };
}) => {
  const loadedParams = await params;
  const articleContent = await getArticleContent({
    category: loadedParams.category,
    article: loadedParams.article,
  });
  const colours = getShuffledColours(["cradula-green"]);

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden w-screen">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <ArticleHeader category={articleContent.category} colour={colours[0]} />
        <div className="flex flex-col mx-auto text-center my-5 animate-appear-fast">
          <h1 className="font-title dark:font-titleDark text-4xl dark:text-5xl text-center tracking-tight dark:tracking-normal">
            {articleContent.title}
          </h1>
          <ZigZag colour={colours[0]} animated={false} />
          <small className="text-neutral-600 dark:text-neutral-300 font-body pt-1.5 dark:pt-1">
            {articleContent.readTime} | Published {articleContent.date}
          </small>
        </div>
        <article
          className="article z-1 animate-appear"
          dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }}
        />
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
