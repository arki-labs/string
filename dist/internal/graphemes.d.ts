/**
 * Grapheme-cluster segmentation.
 *
 * Uses the engine's `Intl.Segmenter` when present. Otherwise falls back to an
 * in-house implementation of UAX #29 extended grapheme clusters driven by Unicode
 * property escapes, so the engine's own Unicode tables supply the character data
 * and nothing is pinned in this package. The fallback exists for Hermes (React
 * Native), which has no `Intl.Segmenter`.
 */
/**
 * Boundary offsets (UTF-16 code-unit indices) produced by the in-house UAX #29
 * scanner. Exported for tests that must exercise the fallback regardless of the
 * host engine; application code should use `graphemeBoundaries`.
 */
export declare function fallbackBoundaries(text: string): number[];
/**
 * Boundary offsets (UTF-16 code-unit indices) of every grapheme cluster in
 * `text`, always starting with `0` and ending with `text.length`.
 */
export declare function graphemeBoundaries(text: string): number[];
/** Iterates the grapheme clusters of `text`, in order. */
export declare function segmentGraphemes(text: string): IterableIterator<string>;
//# sourceMappingURL=graphemes.d.ts.map