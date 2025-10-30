import Link from "next/link";
import Splodge from "@/assets/Splodge";
import ArticleItemList from "@/components/HomePage/ArticleListItem";
import getAllFromCategory from "@/lib/articles/getAllFromCategory";
import getShuffledColours from "@/lib/utils/getShuffledColours";
import getAllCategoryLocations from "@/lib/articles/getAllCategoryLocations";
import BackArrow from "@/assets/BackArrow";

const Category = async ({ params }: { params: { category: string } }) => {
  const loadedParams = await params;
  const [{ articles, category }, colors] = await Promise.all([
    getAllFromCategory(loadedParams.category),
    getShuffledColours([
      "cradula-green",
      "cradula-red",
      "cradula-blue",
      "cradula-yellow",
      "cradula-purple",
    ]),
  ]);

  const articlePlural = articles.length > 1 ? " articles" : " article";

  return (
    <div className="relative w-screen">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <div className="flex justify-between font-body">
          <Link
            href={"/"}
            className="group hover:scale-105 ease-in-out transition-transform duration-500 flex flex-row gap-1 place-items-center"
          >
            <BackArrow />
            <p>Back to safety</p>
          </Link>
          <span className="animate-appear">
            <span className="text-cradula-green dark:text-cradula-red">
              {articles.length}
            </span>
            {articlePlural}
          </span>
        </div>
        <section className="flex flex-col gap-5 text-center z-2 animate-appear">
          <div className="mx-auto">
            <h1
              className={`font-title dark:font-titleDark text-4xl/12 dark:text-5xl text-center tracking-tight dark:tracking-normal underline decoration-${colors[0]} dark:decoration-cradula-red`}
            >
              {category}
            </h1>
          </div>
          <ArticleItemList articles={articles} />
        </section>
      </section>
      <div className="z-1 absolute md:-right-[180px] -right-[300px] top-1/4 lg:top-1/6 animate-appear">
        <Splodge />
      </div>
    </div>
  );
};

export default Category;

export function generateStaticParams() {
  return getAllCategoryLocations();
}

export const dynamicParams = false;
