import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import sortArticles from "./sortArticles";
import { notFound } from "next/navigation";

import type { ArticleItem, Category } from "@/globalTypes";
import { articlesDirectory } from "./constants";
import getReadTime from "./getReadTime";

const getAllFromCategory = (
  category: string,
  limit?: number
): Category | never => {
  try {
    category = safeDecodeURIComponent(category);
    const folderPath = path.join(articlesDirectory, category);
    const fileNames = fs.readdirSync(folderPath);

    let unsortedArticles = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(folderPath, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const article = matter(fileContents);
      const articleData = article.data as ArticleItem;

      return {
        id,
        title: articleData.title,
        subtitle: articleData.subtitle,
        date: articleData.date,
        category: articleData.category,
        readTime: getReadTime(article.content),
      };
    });

    // Strip out articles with a future date
    const date = new Date();
    unsortedArticles = unsortedArticles.filter(
      (article) => new Date(article.date) < date
    );

    let sortedArticles = sortArticles(unsortedArticles);

    if (limit) {
      sortedArticles = sortedArticles.slice(0, limit);
    }

    return {
      category,
      articles: sortedArticles,
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getAllFromCategory;
