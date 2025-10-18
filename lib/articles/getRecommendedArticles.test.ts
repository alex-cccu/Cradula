import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import getRecommendedArticles from "./getRecommendedArticles";
import * as getAllFromCategory from "./getAllFromCategory";
import * as getAllCategories from "./getAllCategories";

vi.mock("./getAllFromCategory", () => ({
  default: vi.fn(),
}));

vi.mock("./getAllCategories", () => ({
  default: vi.fn(),
}));

describe("Given I am trying to get recommended articles", () => {
  let mockGetAllFromCategory: Mock;
  let mockGetAllCategories: Mock;

  beforeEach(() => {
    mockGetAllFromCategory = vi.mocked(getAllFromCategory.default);
    mockGetAllCategories = vi.mocked(getAllCategories.default);
  });
  describe("When there are enough articles in the current category", () => {
    beforeEach(() => {
      mockGetAllFromCategory.mockResolvedValue({
        category: "category1",
        articles: [
          { id: "article-1" },
          { id: "article-2" },
          { id: "article-3" },
        ],
      });
    });

    it("Should return two articles from the current category", async () => {
      const recommendedArticles = await getRecommendedArticles({
        currentArticleId: "article-1",
        currentCategory: "category",
      });

      expect(recommendedArticles).toHaveLength(2);
      expect(recommendedArticles).not.toContainEqual({ id: "article-1" });
      expect(mockGetAllFromCategory).toHaveBeenCalledWith("category");
      expect(mockGetAllCategories).not.toHaveBeenCalled();
    });
  });

  describe("When there are not enough articles in the current category", () => {
    beforeEach(() => {
      mockGetAllFromCategory.mockResolvedValue({
        category: "category1",
        articles: [{ id: "article-1" }, { id: "article-2" }],
      });
      mockGetAllCategories.mockResolvedValue([
        {
          category: "category1",
          articles: [{ id: "article-1" }, { id: "article-2" }],
        },
        {
          category: "category2",
          articles: [{ id: "article-3" }],
        },
      ]);
    });

    it("Should return articles from other categories to fill the gap", async () => {
      const recommendedArticles = await getRecommendedArticles({
        currentArticleId: "article-1",
        currentCategory: "category1",
      });

      expect(recommendedArticles).toHaveLength(2);
      expect(recommendedArticles).not.toContainEqual({ id: "article-1" });
      expect(recommendedArticles).toContainEqual({ id: "article-2" });
      expect(recommendedArticles).toContainEqual({ id: "article-3" });
      expect(mockGetAllFromCategory).toHaveBeenCalledWith("category1");
      expect(mockGetAllCategories).toHaveBeenCalled();
    });
  });

  describe("When there are no other articles in the current category", () => {
    beforeEach(() => {
      mockGetAllFromCategory.mockResolvedValue({
        category: "category1",
        articles: [{ id: "article-1" }],
      });
      mockGetAllCategories.mockResolvedValue([
        {
          category: "category1",
          articles: [{ id: "article-1" }],
        },
        {
          category: "category2",
          articles: [{ id: "article-2" }],
        },
        {
          category: "category3",
          articles: [{ id: "article-3" }],
        },
      ]);
    });

    it("Should return two articles from other categories", async () => {
      const recommendedArticles = await getRecommendedArticles({
        currentArticleId: "article-1",
        currentCategory: "category1",
      });

      expect(recommendedArticles).toHaveLength(2);
      expect(recommendedArticles).not.toContainEqual({ id: "article-1" });
      expect(recommendedArticles).toContainEqual({ id: "article-2" });
      expect(recommendedArticles).toContainEqual({ id: "article-3" });
      expect(mockGetAllFromCategory).toHaveBeenCalledWith("category1");
      expect(mockGetAllCategories).toHaveBeenCalled();
    });
  });
});
