import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getAllFromCategory } from "@/lib/articles";
import Splodge from "@/assets/Splodge";
import Splodge2 from "@/assets/Splodge2";
import ArticleItemList from "@/components/HomePage/ArticleListItem";

const Category = async ({ params }: { params: { category: string } }) => {
  const loadedParams = await params;
  const { articles, category } = getAllFromCategory(loadedParams.category);

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden min-h-svh w-screen">
      <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
        <div className="flex justify-between font-body">
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
        </div>
        <section className="flex flex-col gap-5 text-center z-2 animate-appear">
          <h2 className="font-title dark:font-titleDark text-4xl dark:text-5xl text-center tracking-tight dark:tracking-normal underline decoration-cradula-green dark:decoration-cradula-red">
            {category}
          </h2>
          <ArticleItemList category={category} articles={articles} />
        </section>
      </section>
      <div className="z-1 absolute md:-right-[180px] -right-[300px] top-1/4 lg:top-1/6 animate-appear">
        <Splodge />
      </div>
      {/* <div className="z-1 absolute md:-left-[120px] top-3/4 -left-[180px]">
        <Splodge2 />
      </div> */}
    </div>
  );
};

export default Category;
