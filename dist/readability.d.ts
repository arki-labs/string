/**
 * How hard and how long a text is to read: an English syllable heuristic, the classic readability
 * formulas, and time estimates. Pure functions over `words()` and `sentences()` from `./segment`.
 */
export type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Fairly Easy' | 'Standard' | 'Fairly Difficult' | 'Difficult' | 'Very Confusing';
export type ReadabilityScores = Readonly<{
    /** 0–100; higher is easier. Clamped. */
    fleschReadingEase: number;
    /** US school grade. */
    fleschKincaidGrade: number;
    /** Years of formal education. */
    gunningFog: number;
    /** Years of education; the formula is specified for 30+ sentences and is approximate below that. */
    smogIndex: number;
    /** US school grade, from letters and sentences per 100 words. */
    colemanLiauIndex: number;
    /** US school grade, from characters per word and words per sentence. */
    automatedReadabilityIndex: number;
    /** Läsbarhetsindex: words per sentence plus the percentage of words over six letters. */
    lix: number;
    /** Label for `fleschReadingEase`. */
    fleschReadingEaseLevel: ReadabilityLevel;
}>;
export type TimeOptions = Readonly<{
    wordsPerMinute?: number;
}>;
export type ReadingTime = Readonly<{
    words: number;
    seconds: number;
    minutes: number;
}>;
/**
 * Approximate syllables in every word of `text`, summed. Tuned for English; diacritics are folded,
 * non-Latin letters are ignored, and a word without Latin letters counts `0`. Meant for readability
 * grades, not for hyphenation or verse.
 */
export declare function syllableCount(text: string): number;
/** Flesch Reading Ease, 0–100 (clamped). Text without words scores 100. */
export declare function fleschReadingEase(text: string): number;
export declare function fleschKincaidGrade(text: string): number;
export declare function gunningFog(text: string): number;
export declare function smogIndex(text: string): number;
export declare function colemanLiauIndex(text: string): number;
export declare function automatedReadabilityIndex(text: string): number;
export declare function lix(text: string): number;
export declare function fleschReadingEaseLevel(fleschScore: number): ReadabilityLevel;
/** Every score from one pass over the text. */
export declare function readability(text: string): ReadabilityScores;
/** Time to read `text` silently. Default 238 words per minute (adult average, Brysbaert 2019). */
export declare function readingTime(text: string, options?: TimeOptions): ReadingTime;
/** Time to read `text` aloud. Default 150 words per minute. */
export declare function speakingTime(text: string, options?: TimeOptions): ReadingTime;
//# sourceMappingURL=readability.d.ts.map