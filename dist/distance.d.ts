/**
 * String similarity measured in graphemes, so `é` and a flag count as one unit whichever way they
 * are encoded. Compare case-insensitively or accent-insensitively by folding both inputs first
 * (`fold` in `./unicode`). All three are O(n·m) in the grapheme counts.
 */
export type JaroWinklerOptions = Readonly<{
    /** Weight of the common prefix (at most 4 graphemes). Default 0.1; must stay at or below 0.25. */
    prefixScale?: number;
}>;
/** Minimum number of grapheme insertions, deletions, and substitutions turning `a` into `b`. */
export declare function levenshtein(a: string, b: string): number;
/**
 * Sørensen–Dice coefficient over grapheme bigrams, 0–1. Identical strings score 1; strings
 * shorter than two graphemes score 1 only when equal.
 */
export declare function diceCoefficient(a: string, b: string): number;
/**
 * Jaro–Winkler similarity, 0–1: Jaro similarity boosted for a shared prefix. Suited to short
 * strings such as names. Both empty gives 1; one empty gives 0.
 */
export declare function jaroWinkler(a: string, b: string, options?: JaroWinklerOptions): number;
//# sourceMappingURL=distance.d.ts.map