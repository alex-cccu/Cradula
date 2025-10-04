import { Category } from "@/globalTypes";
import ArticleItemList from "./ArticleListItem";
import { getAllArticles } from "@/lib/articles";

const HomePageContent = () => {
  const articles = getAllArticles();
  return (
    <section className="md:grid md:grid-cols-2 flex flex-col gap-15 lg:gap-10 z-2">
      {articles !== null &&
        articles.map((category: Category) => (
          <ArticleItemList
            category={category.category}
            articles={category.articles}
            key={category.category}
          />
        ))}
    </section>
  );
};

export default HomePageContent;
