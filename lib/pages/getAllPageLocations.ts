import * as fs from "fs";
import { pageDirectory } from "./constants";

const getAllPageLocations = () => {
  const fileNames = fs.readdirSync(pageDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
};

export default getAllPageLocations;
