/**
 * Literal editing, affixes, and grapheme-aware padding. Replacement strings are literal:
 * `$&` stays `$&`.
 */
export type MaskOptions = Readonly<{
    /** Grapheme index to start masking from; negative counts from the end. Defaults to 0. */
    start?: number;
    /** Grapheme index to stop before; negative counts from the end. Defaults to the end. */
    end?: number;
    /** Replacement for each masked grapheme. Defaults to `*`. */
    glyph?: string;
}>;
/** Replaces the first literal occurrence of `search`. */
export declare function replaceFirst(text: string, search: string, replacement: string): string;
/** Replaces the last literal occurrence of `search`. */
export declare function replaceLast(text: string, search: string, replacement: string): string;
/** Replaces `search` only when `text` starts with it. */
export declare function replaceStart(text: string, search: string, replacement: string): string;
/** Replaces `search` only when `text` ends with it. */
export declare function replaceEnd(text: string, search: string, replacement: string): string;
/**
 * Simultaneous literal substitutions in one pass over `text`. At each position
 * the longest matching key wins, and inserted values are never re-scanned.
 */
export declare function swap(text: string, replacements: Readonly<Record<string, string>>): string;
/** Collapses adjacent repeats of `token` (default: a space) into one. */
export declare function deduplicate(text: string, token?: string): string;
/** Surrounds `text` with `opening` and `closing` (defaults to `opening`). */
export declare function wrap(text: string, opening: string, closing?: string): string;
/** Removes one complete `opening`/`closing` pair; returns `text` unchanged when the pair is incomplete. */
export declare function unwrap(text: string, opening: string, closing?: string): string;
/** Replaces every grapheme in the `[start, end)` range with `glyph`. Masked length stays visible. */
export declare function mask(text: string, options?: MaskOptions): string;
/** Pads the start until `text` has `targetLength` graphemes. Never shortens. */
export declare function padStart(text: string, targetLength: number, fill?: string): string;
/** Pads the end until `text` has `targetLength` graphemes. Never shortens. */
export declare function padEnd(text: string, targetLength: number, fill?: string): string;
/** Pads both sides to centre `text`; an odd extra grapheme goes on the right. */
export declare function padBoth(text: string, targetLength: number, fill?: string): string;
/** Adds `prefix` unless `text` already starts with it. */
export declare function ensureStart(text: string, prefix: string): string;
/** Adds `suffix` unless `text` already ends with it. */
export declare function ensureEnd(text: string, suffix: string): string;
/** Removes one leading `prefix` when present. */
export declare function trimPrefix(text: string, prefix: string): string;
/** Removes one trailing `suffix` when present. */
export declare function trimSuffix(text: string, suffix: string): string;
//# sourceMappingURL=edit.d.ts.map