import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Page } from "@/globalTypes";
import { pageDirectory } from "./constants";

const getAllPages = (): Page[] => {
  const fileNames = fs.readdirSync(pageDirectory);

  const pages = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(pageDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const articleData = matter(fileContents);

    return {
      id,
      title: articleData.data.title,
    };
  });

  return pages;
};

export default getAllPages;
