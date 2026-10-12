/**
 * One lazily computed analysis record per text. Readability, vocabulary, and metrics functions
 * all read from it, so a composite such as `textMetrics` tokenizes, lowercases, and syllabifies
 * the text once instead of once per statistic. Every field is computed on first access.
 */
import { sentences, words } from '../segment.js';
import { lower } from './locale.js';
import { wordSyllables } from './syllables.js';
const LETTER = /\p{L}/gu;
const LETTER_OR_DIGIT = /[\p{L}\p{N}]/gu;
export class TextAnalysis {
    text;
    locale;
    #words;
    #lowerWords;
    #frequencies;
    #sentences;
    #syllables;
    #letters;
    #lettersAndDigits;
    constructor(text, locale) {
        this.text = text;
        this.locale = locale;
    }
    /** Prose words, original case. */
    get words() {
        this.#words ??= words(this.text);
        return this.#words;
    }
    /** Prose words lowercased (locale-sensitive only when a locale was given). */
    get lowerWords() {
        this.#lowerWords ??= words(lower(this.text, this.locale));
        return this.#lowerWords;
    }
    /** Count per lowercased word. */
    get frequencies() {
        this.#frequencies ??= countItems(this.lowerWords);
        return this.#frequencies;
    }
    get sentences() {
        this.#sentences ??= sentences(this.text);
        return this.#sentences;
    }
    /** Raw syllable count per word (`0` for words without Latin letters). */
    get syllables() {
        this.#syllables ??= this.words.map(word => wordSyllables(word));
        return this.#syllables;
    }
    get letters() {
        this.#letters ??= this.text.match(LETTER)?.length ?? 0;
        return this.#letters;
    }
    get lettersAndDigits() {
        this.#lettersAndDigits ??= this.text.match(LETTER_OR_DIGIT)?.length ?? 0;
        return this.#lettersAndDigits;
    }
}
export function analyze(text, locale) {
    return new TextAnalysis(text, locale);
}
/** An existing analysis is used as is; its own locale wins over `locale`. */
export function toAnalysis(input, locale) {
    return typeof input === 'string' ? analyze(input, locale) : input;
}
export function countItems(items) {
    const counts = new Map();
    for (const item of items)
        counts.set(item, (counts.get(item) ?? 0) + 1);
    return counts;
}
//# sourceMappingURL=analysis.js.map