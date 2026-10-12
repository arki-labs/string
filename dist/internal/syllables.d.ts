/** English syllable heuristic, shared by readability formulas and text metrics. */
/**
 * Approximate syllables in one word. Diacritics are folded, non-Latin letters are ignored, and a
 * word without Latin letters counts `0`. Meant for readability grades, not hyphenation or verse.
 */
export declare function wordSyllables(word: string): number;
export type SyllableLanguage = 'en' | 'es' | 'de';
/** Spanish: vowel groups, split at hiatus (two strong vowels, or an accented `i`/`u`). */
export declare function spanishSyllables(word: string): number;
/** German: one syllable per vowel group (`ei`, `eu`, `äu`, `ie` are single sounds). */
export declare function germanSyllables(word: string): number;
export declare function syllableCounter(language: SyllableLanguage): (word: string) => number;
//# sourceMappingURL=syllables.d.ts.map