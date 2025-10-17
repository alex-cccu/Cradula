import { shuffle } from "../utils/shuffle";
import getAllCategories from "./getAllCategories";
import getAllFromCategory from "./getAllFromCategory";

const getRecommendedArticles = async ({
  currentArticleId,
  currentCategory,
}: {
  currentArticleId: string;
  currentCategory: string;
}) => {
  const articles = await getAllFromCategory(currentCategory);
  const recommendedArticles = articles.articles.filter(
    (article) => article.id !== currentArticleId
  );

  if (recommendedArticles.length > 1) {
    return recommendedArticles.slice(0, 2);
  }

  const allCategories = await getAllCategories();
  const otherCategories = allCategories.filter(
    (category) =>
      category.category !== currentCategory && category.articles.length > 0
  );

  const remainingArticles = otherCategories.flatMap(
    (category) => category.articles
  );
  shuffle(remainingArticles);

  recommendedArticles.push(
    ...remainingArticles.slice(0, 2 - recommendedArticles.length)
  );

  return recommendedArticles;
};

export default getRecommendedArticles;
