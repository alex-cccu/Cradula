import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getArticleContent } from "@/lib/articles";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";

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

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden w-screen">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <div className="flex justify-between font-body place-items-center flex-col sm:hidden">
          <Link
            href={`/articles/${articleContent.category}`}
            className="font-title text-2xl dark:font-titleDark animate-appear hover:scale-115 ease-in-out transition-transform duration-500"
          >
            {articleContent.category}
          </Link>
        </div>
        <div className="flex justify-between font-body place-items-center">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
          >
            <ArrowLeftIcon
              width={20}
              className="stroke-cradula-green fill-cradula-green dark:stroke-cradula-red dark:fill-cradula-red group-hover:animate-back-bounce"
            />
            <p>Back to safety</p>
          </Link>
          <Link
            href={`/articles/${articleContent.category}`}
            className="font-title text-2xl dark:font-titleDark animate-appear hover:scale-115 ease-in-out transition-transform duration-500 hidden sm:block"
          >
            {articleContent.category}
          </Link>
          <p className="animate-appear">{articleContent.date.toString()}</p>
        </div>
        <article
          className="article z-1 animate-appear"
          dangerouslySetInnerHTML={{ __html: articleContent.contentHtml }}
        />
      </section>
      <div className="z-0 absolute md:-right-[180px] -right-[300px] top-1/4 lg:top-1/6 animate-appear">
        <Splodge />
      </div>
      <div className="bottom-60 z-0 absolute md:-left-[120px] -left-[200px] animate-appear">
        <Splodge2 />
      </div>
    </div>
  );
};

export default Article;
