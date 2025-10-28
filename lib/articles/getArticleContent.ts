import path from "path";
import moment from "moment";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import { notFound } from "next/navigation";
import { articlesDirectory, dateFormat } from "./constants";
import getReadTime from "./getReadTime";
import { ArticleMetadata } from "@/articles/types";
import * as fs from "fs";
import matter from "gray-matter";

const getArticleContent = async ({
  category,
  article,
}: {
  category: string;
  article: string;
}) => {
  try {
    const pathSuffix = path.join(
      `${safeDecodeURIComponent(category)}`,
      `${safeDecodeURIComponent(article)}.mdx`
    );

    const articleData = await import(`@/articles/${pathSuffix}`);
    const articleContent = articleData.default;
    const articleMetadata = articleData.metadata as ArticleMetadata;

    // Get the raw content for read time calculation
    const fileContents = fs.readFileSync(
      path.join(articlesDirectory, pathSuffix),
      "utf8"
    );
    const matterResult = matter(fileContents);
    const content = matterResult.content;

    return {
      content: articleContent,
      title: articleMetadata.title,
      subtitle: articleMetadata?.subtitle,
      category: articleMetadata.category,
      date: moment(articleMetadata.date, dateFormat).format("MMMM Do YYYY"),
      readTime: getReadTime(content),
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getArticleContent;
