import * as fs from "fs";
import path from "path";
import { articlesDirectory } from "./constants";

type ArticleLocation = {
  article: string;
  category: string;
};

const getAllArticleLocations = (): ArticleLocation[] => {
  const folderNames = fs.readdirSync(articlesDirectory).filter((name) => {
    const fullPath = path.join(articlesDirectory, name);
    const isDir = fs.statSync(fullPath).isDirectory();

    // Exclude folders like [category]
    const isBracketed = /^\[.*\]$/.test(name);

    return isDir && !isBracketed;
  });

  return folderNames.flatMap((folder) => {
    const folderPath = path.join(articlesDirectory, folder);
    const fileNames = fs.readdirSync(folderPath);

    return fileNames.map((fileName) => {
      const articleId = fileName.replace(/\.mdx$/, "");
      return {
        article: articleId,
        category: folder,
      };
    });
  });
};

export default getAllArticleLocations;
