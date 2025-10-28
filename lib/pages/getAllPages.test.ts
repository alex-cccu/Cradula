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
      mockReaddirSync.mockReturnValue(["page1.mdx", "page2.mdx"]);
      vi.doMock("@/miscPages/page1.mdx", () => ({
        metadata: {
          title: "Page One",
        },
      }));
      vi.doMock("@/miscPages/page2.mdx", () => ({
        metadata: {
          title: "Page Two",
        },
      }));
    });

    it("Should return a category with a limited number of articles", async () => {
      const result = await getAllPages();

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          id: "page1",
          title: "Page One",
        },
        {
          id: "page2",
          title: "Page Two",
        },
      ]);
    });
  });

  describe("When no pages exist", () => {
    beforeEach(() => {
      mockReaddirSync.mockReturnValue([]);
    });

    it("Should return an empty array", async () => {
      const result = await getAllPages();

      expect(result).toEqual([]);
    });
  });
});
