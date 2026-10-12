/**
 * Sentence end offsets, shared by `sentences()`, sentence-aligned truncation and excerpts.
 * A sentence ends at `.`, `!`, `?`, or `…` (a run of them), plus any closing quotes or brackets,
 * when whitespace or the end of the text follows. `3.14` and `e.g.x` stay together.
 */
export type SentenceEnd = Readonly<{
    /** Offset just after the terminal punctuation and closers. */
    end: number;
    /** Offset of the next sentence: after the whitespace that follows `end`. */
    next: number;
}>;
/** Every sentence end in `text`, in order. Linear in the text length. */
export declare function sentenceEnds(text: string): SentenceEnd[];
//# sourceMappingURL=sentences.d.ts.map