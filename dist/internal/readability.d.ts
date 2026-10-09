/** Readability formulas over a `TextAnalysis`; the public module wraps them for plain text. */
import type { TextAnalysis } from './analysis.js';
export type ReadabilityLevel = 'Very Easy' | 'Easy' | 'Fairly Easy' | 'Standard' | 'Fairly Difficult' | 'Difficult' | 'Very Confusing';
export type ReadabilityScores = Readonly<{
    /** 0–100; higher is easier. Clamped. */
    fleschReadingEase: number;
    /** US school grade. */
    fleschKincaidGrade: number;
    /** Years of formal education. */
    gunningFog: number;
    /** Years of education; the formula is specified for 30+ sentences and is approximate below that. */
    smogIndex: number;
    /** US school grade, from letters and sentences per 100 words. */
    colemanLiauIndex: number;
    /** US school grade, from characters per word and words per sentence. */
    automatedReadabilityIndex: number;
    /** Läsbarhetsindex: words per sentence plus the percentage of words over six letters. */
    lix: number;
    /** Label for `fleschReadingEase`. */
    fleschReadingEaseLevel: ReadabilityLevel;
}>;
export declare function fleschReadingEaseOf(a: TextAnalysis): number;
export declare function fleschKincaidGradeOf(a: TextAnalysis): number;
export declare function gunningFogOf(a: TextAnalysis): number;
export declare function smogIndexOf(a: TextAnalysis): number;
export declare function colemanLiauIndexOf(a: TextAnalysis): number;
export declare function automatedReadabilityIndexOf(a: TextAnalysis): number;
export declare function lixOf(a: TextAnalysis): number;
export declare function fleschReadingEaseLevel(fleschScore: number): ReadabilityLevel;
export declare function readabilityOf(a: TextAnalysis): ReadabilityScores;
//# sourceMappingURL=readability.d.ts.map