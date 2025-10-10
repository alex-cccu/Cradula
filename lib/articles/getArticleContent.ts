import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import { notFound } from "next/navigation";
import { articlesDirectory, dateFormat } from "./constants";

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

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    if (new Date(matterResult.data.date) > new Date()) {
      return notFound();
    }

    return {
      article,
      contentHtml,
      title: matterResult.data.title,
      category: matterResult.data.category,
      date: moment(matterResult.data.date, dateFormat).format("MMMM Do YYYY"),
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getArticleContent;
