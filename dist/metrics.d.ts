/**
 * One object with every count, score, and statistic for a text — the "word counter" dashboard.
 * Each field comes from a public function in `./segment`, `./readability`, `./keywords`, or
 * `./vocabulary`; import those directly when you need only a few numbers.
 */
import type { Keyword } from './keywords.js';
import type { ReadabilityScores } from './readability.js';
import type { VocabularyOptions, WordLengthStats } from './vocabulary.js';
export type TextMetrics = Readonly<{
    /** Graphemes, line breaks included. */
    characters: number;
    /** Graphemes excluding whitespace. */
    charactersWithoutSpaces: number;
    words: number;
    uniqueWords: number;
    sentences: number;
    paragraphs: number;
    /** English heuristic; see `syllableCount`. */
    syllables: number;
    averageSentenceLength: number;
    averageSyllablesPerWord: number;
    longestSentenceWords: number;
    shortestSentenceWords: number;
    readingTimeSeconds: number;
    speakingTimeSeconds: number;
    readability: ReadabilityScores;
    /** Top 10 single words. */
    keywords: readonly Keyword[];
    /** Top 10 two-word phrases seen at least twice. */
    keyPhrases: readonly Keyword[];
    lexicalDiversity: number;
    yulesK: number;
    simpsonsDiversityIndex: number;
    wordLength: WordLengthStats;
    /** Top 10 words by raw frequency, stop words included. */
    mostCommonWords: readonly string[];
}>;
export declare function textMetrics(text: string, options?: VocabularyOptions): TextMetrics;
//# sourceMappingURL=metrics.d.ts.map