import { Category } from "@/globalTypes";
import ArticleItemList from "./ArticleListItem";
import { getAllArticles } from "@/lib/articles";
import Link from "next/link";

const HomePageContent = () => {
  const articles = getAllArticles();
  return (
    <section className="md:grid md:grid-cols-2 flex flex-col gap-15 lg:gap-10 z-2">
      {articles !== null &&
        articles.map((category: Category) => (
          <div
            className="flex flex-col gap-5 text-center"
            key={category.category}
          >
            <h2 className="font-title dark:font-titleDark dark:uppercase dark:text-neutral-100 dark:tracking-wide text-4xl">
              <Link
                href={`/articles/${category.category}`}
                className="inline-block hover:scale-115 ease-in-out transition-transform duration-500"
              >
                {category.category}
              </Link>
            </h2>
            <ArticleItemList
              category={category.category}
              articles={category.articles}
            />
          </div>
        ))}
    </section>
  );
};

export default HomePageContent;
