/**
 * How hard and how long a text is to read: an English syllable heuristic, the classic readability
 * formulas, and time estimates. Each function analyzes its text once; `readability()` computes
 * every score from a single analysis.
 */
import type { ReadabilityScores } from './internal/readability.js';
export type { ReadabilityLevel, ReadabilityScores } from './internal/readability.js';
export { fleschReadingEaseLevel } from './internal/readability.js';
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
/** Every score from one analysis of the text. */
export declare function readability(text: string): ReadabilityScores;
/** Time to read `text` silently. Default 238 words per minute (adult average, Brysbaert 2019). */
export declare function readingTime(text: string, options?: TimeOptions): ReadingTime;
/** Time to read `text` aloud. Default 150 words per minute. */
export declare function speakingTime(text: string, options?: TimeOptions): ReadingTime;
//# sourceMappingURL=readability.d.ts.map