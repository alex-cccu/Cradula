import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import sortArticles from "./sortArticles";
import { notFound } from "next/navigation";

import type { Category } from "@/globalTypes";
import { articlesDirectory, dateFormat } from "./constants";
import getReadTime from "./getReadTime";
import moment from "moment";
import { ArticleMetadata } from "@/articles/types";

const getAllFromCategory = async (
  category: string,
  limit?: number
): Promise<Category | never> => {
  try {
    category = safeDecodeURIComponent(category);
    const folderPath = path.join(articlesDirectory, category);
    const fileNames = fs.readdirSync(folderPath);

    let unsortedArticles = await Promise.all(
      fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.mdx$/, "");

        const pathSuffix = path.join(
          `${safeDecodeURIComponent(category)}`,
          `${safeDecodeURIComponent(fileName)}`
        );

        const articleData = await import(`@/articles/${pathSuffix}`);
        const articleMetadata = articleData.metadata as ArticleMetadata;

        // Get the raw content for read time calculation
        const fileContents = fs.readFileSync(
          path.join(articlesDirectory, pathSuffix),
          "utf8"
        );
        const matterResult = matter(fileContents);
        const content = matterResult.content;

        return {
          id,
          title: articleMetadata.title,
          subtitle: articleMetadata.subtitle,
          date: articleMetadata.date,
          category: articleMetadata.category,
          readTime: getReadTime(content),
        };
      })
    );

    // Strip out articles with a future date
    const date = new Date();
    unsortedArticles = unsortedArticles.filter(
      (article) => new Date(article.date) < date
    );

    let sortedArticles = sortArticles(unsortedArticles);

    if (limit) {
      sortedArticles = sortedArticles.slice(0, limit);
    }

    sortedArticles = sortedArticles.map((article) => ({
      ...article,
      date: moment(article.date, dateFormat).format("MMMM Do YYYY"),
    }));

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
