import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import * as fs from "fs";
import matter from "gray-matter";
import getPageContent from "./getPageContent";

vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs");
  return {
    ...actualFs,
    default: {
      ...actualFs,
    },
    readFileSync: vi.fn(() => "mocked content"),
  };
});

vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

describe("Given I want to get the content of an page", () => {
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
      mockMatter.mockReturnValue({
        content: "hello world",
        data: {
          title: "mocked title",
        },
      });
    });

    it("Should return the content of the page", async () => {
      const result = await getPageContent("page 1");
      expect(result).toStrictEqual({
        slug: "page 1",
        contentHtml: "<p>hello world</p>\n",
        title: "mocked title",
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
      await expect(getPageContent("page 1")).rejects.toThrow(
        "NEXT_HTTP_ERROR_FALLBACK;404"
      );

      expect(mockMatter).not.toHaveBeenCalled();
    });
  });

  describe("When the page has no content", () => {
    beforeEach(() => {
      mockFileSync.mockReturnValue("mocked content");
      mockMatter.mockReturnValue({
        content: "",
        data: {
          title: "",
          category: "",
          date: "",
        },
      });
    });

    // TODO: This needs to be improved.
    it("Should return with no content", async () => {
      const result = await getPageContent("page 1");
      expect(result).toStrictEqual({
        slug: "page 1",
        contentHtml: "",
        title: "",
      });
    });
  });
});
