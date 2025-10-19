import { describe, expect, it } from "vitest";
import sortArticles from "./sortArticles";

describe("Given I am trying to sort articles by date", () => {
  describe("When articles with different dates are provided", () => {
    const articles = [
      {
        id: "1",
        title: "Article 1",
        subtitle: "Subtitle 1",
        date: "02-02-2024",
        category: "Category 1",
      },
      {
        id: "2",
        title: "Article 2",
        subtitle: "Subtitle 2",
        date: "01-01-2023",
        category: "Category 1",
      },
      {
        id: "3",
        title: "Article 3",
        subtitle: "Subtitle 3",
        date: "03-03-2025",
        category: "Category 1",
      },
    ];

    it("Should return articles sorted from newest to oldest", () => {
      const sortedArticles = sortArticles(articles);

      expect(sortedArticles).toEqual([
        {
          id: "3",
          title: "Article 3",
          subtitle: "Subtitle 3",
          date: "03-03-2025",
          category: "Category 1",
        },
        {
          id: "1",
          title: "Article 1",
          subtitle: "Subtitle 1",
          date: "02-02-2024",
          category: "Category 1",
        },
        {
          id: "2",
          title: "Article 2",
          subtitle: "Subtitle 2",
          date: "01-01-2023",
          category: "Category 1",
        },
      ]);
    });
  });

  describe("When articles with the same date are provided", () => {
    const articles = [
      {
        id: "1",
        title: "Article 1",
        subtitle: "Subtitle 1",
        date: "01-01-2024",
        category: "Category 1",
      },
      {
        id: "2",
        title: "Article 2",
        subtitle: "Subtitle 2",
        date: "01-01-2024",
        category: "Category 1",
      },
      {
        id: "3",
        title: "Article 3",
        subtitle: "Subtitle 3",
        date: "02-02-2025",
        category: "Category 1",
      },
    ];

    it("Should return articles with the same date in their reversed order", () => {
      const sortedArticles = sortArticles(articles);

      expect(sortedArticles).toEqual([
        {
          id: "3",
          title: "Article 3",
          subtitle: "Subtitle 3",
          date: "02-02-2025",
          category: "Category 1",
        },
        {
          id: "2",
          title: "Article 2",
          subtitle: "Subtitle 2",
          date: "01-01-2024",
          category: "Category 1",
        },
        {
          id: "1",
          title: "Article 1",
          subtitle: "Subtitle 1",
          date: "01-01-2024",
          category: "Category 1",
        },
      ]);
    });
  });

  describe("When articles with invalid dates are provided", () => {
    const articles = [
      {
        id: "1",
        title: "Article 1",
        subtitle: "Subtitle 1",
        date: "invalid-date",
        category: "Category 1",
      },
      {
        id: "2",
        title: "Article 2",
        subtitle: "Subtitle 2",
        date: "01-01-2024",
        category: "Category 1",
      },
      {
        id: "3",
        title: "Article 3",
        subtitle: "Subtitle 3",
        date: "02-02-2025",
        category: "Category 1",
      },
    ];

    it("Should treat invalid dates as the oldest", () => {
      const sortedArticles = sortArticles(articles);

      expect(sortedArticles).toEqual([
        {
          id: "3",
          title: "Article 3",
          subtitle: "Subtitle 3",
          date: "02-02-2025",
          category: "Category 1",
        },
        {
          id: "2",
          title: "Article 2",
          subtitle: "Subtitle 2",
          date: "01-01-2024",
          category: "Category 1",
        },
        {
          id: "1",
          title: "Article 1",
          subtitle: "Subtitle 1",
          date: "invalid-date",
          category: "Category 1",
        },
      ]);
    });
  });

  describe("When a single article is provided", () => {
    const articles = [
      {
        id: "1",
        title: "Article 1",
        subtitle: "Subtitle 1",
        date: "01-01-2025",
        category: "Category 1",
      },
    ];

    it("Should return the same single article", () => {
      const sortedArticles = sortArticles(articles);

      expect(sortedArticles).toEqual(articles);
    });
  });

  describe("When an empty array is provided", () => {
    it("Should return an empty array", () => {
      const sortedArticles = sortArticles([]);

      expect(sortedArticles).toEqual([]);
    });
  });
});
