import { Mock, beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import getAllFromCategory from "./getAllFromCategory";
import matter from "gray-matter";
import * as fs from "fs";

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
    default: {
      ...actualFs,
    },
    readdirSync: vi.fn(),
    readFileSync: vi.fn(() => "mocked content"),
  };
});

vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

describe("Given I am trying to get all articles from a category", () => {
  let mockReaddirSync: Mock;
  let mockMatter: Mock;

  beforeEach(() => {
    mockReaddirSync = vi.mocked(fs.readdirSync);
    mockMatter = vi.mocked(matter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("When a limit is provided", () => {
    describe("When a category is not found", () => {
      beforeEach(() => {
        mockReaddirSync.mockReturnValue(null);
      });

      it("Should error with 404", () => {
        expect(() =>
          getAllFromCategory("nonexistent-category", 2)
        ).toThrowError("NEXT_HTTP_ERROR_FALLBACK;404");
      });
    });

    describe("When a category is found", () => {
      describe("And articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([
            "article1.md",
            "article2.md",
            "article3.md",
          ]);
          mockMatter.mockReturnValue({
            data: {
              title: undefined,
              date: "01-20-2000",
              category: undefined,
            },
            content: "mocked content",
          });
        });

        it("Should return a category with a limited number of articles", () => {
          const result = getAllFromCategory("existing-category", 2);

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: undefined,
                date: "01-20-2000",
                id: "article3",
                readTime: "1 min read",
                title: undefined,
              },
              {
                category: undefined,
                date: "01-20-2000",
                id: "article2",
                readTime: "1 min read",
                title: undefined,
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: undefined,
            date: undefined,
            id: "article1",
            readTime: "1 min read",
            title: undefined,
          });
        });

        it("Should not return articles with a future date", () => {
          mockMatter.mockReturnValueOnce({
            data: {
              title: "future article",
              date: "01-20-2100",
              category: undefined,
            },
            content: "mocked content",
          });

          const result = getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: undefined,
                date: "01-20-2000",
                id: "article3",
                readTime: "1 min read",
                title: undefined,
              },
              {
                category: undefined,
                date: "01-20-2000",
                id: "article2",
                readTime: "1 min read",
                title: undefined,
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: undefined,
            date: "01-20-2100",
            id: "article1",
            readTime: "1 min read",
            title: undefined,
          });
        });
      });

      describe("And no articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([]);
        });

        it("Should return the category with an empty articles array", () => {
          const result = getAllFromCategory("empty-category", 2);

          expect(result).toEqual({
            category: "empty-category",
            articles: [],
          });
        });
      });
    });
  });

  describe("When no limit is provided", () => {
    describe("When a category is not found", () => {
      beforeEach(() => {
        mockReaddirSync.mockReturnValue(null);
      });

      it("Should error with 404", () => {
        expect(() => getAllFromCategory("nonexistent-category")).toThrowError(
          "NEXT_HTTP_ERROR_FALLBACK;404"
        );
      });
    });

    describe("When a category is found", () => {
      describe("And articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([
            "article1.md",
            "article2.md",
            "article3.md",
          ]);
          mockMatter.mockReturnValue({
            data: {
              title: undefined,
              date: "01-20-2000",
              category: undefined,
            },
            content: "mocked content",
          });
        });

        it("Should return a category with a limited number of articles", () => {
          const result = getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(3);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: undefined,
                date: "01-20-2000",
                id: "article3",
                readTime: "1 min read",
                title: undefined,
              },
              {
                category: undefined,
                date: "01-20-2000",
                id: "article2",
                readTime: "1 min read",
                title: undefined,
              },
              {
                category: undefined,
                date: "01-20-2000",
                id: "article1",
                readTime: "1 min read",
                title: undefined,
              },
            ],
          });
        });

        it("Should not return articles with a future date", () => {
          mockMatter.mockReturnValueOnce({
            data: {
              title: "future article",
              date: "01-20-2100",
              category: undefined,
            },
            content: "mocked content",
          });

          const result = getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: undefined,
                date: "01-20-2000",
                id: "article3",
                readTime: "1 min read",
                title: undefined,
              },
              {
                category: undefined,
                date: "01-20-2000",
                id: "article2",
                readTime: "1 min read",
                title: undefined,
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: undefined,
            date: "01-20-2100",
            id: "article1",
            readTime: "1 min read",
            title: undefined,
          });
        });
      });

      describe("And no articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([]);
        });

        it("Should return the category with an empty articles array", () => {
          const result = getAllFromCategory("empty-category");

          expect(result).toEqual({
            category: "empty-category",
            articles: [],
          });
        });
      });
    });
  });
});
