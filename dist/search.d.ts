/**
 * Extraction and lookup. Literal matches are case- and normalization-sensitive
 * and always align with grapheme boundaries. `before`, `after`, and `between`
 * return the input unchanged when a delimiter is absent.
 */
export type Occurrence = 'first' | 'last';
/** Everything before the first (or last) `delimiter`. */
export declare function before(text: string, delimiter: string, occurrence?: Occurrence): string;
/** Everything after the first (or last) `delimiter`. */
export declare function after(text: string, delimiter: string, occurrence?: Occurrence): string;
/** Text between the first `opening` and the first `closing` after it. No nesting. */
export declare function between(text: string, opening: string, closing: string): string;
/** Whether any of `needles` occurs in `text`. An empty list is `false`. */
export declare function containsAny(text: string, needles: readonly string[]): boolean;
/** Grapheme index of the first occurrence of `needle` at or after grapheme `from`, or -1. */
export declare function indexOf(text: string, needle: string, from?: number): number;
//# sourceMappingURL=search.d.ts.map