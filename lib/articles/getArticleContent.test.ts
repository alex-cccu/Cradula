import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import * as fs from "fs";
import matter from "gray-matter";
import getArticleContent from "./getArticleContent";

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
    default: {
      ...actualFs,
    },
    readFileSync: vi.fn(() => "mocked content"),
  };
});

vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

describe("Given I want to get the content of an article", () => {
  let mockFileSync: Mock;
  let mockMatter: Mock;

  beforeEach(() => {
    mockFileSync = vi.mocked(fs.readFileSync);
    mockMatter = vi.mocked(matter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("When valid data is provided", () => {
    beforeEach(() => {
      mockFileSync.mockReturnValue("mocked content");
      mockMatter.mockReturnValue({
        content: "hello world",
        data: {
          title: "mocked title",
          category: "mocked category",
          date: "01-20-2000",
        },
      });
    });

    it("Should return the content of the article", async () => {
      const result = await getArticleContent({
        category: "category 1",
        article: "article 1",
      });
      expect(result).toStrictEqual({
        article: "article 1",
        category: "mocked category",
        contentHtml: "<p>hello world</p>\n",
        date: "January 20th 2000",
        readTime: "1 min read",
        title: "mocked title",
      });
    });
  });

  describe("When invalid data is provided", () => {
    beforeEach(() => {
      mockFileSync.mockImplementation(() => {
        throw new Error("File not found");
      });
    });

    it("Should error with a 404 response", async () => {
      await expect(
        getArticleContent({
          category: "bad category",
          article: "bad article",
        })
      ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");

      expect(mockMatter).not.toHaveBeenCalled();
    });
  });

  describe("When the article has a date in the future", () => {
    beforeEach(() => {
      mockFileSync.mockReturnValue("mocked content");
      mockMatter.mockReturnValue({
        data: {
          title: "future article",
          date: "01-20-2100",
          category: undefined,
        },
      });
    });

    it("Should error with a 404 response", async () => {
      await expect(
        getArticleContent({
          category: "category",
          article: "unreleased article",
        })
      ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");

      expect(mockMatter).toHaveBeenCalledOnce();
    });
  });

  describe("When the article has no content", () => {
    beforeEach(() => {
      mockFileSync.mockReturnValue("mocked content");
      mockMatter.mockReturnValue({
        content: "",
        data: {
          title: "",
          category: "",
          date: "",
        },
      });
    });

    // TODO: This needs to be improved.
    it("Should return with no content", async () => {
      const result = await getArticleContent({
        category: "category 1",
        article: "article 1",
      });
      expect(result).toStrictEqual({
        article: "article 1",
        category: "",
        contentHtml: "",
        date: "Invalid date",
        readTime: "1 min read",
        title: "",
      });
    });
  });
});
