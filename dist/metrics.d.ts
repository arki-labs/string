/**
 * One object with every count, score, and statistic for a text — the "word counter" dashboard.
 * The text is analyzed once (tokenized, lowercased, syllabified, split into sentences) and every
 * field is derived from that single analysis. Import `./segment`, `./readability`, `./keywords`,
 * or `./vocabulary` directly when you need only a few numbers, or `analyze()` once and pass the
 * analysis to each of them.
 */
import type { TextInput } from './internal/analysis.js';
import type { Keyword } from './keywords.js';
import type { ReadabilityScores } from './readability.js';
import type { VocabularyOptions, WordLengthStats } from './vocabulary.js';
export type { TextAnalysis, TextInput } from './internal/analysis.js';
/**
 * One lazy analysis of a text (words, lowercased words, frequencies, sentences, syllables, letter
 * counts), computed on first access. Pass it to any readability, vocabulary, or metrics function
 * instead of the string to share the tokenization, or write your own formula against it.
 */
export { analyze } from './internal/analysis.js';
export type TextMetrics = Readonly<{
    /** Graphemes, line breaks included. */
    characters: number;
    /** Graphemes that are not whitespace. */
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
export declare function textMetrics(text: TextInput, options?: VocabularyOptions): TextMetrics;
//# sourceMappingURL=metrics.d.ts.map