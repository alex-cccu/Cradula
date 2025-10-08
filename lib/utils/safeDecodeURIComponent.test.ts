import { describe, expect, it } from "vitest";
import safeDecodeURIComponent from "./safeDecodeURIComponent";

describe('Given I want to safely decode a URI component', () => {
    describe('When a valid encoded string is provided', () => {
        it('Should return a decoded string', () => {
            const encoded = 'Hello%20World%21';
            const decoded = safeDecodeURIComponent(encoded);

            expect(decoded).toBe('Hello World!');
        });
    });

    describe('When a malicious string is provided', () => {
        const maliciousStrings = ['..', '/', '\\'];

        maliciousStrings.forEach(maliciousString => {
            it(`Should return empty if it contains "${maliciousString}"`, () => {
                const encoded = `Hello${maliciousString}World`;
                const decoded = safeDecodeURIComponent(encoded);

                expect(decoded).toBe('');
            });
        });
    });

    describe('When an empty string is provided', () => {
        it('Should return an empty string', () => {
            const encoded = '';
            const decoded = safeDecodeURIComponent(encoded);

            expect(decoded).toBe('');
        });
    });

    describe('When an absolute path is provided', () => {
        it('Should return an empty string', () => {
            const encoded = '/absolute/path';
            const decoded = safeDecodeURIComponent(encoded);

            expect(decoded).toBe('');
        });
    });
});