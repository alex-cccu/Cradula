import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import { notFound } from "next/navigation";
import { articlesDirectory, dateFormat } from "./constants";
import getReadTime from "./getReadTime";
import { ArticleItem } from "@/globalTypes";

const getArticleContent = async ({
  category,
  article,
}: {
  category: string;
  article: string;
}) => {
  try {
    const fullPath = path.join(
      articlesDirectory,
      `${safeDecodeURIComponent(category)}`,
      `${safeDecodeURIComponent(article)}.md`
    );

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const articleData = matterResult.data as ArticleItem;
    const articleContent = matterResult.content;

    if (new Date(articleData.date) > new Date()) {
      return notFound();
    }

    const processedContent = await remark().use(html).process(articleContent);
    const contentHtml = processedContent.toString();

    return {
      article,
      contentHtml,
      title: articleData.title,
      subtitle: articleData.subtitle,
      category: articleData.category,
      date: moment(articleData.date, dateFormat).format("MMMM Do YYYY"),
      readTime: getReadTime(articleContent),
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getArticleContent;
