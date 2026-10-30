/**
 * The one definition of a prose word, shared by `segment`, `keywords`, and every count or score
 * built on them: runs of letters, numbers, and marks, allowing internal apostrophes and hyphens
 * and decimal separators between digits. `don't`, `re-enter`, and `3.14` are each one word.
 *
 * It scans with sticky patterns instead of one pattern with a repeating group, because that group
 * overflowed the regex engine's stack on Node for megabytes of `a-a-a-`. Each step is linear.
 */
export declare function wordBounds(text: string): Generator<readonly [start: number, end: number], void, undefined>;
export type WordSpan = Readonly<{
    word: string;
    start: number;
    end: number;
}>;
/** Every word with its UTF-16 offsets, in order. */
export declare function wordSpans(text: string): WordSpan[];
//# sourceMappingURL=words.d.ts.map