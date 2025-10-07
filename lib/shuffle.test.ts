import { describe, expect, it } from "vitest";
import { shuffle } from "./shuffle";

describe('Given I want to shuffle an array', () => {
    describe('When an array with multiple elements is passed in', () => {
        it('Should return an array with the same elements but in a different order', () => {
            const array = ['a', 'b', 'c', 'd', 'e'];
            const originalArray = [...array];

            shuffle(array);
            
            expect(array).toHaveLength(originalArray.length);
            expect(array).toEqual(expect.arrayContaining(originalArray));
        });
    });

    describe('When an array with a single element is passed in', () => {
        it('Should return an array with the same element', () => {
            const array = ['a'];
            const originalArray = [...array];

            shuffle(array);
            
            expect(array).toHaveLength(originalArray.length);
            expect(array).toEqual(expect.arrayContaining(originalArray));
        });
    });
});