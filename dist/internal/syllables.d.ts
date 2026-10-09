/** English syllable heuristic, shared by readability formulas and text metrics. */
/**
 * Approximate syllables in one word. Diacritics are folded, non-Latin letters are ignored, and a
 * word without Latin letters counts `0`. Meant for readability grades, not hyphenation or verse.
 */
export declare function wordSyllables(word: string): number;
//# sourceMappingURL=syllables.d.ts.map