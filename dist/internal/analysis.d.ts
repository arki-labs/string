/**
 * One lazily computed analysis record per text. Readability, vocabulary, and metrics functions
 * all read from it, so a composite such as `textMetrics` tokenizes, lowercases, and syllabifies
 * the text once instead of once per statistic. Every field is computed on first access.
 */
export declare class TextAnalysis {
    #private;
    readonly text: string;
    readonly locale: string | undefined;
    constructor(text: string, locale?: string);
    /** Prose words, original case. */
    get words(): string[];
    /** Prose words lowercased (locale-sensitive only when a locale was given). */
    get lowerWords(): string[];
    /** Count per lowercased word. */
    get frequencies(): Map<string, number>;
    get sentences(): string[];
    /** Raw syllable count per word (`0` for words without Latin letters). */
    get syllables(): number[];
    get letters(): number;
    get lettersAndDigits(): number;
}
export declare function analyze(text: string, locale?: string): TextAnalysis;
/** A text to analyze, or an analysis already made so several functions share one tokenization. */
export type TextInput = string | TextAnalysis;
/** An existing analysis is used as is; its own locale wins over `locale`. */
export declare function toAnalysis(input: TextInput, locale?: string): TextAnalysis;
export declare function countItems<T>(items: readonly T[]): Map<T, number>;
//# sourceMappingURL=analysis.d.ts.map