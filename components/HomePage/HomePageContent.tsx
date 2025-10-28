import { Category } from "@/globalTypes";
import ArticleItemList from "./ArticleListItem";
import Link from "next/link";
import getAllCategories from "@/lib/articles/getAllCategories";

const HomePageContent = async () => {
  const categories = getAllCategories();
  const cols =
    (await categories).length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";
  return (
    <section
      className={`md:grid ${cols} flex flex-col gap-15 lg:gap-10 z-2 animate-appear`}
    >
      {categories !== null &&
        (await categories).map((category: Category) => (
          <div
            className="flex flex-col gap-5 text-center"
            key={category.category}
          >
            <h2 className="font-title dark:font-titleDark dark:uppercase dark:text-neutral-100 dark:tracking-wide text-4xl">
              <Link
                href={`/articles/${encodeURIComponent(category.category)}`}
                className="inline-block hover:scale-115 ease-in-out transition-transform duration-500"
              >
                {category.category}
              </Link>
            </h2>
            <ArticleItemList articles={category.articles} />
          </div>
        ))}
    </section>
  );
};

export default HomePageContent;
