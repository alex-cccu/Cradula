import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import sortArticles from "./sortArticles";
import { notFound } from "next/navigation";

import type { Category } from "@/globalTypes";
import { articlesDirectory } from "./constants";

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
      const articleData = matter(fileContents);

      return {
        id,
        title: articleData.data.title,
        date: articleData.data.date,
        category: articleData.data.category,
      };
    });

    unsortedArticles = unsortedArticles.filter(
      (article) => new Date(article.date) < new Date()
    );

    let articles = sortArticles(unsortedArticles);
    if (limit) {
      articles = articles.slice(0, limit);
    }

    return {
      category,
      articles,
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getAllFromCategory;
