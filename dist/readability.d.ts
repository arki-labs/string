/**
 * How hard and how long a text is to read: syllable heuristics, the classic readability formulas,
 * and time estimates. Every function accepts either a string or a `TextAnalysis` from
 * `analyze()` (in `./metrics`), so several scores can share one analysis and a custom formula
 * is just a function of that analysis. `readability()` computes the score set for a language:
 * English by default, Spanish (`fernandezHuerta`, `szigrisztPazos`) or German (`fleschAmstad`,
 * `wienerSachtextformel`) with `{ language }`.
 */
import type { TextInput } from './internal/analysis.js';
import type { ReadabilityScores } from './internal/readability.js';
import type { SyllableLanguage } from './internal/syllables.js';
export type { ReadabilityLevel, ReadabilityScores } from './internal/readability.js';
export type { SyllableLanguage } from './internal/syllables.js';
export { fleschReadingEaseLevel } from './internal/readability.js';
export type TimeOptions = Readonly<{
    wordsPerMinute?: number;
}>;
export type SyllableOptions = Readonly<{
    /** Counting rules to apply. Default `'en'`. */
    language?: SyllableLanguage;
}>;
export type ReadabilityOptions = Readonly<{
    /** Which language's formulas to compute. Default `'en'`. */
    language?: SyllableLanguage;
}>;
export type SpanishReadabilityScores = Readonly<{
    fernandezHuerta: number;
    szigrisztPazos: number;
}>;
export type GermanReadabilityScores = Readonly<{
    fleschAmstad: number;
    wienerSachtextformel: number;
}>;
export type ReadingTime = Readonly<{
    words: number;
    seconds: number;
    minutes: number;
}>;
/**
 * Approximate syllables in every word of `text`, summed. English by default (diacritics folded,
 * non-Latin letters ignored, a word without Latin letters counts `0`); `language: 'es' | 'de'`
 * switches rules. Meant for readability grades, not for hyphenation or verse.
 */
export declare function syllableCount(text: TextInput, options?: SyllableOptions): number;
/** Flesch Reading Ease, 0–100 (clamped). Text without words scores 100. */
export declare function fleschReadingEase(text: TextInput): number;
export declare function fleschKincaidGrade(text: TextInput): number;
export declare function gunningFog(text: TextInput): number;
export declare function smogIndex(text: TextInput): number;
export declare function colemanLiauIndex(text: TextInput): number;
export declare function automatedReadabilityIndex(text: TextInput): number;
export declare function lix(text: TextInput): number;
/** Spanish Flesch adaptation (Fernández Huerta), 0–100; higher is easier. */
export declare function fernandezHuerta(text: TextInput): number;
/** Spanish INFLESZ scale (Szigriszt Pazos), 0–100; higher is easier. */
export declare function szigrisztPazos(text: TextInput): number;
/** German Flesch adaptation (Amstad), 0–100; higher is easier. */
export declare function fleschAmstad(text: TextInput): number;
/** First Wiener Sachtextformel: German school grade (4–15). */
export declare function wienerSachtextformel(text: TextInput): number;
/** Every score for the language from one analysis of the text. English unless `language` says otherwise. */
export declare function readability(text: TextInput): ReadabilityScores;
export declare function readability(text: TextInput, options: Readonly<{
    language?: 'en';
}>): ReadabilityScores;
export declare function readability(text: TextInput, options: Readonly<{
    language: 'es';
}>): SpanishReadabilityScores;
export declare function readability(text: TextInput, options: Readonly<{
    language: 'de';
}>): GermanReadabilityScores;
export declare function readability(text: TextInput, options: ReadabilityOptions): ReadabilityScores | SpanishReadabilityScores | GermanReadabilityScores;
/** Time to read `text` silently. Default 238 words per minute (adult average, Brysbaert 2019). */
export declare function readingTime(text: TextInput, options?: TimeOptions): ReadingTime;
/** Time to read `text` aloud. Default 150 words per minute. */
export declare function speakingTime(text: TextInput, options?: TimeOptions): ReadingTime;
//# sourceMappingURL=readability.d.ts.map