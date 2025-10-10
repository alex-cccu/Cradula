import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import safeDecodeURIComponent from "../utils/safeDecodeURIComponent";
import { notFound } from "next/navigation";
import { pageDirectory } from "./constants";

const getPageContent = async (slug: string) => {
  try {
    const fullPath = path.join(
      pageDirectory,
      safeDecodeURIComponent(slug) + ".md"
    );

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml,
      title: matterResult.data.title,
    };
  } catch (error) {
    console.error(error);
    return notFound();
  }
};

export default getPageContent;
