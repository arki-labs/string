/**
 * Vocabulary statistics: how varied and how long the words of a text are. Words are compared
 * lowercased; pass `locale` for locale-sensitive lowercasing. Each function analyzes its text once.
 */
import type { WordFrequency, WordLengthStats } from './internal/vocabulary.js';
export type { WordFrequency, WordLengthStats } from './internal/vocabulary.js';
export type VocabularyOptions = Readonly<{
    /** BCP 47 tag for lowercasing. Default: locale-independent. */
    locale?: string;
}>;
/** Distinct words, case-insensitively. */
export declare function uniqueWordCount(text: string, options?: VocabularyOptions): number;
/** Every distinct word with its count and share, most frequent first; ties alphabetically. */
export declare function wordFrequencies(text: string, options?: VocabularyOptions): WordFrequency[];
/** Type–token ratio: distinct words divided by all words, 0–1. `0` for empty text. */
export declare function lexicalDiversity(text: string, options?: VocabularyOptions): number;
/** Yule's K: repetitiveness of the vocabulary; `0` when every word is distinct or the text is empty. */
export declare function yulesK(text: string, options?: VocabularyOptions): number;
/** Simpson's diversity index for vocabulary, 0–1; `1` when every word is distinct. */
export declare function simpsonsDiversityIndex(text: string, options?: VocabularyOptions): number;
/** Word lengths in graphemes. All zeros for text without words. */
export declare function wordLengthStats(text: string): WordLengthStats;
//# sourceMappingURL=vocabulary.d.ts.map