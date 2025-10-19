import { Mock, beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import * as fs from "fs";
import getAllFromCategory from "./getAllFromCategory";
import getAllCategories from "./getAllCategories";

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
    readdirSync: vi.fn(),
    readFileSync: vi.fn(() => "mocked content"),
    statSync: vi.fn(() => ({
      isDirectory: () => true,
    })),
  };
});

vi.mock("./getAllFromCategory", () => ({
  default: vi.fn(),
}));

describe("Given I want to get all categories", () => {
  let mockReaddirSync: Mock;
  let mockGetAllFromCategory: Mock;

  beforeEach(() => {
    mockReaddirSync = vi.mocked(fs.readdirSync);
    mockGetAllFromCategory = vi.mocked(getAllFromCategory);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("When valid folders exist in the articles directory", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue(["category1", "category2"]);
      mockGetAllFromCategory.mockReturnValueOnce({
        category: "category1",
        articles: [],
      });
      mockGetAllFromCategory.mockReturnValueOnce({
        category: "category2",
        articles: [],
      });
    });

    it("Should return all categories", () => {
      const categories = getAllCategories();

      expect(mockGetAllFromCategory).toHaveBeenCalledTimes(2);
      expect(categories).toHaveLength(2);
      expect(categories).toEqual([
        { category: "category1", articles: [] },
        { category: "category2", articles: [] },
      ]);
    });
  });

  describe("When no valid folders exist in the articles directory", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue([]);
    });

    it("Should return an empty array", () => {
      const categories = getAllCategories();

      expect(mockGetAllFromCategory).toHaveBeenCalledTimes(0);
      expect(categories).toHaveLength(0);
      expect(categories).toEqual([]);
    });
  });

  describe("When folders with brackets exist in the articles directory", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue(["[category1]", "category2"]);
      mockGetAllFromCategory.mockReturnValueOnce({
        category: "category2",
        articles: [],
      });
    });

    it("Should return only the valid categories", () => {
      const categories = getAllCategories();

      expect(mockGetAllFromCategory).toHaveBeenCalledTimes(1);
      expect(categories).toHaveLength(1);
      expect(categories).toEqual([{ category: "category2", articles: [] }]);
    });
  });
});
