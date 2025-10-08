import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import getAllFromCategory from "./getAllFromCategory";
import { after, afterEach } from "node:test";
import {readdirSync} from "fs";

vi.mock('fs', async () => ({
    ...(await vi.importActual('fs')),
    default: {
        readdirSync: vi.fn(),
    },
}));

const mockFiledirSync = readdirSync as Mock;


describe("When trying to get all articles from a category", () => {
    // const mockFiledirSync;
    // const mockFiledirSync = vi.fn();
    const mockArticleContent = 'Hello World';
    
    beforeEach(() => {
        // vi.mock('fs', async () => ({
        //     ...(await vi.importActual('fs')),
        //     default: {
        //         readdirSync: mockFiledirSync, // Dynamically reference `mockFileNames`
        //         readFileSync: vi.fn(() => mockArticleContent), // Mock file content
        //     },
        // }));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("When no category is found", () => {
        beforeEach(() => {
            mockFiledirSync.mockReturnValue([]); // Simulate no files found
        });

        it("Should call notFound()", () => {
            expect(() => getAllFromCategory("nonexistent-category")).toThrowError(
                "NEXT_HTTP_ERROR_FALLBACK;404"
            );
        });
    });

    describe("When a category is found", () => {
        describe("And articles exist in that category", () => {

            beforeEach(() => {
            });
            
            it("Should return the category with articles", () => {
                const result = getAllFromCategory("existing-category");
                mockFiledirSync.mockResolvedValue(['article1.md', 'article2.md']);

                expect(result).toEqual({
                    category: "existing-category",
                    articles: [
                        {
                            id: "article1",
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
            });
        });
    });
});