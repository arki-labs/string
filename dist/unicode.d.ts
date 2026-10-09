/**
 * Grapheme-aware positional operations.
 *
 * Native `String.prototype.length`, `slice`, and `at` count UTF-16 code units,
 * so `'👨‍👩‍👧'.length` is 8 and slicing can split an emoji in half. The
 * functions here count user-perceived characters (grapheme clusters) instead.
 * For UTF-16 units use the native methods; for bytes use `utf8Encode`.
 *
 * Non-negative positions are resolved by scanning only as far as needed;
 * negative positions (counted from the end) need the full boundary list.
 */
export { graphemeBoundaries } from './internal/graphemes.js';
/** Iterates the grapheme clusters of `text`. */
export declare function graphemes(text: string): IterableIterator<string>;
/** Number of grapheme clusters in `text`. */
export declare function length(text: string): number;
/** Grapheme at `index` (negative counts from the end), or `undefined` when out of range. */
export declare function at(text: string, index: number): string | undefined;
/** Grapheme-indexed slice with the same `start`/`end` semantics as `Array.prototype.slice`. */
export declare function slice(text: string, start?: number, end?: number): string;
/** The first `count` graphemes; a negative `count` takes from the end. */
export declare function take(text: string, count: number): string;
/** Reverses the grapheme sequence, keeping each grapheme intact. */
export declare function reverse(text: string): string;
/** Immutable grapheme-indexed splice: removes `deleteCount` graphemes at `start` and inserts `insert`. */
export declare function splice(text: string, start: number, deleteCount: number, insert?: string): string;
/** Splits `text` into chunks of `size` graphemes; the last chunk may be shorter. */
export declare function chunk(text: string, size: number): string[];
//# sourceMappingURL=unicode.d.ts.map