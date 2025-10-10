import * as fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import { articlesDirectory } from "./constants";
import getAllFromCategory from "./getAllFromCategory";

import type { ArticleItem, Category } from "@/globalTypes";

const getAllCategories = (): Category[] => {
  const folderNames = fs.readdirSync(articlesDirectory).filter((name) => {
    const fullPath = path.join(articlesDirectory, name);
    const isDir = fs.statSync(fullPath).isDirectory();

    // Exclude folders like [category]
    const isBracketed = /^\[.*\]$/.test(name);

    return isDir && !isBracketed;
  });

  return folderNames.map((folder) => getAllFromCategory(folder, 5));
};

export default getAllCategories;
