/**
 * Splitting prose into lines, words, sentences, and paragraphs. Regular expressions only, so
 * results are identical in every runtime and never depend on the machine locale.
 */
/** Splits on CRLF, LF, CR, NEL, LS, and PS. `lines('')` is `['']`; trailing empty lines are kept. */
export declare function lines(text: string): string[];
/**
 * Prose words: runs of letters, numbers, and marks. `don't`, `re-enter`, and
 * `3.14` are each one word. Scripts without word spacing yield one word per run.
 */
export declare function words(text: string): string[];
/** Number of prose words, using exactly `words()`. */
export declare function wordCount(text: string): number;
/**
 * Sentences: text up to and including `.`, `!`, `?`, or `…` followed by whitespace or the end.
 * A trailing fragment without terminal punctuation is a sentence if it contains a letter or digit.
 * Abbreviations such as `Mr.` are not special-cased; `3.14` stays together.
 */
export declare function sentences(text: string): string[];
/** Number of sentences, using exactly `sentences()`. */
export declare function sentenceCount(text: string): number;
/**
 * Paragraphs: non-blank lines, trimmed. Blank-line-separated and single-newline-separated text give
 * the same result unless a paragraph is hard-wrapped, which is rare in web inputs.
 */
export declare function paragraphs(text: string): string[];
/** Number of paragraphs, using exactly `paragraphs()`. */
export declare function paragraphCount(text: string): number;
//# sourceMappingURL=segment.d.ts.map