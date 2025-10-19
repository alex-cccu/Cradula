export type ArticleItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime?: string;
};

export type Page = {
  id: string;
  title: string;
};

export type Category = {
  category: string;
  articles: ArticleItem[];
};
