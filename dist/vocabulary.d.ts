/**
 * Vocabulary statistics: how varied and how long the words of a text are. Words are compared
 * lowercased; pass `locale` for locale-sensitive lowercasing. Each function analyzes its text once,
 * or reuses a `TextAnalysis` from `analyze()` (in `./metrics`) when given one.
 */
import type { TextInput } from './internal/analysis.js';
import type { WordFrequency, WordLengthStats } from './internal/vocabulary.js';
export type { WordFrequency, WordLengthStats } from './internal/vocabulary.js';
export type VocabularyOptions = Readonly<{
    /** BCP 47 tag for lowercasing. Default: locale-independent. */
    locale?: string;
}>;
/** Distinct words, case-insensitively. */
export declare function uniqueWordCount(text: TextInput, options?: VocabularyOptions): number;
/** Every distinct word with its count and share, most frequent first; ties alphabetically. */
export declare function wordFrequencies(text: TextInput, options?: VocabularyOptions): WordFrequency[];
/** Type–token ratio: distinct words divided by all words, 0–1. `0` for empty text. */
export declare function lexicalDiversity(text: TextInput, options?: VocabularyOptions): number;
/** Yule's K: repetitiveness of the vocabulary; `0` when every word is distinct or the text is empty. */
export declare function yulesK(text: TextInput, options?: VocabularyOptions): number;
/** Simpson's diversity index for vocabulary, 0–1; `1` when every word is distinct. */
export declare function simpsonsDiversityIndex(text: TextInput, options?: VocabularyOptions): number;
/** Word lengths in graphemes. All zeros for text without words. */
export declare function wordLengthStats(text: TextInput): WordLengthStats;
//# sourceMappingURL=vocabulary.d.ts.map