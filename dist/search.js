/**
 * Extraction and lookup. Literal matches are case- and normalization-sensitive
 * and always align with grapheme boundaries. `before`, `after`, and `between`
 * return the input unchanged when a delimiter is absent.
 */
import { graphemeBoundaries } from './internal/graphemes.js';
import { assertNeedle, findLiteral } from './internal/search.js';
/** Everything before the first (or last) `delimiter`. */
export function before(text, delimiter, occurrence = 'first') {
    const index = findLiteral(text, delimiter, { last: occurrence === 'last' });
    return index === -1 ? text : text.slice(0, index);
}
/** Everything after the first (or last) `delimiter`. */
export function after(text, delimiter, occurrence = 'first') {
    const index = findLiteral(text, delimiter, { last: occurrence === 'last' });
    return index === -1 ? text : text.slice(index + delimiter.length);
}
/** Text between the first `opening` and the first `closing` after it. No nesting. */
export function between(text, opening, closing) {
    const start = findLiteral(text, opening);
    if (start === -1)
        return text;
    const contentStart = start + opening.length;
    const end = findLiteral(text, closing, { from: contentStart });
    if (end === -1)
        return text;
    return text.slice(contentStart, end);
}
/** Whether any of `needles` occurs in `text`. An empty list is `false`. */
export function containsAny(text, needles) {
    for (const needle of needles)
        assertNeedle(needle);
    return needles.some(needle => findLiteral(text, needle) !== -1);
}
/** Grapheme index of the first occurrence of `needle` at or after grapheme `from`, or -1. */
export function indexOf(text, needle, from = 0) {
    if (!Number.isInteger(from) || from < 0)
        throw new RangeError(`from must be a non-negative integer, got ${String(from)}`);
    const boundaries = graphemeBoundaries(text);
    const fromUnit = boundaries[Math.min(from, boundaries.length - 1)] ?? text.length;
    const index = findLiteral(text, needle, { from: fromUnit });
    return index === -1 ? -1 : boundaries.indexOf(index);
}
//# sourceMappingURL=search.js.map