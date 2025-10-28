import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import * as fs from "fs";
import matter from "gray-matter";
import getArticleContent from "./getArticleContent";

const mockArticle = {
  metadata: {
    title: "Mocked Title 1",
    subtitle: "Mocked Subtitle 1",
    date: "01-20-2000",
    category: "existing-category",
  },
  default: "<p>hello world</p>",
};

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
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

      vi.doMock("@/articles/existing-category/article1.mdx", () => mockArticle);

      mockMatter.mockReturnValue({
        content: "hello world",
      });
    });

    it("Should return the content of the article", async () => {
      const result = await getArticleContent({
        category: "existing-category",
        article: "article1",
      });
      expect(result).toStrictEqual({
        content: "<p>hello world</p>",
        title: "Mocked Title 1",
        subtitle: "Mocked Subtitle 1",
        category: "existing-category",
        date: "January 20th 2000",
        readTime: "1 min read",
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
      vi.doMock("@/articles/existing-category/article1.mdx", () => ({
        ...mockArticle,
        metadata: {
          ...mockArticle.metadata,
          date: "01-20-2100",
        },
      }));
    });

    it("Should error with a 404 response", async () => {
      await expect(
        getArticleContent({
          category: "existing-category",
          article: "unreleased article",
        })
      ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    });
  });

  describe("When the article has no content", () => {
    beforeEach(() => {
      mockFileSync.mockReturnValue("mocked content");
      vi.doMock("@/articles/existing-category/article1.mdx", () => ({
        metadata: {},
        default: "",
      }));
    });

    // TODO: This needs to be improved.
    it("Should return with no content", async () => {
      const result = await getArticleContent({
        category: "existing-category",
        article: "article1",
      });
      expect(result).toStrictEqual({
        category: undefined,
        content: "",
        date: "Invalid date",
        readTime: "1 min read",
        subtitle: undefined,
        title: undefined,
      });
    });
  });
});
