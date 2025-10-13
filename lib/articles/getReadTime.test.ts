import { describe, it, expect } from "vitest";
import getReadTime from "./getReadTime";

describe("Given I want to get the read time of an article", () => {
  describe("When valid content is provided", () => {
    const content = "Word ";
    const testCases = [
      {
        words: 50,
        expected: "1 min read",
      },
      {
        words: 200,
        expected: "1 min read",
      },
      {
        words: 250,
        expected: "2 min read",
      },
      {
        words: 500,
        expected: "3 min read",
      },
      {
        words: 750,
        expected: "4 min read",
      },
      {
        words: 1000,
        expected: "5 min read",
      },
      {
        words: 1001,
        expected: "6 min read",
      },
    ];

    testCases.forEach(({ words, expected }) => {
      it(`Should return with '${expected}' for ${words} words`, () => {
        const result = getReadTime(content.repeat(words));
        expect(result).toBe(expected);
      });
    });
  });

  describe("When empty content is provided", () => {
    it("Then it should return '0 min read'", () => {
      const result = getReadTime(null as unknown as string);
      expect(result).toBe("0 min read");
    });
  });
});
