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
/** Spanish Flesch adaptation (Fernández Huerta, 1959): 206.84 − 60·syllables/word − 1.02·words/sentence. */
export declare function fernandezHuertaOf(a: TextAnalysis): number;
/** Spanish INFLESZ scale (Szigriszt Pazos, 1993): 206.835 − 62.3·syllables/word − words/sentence. */
export declare function szigrisztPazosOf(a: TextAnalysis): number;
/** German Flesch adaptation (Amstad, 1978): 180 − words/sentence − 58.5·syllables/word. */
export declare function fleschAmstadOf(a: TextAnalysis): number;
/**
 * First Wiener Sachtextformel (Bamberger & Vanecek, 1984), a German school grade:
 * 0.1935·MS + 0.1672·SL + 0.1297·IW − 0.0327·ES − 0.875, with MS = % words of 3+ syllables,
 * SL = words per sentence, IW = % words over six letters, ES = % one-syllable words.
 */
export declare function wienerSachtextformelOf(a: TextAnalysis): number;
//# sourceMappingURL=readability.d.ts.map