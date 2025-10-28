import * as fs from "fs";
import path from "path";
import { articlesDirectory } from "./constants";

type CategoryLocation = {
  category: string;
};

const getAllCategoryLocations = async (): Promise<CategoryLocation[]> => {
  const folderNames = fs.readdirSync(articlesDirectory).filter((name) => {
    const fullPath = path.join(articlesDirectory, name);
    const isDir = fs.statSync(fullPath).isDirectory();

    // Exclude folders like [category]
    const isBracketed = /^\[.*\]$/.test(name);

    return isDir && !isBracketed;
  });

  return folderNames.map((folder) => ({
    category: folder,
  }));
};

export default getAllCategoryLocations;
