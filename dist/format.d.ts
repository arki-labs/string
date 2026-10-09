/**
 * Whitespace cleanup and display formatting: initials, truncation, excerpts, wrapping.
 */
export type TruncateOptions = Readonly<{
    /** Marker appended when text is cut. Defaults to `…`. Counts toward `maxLength`. */
    ellipsis?: string;
    /** `grapheme` cuts anywhere; `word-before` backs up to the previous word boundary. */
    boundary?: 'grapheme' | 'word-before';
}>;
export type InitialsOptions = Readonly<{
    /** Maximum number of initials. Defaults to 2. */
    max?: number;
    /** With more components than `max`, keep the first ones or the first and last. Defaults to `first-last`. */
    pick?: 'first' | 'first-last';
    locale?: string;
}>;
export type ExcerptOptions = Readonly<{
    /** Graphemes kept on each side of the match. Defaults to 40. */
    radius?: number;
    ellipsis?: string;
}>;
export type WrapTextOptions = Readonly<{
    /** Cut words longer than `width` instead of overflowing. Defaults to false. */
    breakWords?: boolean;
    /** Line separator for the output. Defaults to `\n`. */
    newline?: string;
}>;
/** Collapses every whitespace run to one space. Leading/trailing runs become one space each. */
export declare function collapseWhitespace(text: string): string;
/** Collapses whitespace and trims both ends. */
export declare function squish(text: string): string;
/** Uppercase first graphemes of the name components in `text`. Empty input gives `''`. */
export declare function initials(text: string, options?: InitialsOptions): string;
/** Cuts `text` to at most `maxLength` graphemes including the ellipsis. Returns the original when it fits. */
export declare function truncate(text: string, maxLength: number, options?: TruncateOptions): string;
/** Context around the first match of `needle`, or `undefined` when absent. */
export declare function excerpt(text: string, needle: string, options?: ExcerptOptions): string | undefined;
/** Greedy word wrap measured in graphemes. Existing line breaks are preserved. */
export declare function wrapText(text: string, width: number, options?: WrapTextOptions): string;
//# sourceMappingURL=format.d.ts.map