/**
 * The one definition of a prose word, shared by `segment`, `keywords`, and every count or score
 * built on them: runs of letters, numbers, and marks, allowing internal apostrophes and hyphens
 * and decimal separators between digits. `don't`, `re-enter`, and `3.14` are each one word.
 */
export declare const WORD: RegExp;
export type WordSpan = Readonly<{
    word: string;
    start: number;
    end: number;
}>;
/** Every word with its UTF-16 offsets, in order. */
export declare function wordSpans(text: string): WordSpan[];
//# sourceMappingURL=words.d.ts.map