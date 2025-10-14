import { describe, it, expect } from "vitest";
import getShuffledColours from "./getShuffledColours";
import { allColours } from "./constants";

describe("Given I want to get a shuffled array of colours", () => {
  describe("When no colours are passed in to be removed", () => {
    it("Should return all the colours in a random order", () => {
      const colours = getShuffledColours();
      expect(colours.length).toBe(allColours.length);
      expect(colours).toEqual(expect.arrayContaining(allColours));
    });
  });

  describe("When one colour is passed in to be removed", () => {
    it("Should return all the colours except the single colour passed in", () => {
      const colours = getShuffledColours(["cradula-red"]);
      expect(colours.length).toBe(allColours.length - 1);
      expect(colours).not.toContain("cradula-red");
    });
  });

  describe("When multiple colours are passed in to be removed", () => {
    it("Should return all the colours except the multiple colours passed in", () => {
      const colours = getShuffledColours([
        "cradula-red",
        "cradula-blue",
        "cradula-green",
      ]);
      expect(colours.length).toBe(allColours.length - 3);
      expect(colours).not.toContain("cradula-red");
      expect(colours).not.toContain("cradula-blue");
      expect(colours).not.toContain("cradula-green");
    });
  });
});
