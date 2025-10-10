import { Mock, beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import getAllPages from "./getAllPages";
import * as fs from "fs";
import matter from "gray-matter";

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

describe("Given I am trying to get all misc pages", () => {
  let mockReaddirSync: Mock;
  let mockReadFileSync: Mock;
  let mockMatter: Mock;

  beforeEach(() => {
    mockReaddirSync = vi.mocked(fs.readdirSync);
    mockReadFileSync = vi.mocked(fs.readFileSync);
    mockMatter = vi.mocked(matter);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("When pages exist", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue(["page1.md", "page2.md"]);
      mockReadFileSync.mockReturnValue("mocked content");
      mockMatter.mockReturnValue({
        content: "hello world",
        data: {},
      });
    });

    it("Should return a category with a limited number of articles", () => {
      const result = getAllPages();

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          id: "page1",
          title: undefined,
        },
        {
          id: "page2",
          title: undefined,
        },
      ]);
    });
  });

  describe("When no pages exist", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue([]);
      mockReadFileSync.mockReturnValue("");
      mockMatter.mockReturnValue({});
    });

    it("Should return an empty array", () => {
      const result = getAllPages();

      expect(result).toEqual([]);
    });
  });
});
