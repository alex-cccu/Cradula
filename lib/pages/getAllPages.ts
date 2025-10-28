import * as fs from "fs";
import { Page } from "@/globalTypes";
import { pageDirectory } from "./constants";

type PageMetadata = {
  title: string;
};

const getAllPages = async (): Promise<Page[]> => {
  const fileNames = fs.readdirSync(pageDirectory);

  const pages = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.mdx$/, "");

      const articleData = await import(`@/miscPages/${fileName}`);
      const articleMetadata = articleData.metadata as PageMetadata;

      return {
        id,
        title: articleMetadata.title,
      };
    })
  );

  return pages;
};

export default getAllPages;
