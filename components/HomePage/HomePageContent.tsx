import ArticleItemList from "./ArticleListItem";
import { getCategorisedArticles } from "@/lib/articles";

const HomePageContent = () => {
  const articles = getCategorisedArticles();
  return (
    <section className="md:grid md:grid-cols-2 flex flex-col gap-15 lg:gap-10 z-2">
      {articles !== null &&
        Object.keys(articles).map((category) => (
          <ArticleItemList
            category={category}
            articles={articles[category]}
            key={category}
          />
        ))}
    </section>
  );
};

export default HomePageContent;
