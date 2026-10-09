/**
 * Whitespace cleanup and display formatting: initials, truncation, excerpts, wrapping.
 */
import { graphemeBoundaries } from './internal/graphemes.js';
import { assertNeedle, findLiteral } from './internal/search.js';
import { lines } from './segment.js';
import { at, chunk, length, take } from './unicode.js';
const WHITESPACE_RUN = /\s+/gu;
/** Collapses every whitespace run to one space. Leading/trailing runs become one space each. */
export function collapseWhitespace(text) {
    return text.replaceAll(WHITESPACE_RUN, ' ');
}
/** Collapses whitespace and trims both ends. */
export function squish(text) {
    return collapseWhitespace(text).trim();
}
/** Uppercase first graphemes of the name components in `text`. Empty input gives `''`. */
export function initials(text, options = {}) {
    const max = options.max ?? 2;
    if (!Number.isInteger(max) || max < 1)
        throw new RangeError(`max must be a positive integer, got ${String(max)}`);
    const components = squish(text)
        .split(' ')
        .filter(component => component !== '');
    if (components.length === 0)
        return '';
    const picked = components.length > max && (options.pick ?? 'first-last') === 'first-last'
        ? [...components.slice(0, max - 1), components.at(-1) ?? '']
        : components.slice(0, max);
    return picked
        .map(component => at(component, 0) ?? '')
        .map(initial => (options.locale === undefined ? initial.toUpperCase() : initial.toLocaleUpperCase(options.locale)))
        .join('');
}
/** Cuts `text` to at most `maxLength` graphemes including the ellipsis. Returns the original when it fits. */
export function truncate(text, maxLength, options = {}) {
    if (!Number.isInteger(maxLength) || maxLength < 0) {
        throw new RangeError(`maxLength must be a non-negative integer, got ${String(maxLength)}`);
    }
    if (maxLength === 0)
        return '';
    const boundaries = graphemeBoundaries(text);
    const total = boundaries.length - 1;
    if (total <= maxLength)
        return text;
    const ellipsis = options.ellipsis ?? '…';
    const ellipsisLength = length(ellipsis);
    if (ellipsisLength >= maxLength)
        return take(ellipsis, maxLength);
    const budget = maxLength - ellipsisLength;
    let cut = text.slice(0, boundaries[budget]);
    if (options.boundary === 'word-before') {
        const next = text.slice(boundaries[budget], boundaries[budget + 1]);
        if (!/^\s$/u.test(next)) {
            const lastSpace = cut.search(/\s+\S*$/u);
            if (lastSpace > 0)
                cut = cut.slice(0, lastSpace);
        }
        cut = cut.trimEnd();
    }
    return cut + ellipsis;
}
/** Context around the first match of `needle`, or `undefined` when absent. */
export function excerpt(text, needle, options = {}) {
    const radius = options.radius ?? 40;
    if (!Number.isInteger(radius) || radius < 0) {
        throw new RangeError(`radius must be a non-negative integer, got ${String(radius)}`);
    }
    assertNeedle(needle);
    if (!text.includes(needle))
        return undefined;
    const boundaries = graphemeBoundaries(text);
    const index = findLiteral(text, needle, { boundaries: new Set(boundaries) });
    if (index === -1)
        return undefined;
    const count = boundaries.length - 1;
    const startGrapheme = boundaries.indexOf(index);
    const endGrapheme = boundaries.indexOf(index + needle.length);
    const from = Math.max(startGrapheme - radius, 0);
    const to = Math.min(endGrapheme + radius, count);
    const ellipsis = options.ellipsis ?? '…';
    return (from > 0 ? ellipsis : '') + text.slice(boundaries[from], boundaries[to]) + (to < count ? ellipsis : '');
}
function wrapLine(line, width, breakWords) {
    const wrapped = [];
    let current = '';
    let currentLength = 0;
    const pieces = line.split(/[ \t]+/u).filter(part => part !== '');
    const units = breakWords ? pieces.flatMap(word => (length(word) > width ? chunk(word, width) : [word])) : pieces;
    for (const word of units) {
        const wordLength = length(word);
        if (current === '') {
            current = word;
            currentLength = wordLength;
        }
        else if (currentLength + 1 + wordLength <= width) {
            current = `${current} ${word}`;
            currentLength += 1 + wordLength;
        }
        else {
            wrapped.push(current);
            current = word;
            currentLength = wordLength;
        }
    }
    if (current !== '' || wrapped.length === 0)
        wrapped.push(current);
    return wrapped;
}
/** Greedy word wrap measured in graphemes. Existing line breaks are preserved. */
export function wrapText(text, width, options = {}) {
    if (!Number.isInteger(width) || width < 1)
        throw new RangeError(`width must be a positive integer, got ${String(width)}`);
    return lines(text)
        .flatMap(line => wrapLine(line, width, options.breakWords === true))
        .join(options.newline ?? '\n');
}
//# sourceMappingURL=format.js.map