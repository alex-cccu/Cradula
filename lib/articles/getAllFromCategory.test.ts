import { Mock, beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import getAllFromCategory from "./getAllFromCategory";
import * as fs from "fs";
import * as getReadTime from "./getReadTime";

const mockArticleOne = {
  metadata: {
    title: "Mocked Title 1",
    subtitle: "Mocked Subtitle 1",
    date: "01-20-2000",
    category: "existing-category",
  },
};

const mockArticleTwo = {
  metadata: {
    title: "Mocked Title 2",
    subtitle: "Mocked Subtitle 2",
    date: "01-20-2000",
    category: "existing-category",
  },
};

const mockArticleThree = {
  metadata: {
    title: "Mocked Title 3",
    subtitle: "Mocked Subtitle 3",
    date: "01-20-2000",
    category: "existing-category",
  },
};

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
    readdirSync: vi.fn(),
    readFileSync: vi.fn(() => "mocked content"),
  };
});

vi.mock("./getReadTime", () => {
  return {
    default: vi.fn(() => "0 min read"),
  };
});

describe("Given I am trying to get all articles from a category", () => {
  let mockReaddirSync: Mock;
  let mockGetReadTime: Mock;

  beforeEach(() => {
    mockReaddirSync = vi.mocked(fs.readdirSync);
    mockGetReadTime = vi.mocked(getReadTime.default);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe("When a limit is provided", () => {
    describe("When a category is not found", () => {
      beforeEach(() => {
        mockReaddirSync.mockReturnValue(null);
      });

      it("Should error with 404", async () => {
        await expect(() =>
          getAllFromCategory("nonexistent-category", 2)
        ).rejects.toThrowError("NEXT_HTTP_ERROR_FALLBACK;404");
      });
    });

    describe("When a category is found", () => {
      describe("And articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([
            "article1.mdx",
            "article2.mdx",
            "article3.mdx",
          ]);

          vi.doMock(
            "@/articles/existing-category/article2.mdx",
            () => mockArticleTwo
          );
          vi.doMock(
            "@/articles/existing-category/article3.mdx",
            () => mockArticleThree
          );
        });

        it("Should return a category with a limited number of articles", async () => {
          vi.doMock(
            "@/articles/existing-category/article1.mdx",
            () => mockArticleOne
          );

          const result = await getAllFromCategory("existing-category", 2);

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article3",
                readTime: "0 min read",
                title: "Mocked Title 3",
                subtitle: "Mocked Subtitle 3",
              },
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article2",
                readTime: "0 min read",
                title: "Mocked Title 2",
                subtitle: "Mocked Subtitle 2",
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: "existing-category",
            date: "January 20th 2000",
            id: "article1",
            readTime: "0 min read",
            title: "Mocked Title 1",
            subtitle: "Mocked Subtitle 1",
          });
        });

        it("Should not return articles with a future date", async () => {
          const mockFutureArticle = {
            metadata: { ...mockArticleOne.metadata, date: "01-20-2100" },
          };
          vi.doMock(
            "@/articles/existing-category/article1.mdx",
            () => mockFutureArticle
          );

          const result = await getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article3",
                readTime: "0 min read",
                title: "Mocked Title 3",
                subtitle: "Mocked Subtitle 3",
              },
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article2",
                readTime: "0 min read",
                title: "Mocked Title 2",
                subtitle: "Mocked Subtitle 2",
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: "existing-category",
            date: "January 20th 2100",
            id: "article1",
            readTime: "0 min read",
            title: "Mocked Title 1",
            subtitle: "Mocked Subtitle 1",
          });
        });
      });

      describe("And no articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([]);
        });

        it("Should return the category with an empty articles array", async () => {
          const result = await getAllFromCategory("empty-category", 2);

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

      it("Should error with 404", async () => {
        await expect(() =>
          getAllFromCategory("nonexistent-category")
        ).rejects.toThrowError("NEXT_HTTP_ERROR_FALLBACK;404");
      });
    });

    describe("When a category is found", () => {
      describe("And articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([
            "article1.mdx",
            "article2.mdx",
            "article3.mdx",
          ]);
        });

        it("Should return a category with a limited number of articles", async () => {
          vi.doMock(
            "@/articles/existing-category/article1.mdx",
            () => mockArticleOne
          );
          vi.doMock(
            "@/articles/existing-category/article2.mdx",
            () => mockArticleTwo
          );
          vi.doMock(
            "@/articles/existing-category/article3.mdx",
            () => mockArticleThree
          );
          vi.resetModules();
          const result = await getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(3);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article3",
                readTime: "0 min read",
                title: "Mocked Title 3",
                subtitle: "Mocked Subtitle 3",
              },
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article2",
                readTime: "0 min read",
                title: "Mocked Title 2",
                subtitle: "Mocked Subtitle 2",
              },
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article1",
                readTime: "0 min read",
                title: "Mocked Title 1",
                subtitle: "Mocked Subtitle 1",
              },
            ],
          });
        });

        it("Should not return articles with a future date", async () => {
          const mockFutureArticle = {
            metadata: { ...mockArticleOne.metadata, date: "01-20-2100" },
          };
          vi.doMock(
            "@/articles/existing-category/article1.mdx",
            () => mockFutureArticle
          );
          vi.doMock(
            "@/articles/existing-category/article2.mdx",
            () => mockArticleTwo
          );
          vi.doMock(
            "@/articles/existing-category/article3.mdx",
            () => mockArticleThree
          );

          const result = await getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article3",
                readTime: "0 min read",
                title: "Mocked Title 3",
                subtitle: "Mocked Subtitle 3",
              },
              {
                category: "existing-category",
                date: "January 20th 2000",
                id: "article2",
                readTime: "0 min read",
                title: "Mocked Title 2",
                subtitle: "Mocked Subtitle 2",
              },
            ],
          });

          expect(result.articles).not.toContain({
            category: "existing-category",
            date: "January 20th 2100",
            id: "article1",
            readTime: "0 min read",
            title: "Mocked Title 1",
            subtitle: "Mocked Subtitle 1",
          });
        });
      });

      describe("And no articles exist in that category", () => {
        beforeEach(() => {
          mockReaddirSync.mockReturnValue([]);
        });

        it("Should return the category with an empty articles array", async () => {
          const result = await getAllFromCategory("empty-category");

          expect(result).toEqual({
            category: "empty-category",
            articles: [],
          });
        });
      });
    });
  });
});
