/**
 * Literal search that only matches at grapheme boundaries, so searching for `e`
 * never matches the base letter of `é`. A native `indexOf` miss short-circuits
 * before any segmentation; callers that search repeatedly pass a shared
 * boundary set.
 */
export declare function assertNeedle(needle: string, name?: string): void;
export type FindOptions = Readonly<{
    from?: number;
    last?: boolean;
    /** Precomputed `boundarySet(text)` when the caller searches the same text more than once. */
    boundaries?: ReadonlySet<number>;
}>;
export declare function boundarySet(text: string): Set<number>;
/** UTF-16 index of the first (or last) boundary-aligned occurrence of `needle`, or -1. */
export declare function findLiteral(text: string, needle: string, options?: FindOptions): number;
/** Whether `text` starts with `prefix` and the match ends on a grapheme boundary. */
export declare function hasPrefix(text: string, prefix: string): boolean;
/** Whether `text` ends with `suffix` and the match starts on a grapheme boundary. */
export declare function hasSuffix(text: string, suffix: string): boolean;
//# sourceMappingURL=search.d.ts.map