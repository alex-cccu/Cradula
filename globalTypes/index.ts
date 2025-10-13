export type ArticleItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
};

export type Page = {
  id: string;
  title: string;
};

export type Category = {
  category: string;
  articles: ArticleItem[];
};
