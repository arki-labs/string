/**
 * Keyword and key-phrase frequency for SEO-style analysis. Words come from the package's one
 * word definition (`words()`), phrases never cross clause punctuation, and stop words or short
 * words never take part.
 */
import type { KeywordLanguage } from './internal/stop-words.js';
export type { KeywordLanguage } from './internal/stop-words.js';
export { STOP_WORDS } from './internal/stop-words.js';
export type Keyword = Readonly<{
    /** Lowercased word or phrase. */
    keyword: string;
    occurrences: number;
    /** Share of all candidate phrases of the same length, 0–100. */
    percentage: number;
}>;
export type KeywordOptions = Readonly<{
    /** Words per phrase. Default `1`. */
    length?: number;
    /** Maximum entries returned. Default: all. */
    limit?: number;
    /** Words shorter than this (in graphemes) never form keywords. Default `3`. */
    minWordLength?: number;
    /** Phrases seen fewer times than this are dropped. Default `1`. */
    minOccurrences?: number;
    /** Which built-in stop-word list to use. Default `'en'`. */
    language?: KeywordLanguage;
    /** Lowercased words that never form keywords. Default: the `language` list; pass `null` to disable. */
    stopWords?: Iterable<string> | null;
    /** BCP 47 tag for lowercasing. Default: locale-independent. */
    locale?: string;
}>;
/**
 * Most frequent words or phrases (`length` words each), lowercased, most frequent first; ties sort
 * alphabetically. `percentage` is the share among all candidate phrases of that length.
 */
export declare function keywords(text: string, options?: KeywordOptions): Keyword[];
//# sourceMappingURL=keywords.d.ts.map