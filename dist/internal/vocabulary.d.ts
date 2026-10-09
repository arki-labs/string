/** Vocabulary statistics over a `TextAnalysis`; the public module wraps them for plain text. */
import type { TextAnalysis } from './analysis.js';
export type WordFrequency = Readonly<{
    word: string;
    count: number;
    /** Share of all words, 0–100. */
    percentage: number;
}>;
export type WordLengthStats = Readonly<{
    average: number;
    median: number;
    mode: number;
    shortest: number;
    longest: number;
    standardDeviation: number;
}>;
export declare function uniqueWordCountOf(a: TextAnalysis): number;
export declare function wordFrequenciesOf(a: TextAnalysis): WordFrequency[];
export declare function lexicalDiversityOf(a: TextAnalysis): number;
export declare function yulesKOf(a: TextAnalysis): number;
export declare function simpsonsDiversityIndexOf(a: TextAnalysis): number;
export declare function wordLengthStatsOf(a: TextAnalysis): WordLengthStats;
//# sourceMappingURL=vocabulary.d.ts.map