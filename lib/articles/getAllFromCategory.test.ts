import { Mock, beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import getAllFromCategory from "./getAllFromCategory";
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

describe("Given I am trying to get all articles from a category", () => {
  let mockReaddirSync: Mock;

  beforeEach(() => {
    mockReaddirSync = vi.mocked(fs.readdirSync);
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
        });

        it("Should return a category with a limited number of articles", () => {
          const result = getAllFromCategory("existing-category", 2);

          expect(result.articles).toHaveLength(2);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                id: "article3",
                title: undefined,
                date: undefined,
                category: undefined,
              },
              {
                id: "article2",
                title: undefined,
                date: undefined,
                category: undefined,
              },
            ],
          });

          expect(result.articles).not.toContain({
            id: "article1",
            title: undefined,
            date: undefined,
            category: undefined,
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
        });

        it("Should return a category with a limited number of articles", () => {
          const result = getAllFromCategory("existing-category");

          expect(result.articles).toHaveLength(3);

          expect(result).toEqual({
            category: "existing-category",
            articles: [
              {
                id: "article3",
                title: undefined,
                date: undefined,
                category: undefined,
              },
              {
                id: "article2",
                title: undefined,
                date: undefined,
                category: undefined,
              },
              {
                id: "article1",
                title: undefined,
                date: undefined,
                category: undefined,
              },
            ],
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
