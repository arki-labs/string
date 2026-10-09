/**
 * Grapheme-cluster segmentation.
 *
 * Uses the engine's `Intl.Segmenter` when present. Otherwise falls back to an
 * in-house implementation of UAX #29 extended grapheme clusters driven by Unicode
 * property escapes, so the engine's own Unicode tables supply the character data
 * and nothing is pinned in this package. The fallback exists for Hermes (React
 * Native), which has no `Intl.Segmenter`.
 *
 * Every entry point streams: callers that only need a count, one offset, or a
 * prefix never materialize the full boundary array.
 */
/**
 * Boundary offsets after position 0 produced by the in-house UAX #29 scanner,
 * ending with `text.length`. Exported for tests that must exercise the fallback
 * regardless of the host engine; application code should use `graphemeBreaks`.
 */
export declare function fallbackBreaks(text: string): Generator<number, void, undefined>;
/** Full boundary array from the fallback scanner: `[0, …, text.length]`. */
export declare function fallbackBoundaries(text: string): number[];
/** Boundary offsets (UTF-16 code-unit indices) after position 0, ending with `text.length`; nothing for `''`. */
export declare function graphemeBreaks(text: string): Generator<number, void, undefined>;
/** Every boundary offset of `text`, always starting with `0` and ending with `text.length`. */
export declare function graphemeBoundaries(text: string): number[];
/** Number of grapheme clusters, without materializing offsets. */
export declare function graphemeCount(text: string): number;
/**
 * UTF-16 offset of boundary number `position` (0 is the start, the count is the end), scanning
 * only as far as needed. `undefined` when `position` exceeds the grapheme count.
 */
export declare function boundaryAt(text: string, position: number): number | undefined;
/** Whether `offset` falls on a grapheme boundary, scanning only up to `offset`. */
export declare function isGraphemeBoundary(text: string, offset: number): boolean;
/** Iterates the grapheme clusters of `text`, in order. */
export declare function segmentGraphemes(text: string): IterableIterator<string>;
//# sourceMappingURL=graphemes.d.ts.map