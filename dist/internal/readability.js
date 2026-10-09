/** Readability formulas over a `TextAnalysis`; the public module wraps them for plain text. */
import { length } from '../unicode.js';
import { sum } from './math.js';
const STARTS_UPPERCASE = /^\p{Lu}/u;
function isEmpty(a) {
    return a.words.length === 0 || a.sentences.length === 0;
}
/** Every word counts at least one syllable in the formulas. */
function syllablesPerWord(a) {
    return sum(a.syllables.map(count => Math.max(1, count))) / a.words.length;
}
function wordsPerSentence(a) {
    return a.words.length / a.sentences.length;
}
export function fleschReadingEaseOf(a) {
    if (isEmpty(a))
        return 100;
    const score = 206.835 - 1.015 * wordsPerSentence(a) - 84.6 * syllablesPerWord(a);
    return Math.min(100, Math.max(0, score));
}
export function fleschKincaidGradeOf(a) {
    if (isEmpty(a))
        return 0;
    return Math.max(0, 0.39 * wordsPerSentence(a) + 11.8 * syllablesPerWord(a) - 15.59);
}
export function gunningFogOf(a) {
    if (isEmpty(a))
        return 0;
    let complex = 0;
    for (const [index, word] of a.words.entries()) {
        // Gunning excludes proper nouns and hyphenated compounds from "complex" (3+ syllable) words.
        if ((a.syllables[index] ?? 0) >= 3 && !STARTS_UPPERCASE.test(word) && !word.includes('-'))
            complex += 1;
    }
    return 0.4 * (wordsPerSentence(a) + (complex / a.words.length) * 100);
}
export function smogIndexOf(a) {
    if (isEmpty(a))
        return 0;
    const polysyllables = a.syllables.filter(count => count >= 3).length;
    return 1.043 * Math.sqrt(polysyllables * (30 / a.sentences.length)) + 3.1291;
}
export function colemanLiauIndexOf(a) {
    if (isEmpty(a))
        return 0;
    const lettersPer100Words = (a.letters / a.words.length) * 100;
    const sentencesPer100Words = (a.sentences.length / a.words.length) * 100;
    return Math.max(0, 0.0588 * lettersPer100Words - 0.296 * sentencesPer100Words - 15.8);
}
export function automatedReadabilityIndexOf(a) {
    if (isEmpty(a))
        return 0;
    return Math.max(0, 4.71 * (a.lettersAndDigits / a.words.length) + 0.5 * wordsPerSentence(a) - 21.43);
}
export function lixOf(a) {
    if (isEmpty(a))
        return 0;
    const long = a.words.filter(word => length(word) > 6).length;
    return wordsPerSentence(a) + (long / a.words.length) * 100;
}
export function fleschReadingEaseLevel(fleschScore) {
    if (fleschScore >= 90)
        return 'Very Easy';
    if (fleschScore >= 80)
        return 'Easy';
    if (fleschScore >= 70)
        return 'Fairly Easy';
    if (fleschScore >= 60)
        return 'Standard';
    if (fleschScore >= 50)
        return 'Fairly Difficult';
    if (fleschScore >= 30)
        return 'Difficult';
    return 'Very Confusing';
}
export function readabilityOf(a) {
    const flesch = fleschReadingEaseOf(a);
    return {
        fleschReadingEase: flesch,
        fleschKincaidGrade: fleschKincaidGradeOf(a),
        gunningFog: gunningFogOf(a),
        smogIndex: smogIndexOf(a),
        colemanLiauIndex: colemanLiauIndexOf(a),
        automatedReadabilityIndex: automatedReadabilityIndexOf(a),
        lix: lixOf(a),
        fleschReadingEaseLevel: fleschReadingEaseLevel(flesch),
    };
}
//# sourceMappingURL=readability.js.map