/**
 * Literal search that only matches at grapheme boundaries, so searching for `e`
 * never matches the base letter of `é`.
 */
export declare function assertNeedle(needle: string, name?: string): void;
/** UTF-16 index of the first (or last) boundary-aligned occurrence of `needle`, or -1. */
export declare function findLiteral(text: string, needle: string, options?: {
    from?: number;
    last?: boolean;
}): number;
/** Whether `text` starts with `prefix` and the match ends on a grapheme boundary. */
export declare function hasPrefix(text: string, prefix: string): boolean;
/** Whether `text` ends with `suffix` and the match starts on a grapheme boundary. */
export declare function hasSuffix(text: string, suffix: string): boolean;
//# sourceMappingURL=search.d.ts.map