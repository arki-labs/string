/**
 * Whitespace cleanup and display formatting: initials, truncation, excerpts, wrapping.
 */
import { graphemeBoundaries } from './internal/graphemes.js';
import { assertNeedle, findLiteral } from './internal/search.js';
import { sentenceEnds } from './internal/sentences.js';
import { wordSpans } from './internal/words.js';
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
    const singleWord = options.singleWord ?? 1;
    if (!Number.isInteger(singleWord) || singleWord < 1) {
        throw new RangeError(`singleWord must be a positive integer, got ${String(singleWord)}`);
    }
    if (components.length === 1 && singleWord > 1) {
        const leading = take(components[0] ?? '', singleWord);
        return options.locale === undefined ? leading.toUpperCase() : leading.toLocaleUpperCase(options.locale);
    }
    const picked = components.length > max && (options.pick ?? 'first-last') === 'first-last'
        ? [...components.slice(0, max - 1), components.at(-1) ?? '']
        : components.slice(0, max);
    return picked
        .map(component => at(component, 0) ?? '')
        .map(initial => (options.locale === undefined ? initial.toUpperCase() : initial.toLocaleUpperCase(options.locale)))
        .join('');
}
/**
 * Cuts `text` to at most `maxLength` graphemes including the ellipsis. Returns the original when it
 * fits. Whitespace before the ellipsis is always dropped, so `'foo …'` never appears.
 */
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
    const cutOffset = boundaries[budget] ?? text.length;
    let cut = text.slice(0, cutOffset);
    if (options.boundary === 'sentence') {
        let lastEnd = 0;
        for (const { end } of sentenceEnds(text)) {
            if (end > cutOffset)
                break;
            lastEnd = end;
        }
        cut = lastEnd > 0 ? text.slice(0, lastEnd) : backUpToWord(text, cut, cutOffset);
    }
    else if (options.boundary === 'word-before') {
        cut = backUpToWord(text, cut, cutOffset);
    }
    return cut.trimEnd() + ellipsis;
}
function backUpToWord(text, cut, cutOffset) {
    const next = text.charAt(cutOffset);
    if (next === '' || /^\s$/u.test(next))
        return cut;
    const lastSpace = cut.search(/\s+\S*$/u);
    return lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
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
    let from = boundaries[Math.max(startGrapheme - radius, 0)] ?? 0;
    let to = boundaries[Math.min(endGrapheme + radius, count)] ?? text.length;
    const ellipsis = options.ellipsis ?? '…';
    if (options.boundary === 'word' || options.boundary === 'sentence') {
        // Pull each edge inward: the first start at or after `from` that does not pass the match, and
        // the last end at or before `to` that does not cut into it. A sentence edge that is out of
        // reach degrades to a word edge for that side only.
        const candidates = options.boundary === 'word' ? [wordEdges(text)] : [sentenceEdges(text), wordEdges(text)];
        const matchEnd = index + needle.length;
        const start = candidates
            .map(edges => edges.starts.find(offset => offset >= from && offset <= index))
            .find(offset => offset !== undefined);
        const end = candidates
            .map(edges => edges.ends.findLast(offset => offset <= to && offset >= matchEnd))
            .find(offset => offset !== undefined);
        if (start !== undefined)
            from = start;
        if (end !== undefined)
            to = end;
    }
    return (from > 0 ? ellipsis : '') + text.slice(from, to) + (to < text.length ? ellipsis : '');
}
function wordEdges(text) {
    const spans = wordSpans(text);
    return { starts: spans.map(span => span.start), ends: spans.map(span => span.end) };
}
function sentenceEdges(text) {
    const ends = sentenceEnds(text);
    return {
        starts: [0, ...ends.map(sentence => sentence.next)],
        ends: [...ends.map(sentence => sentence.end), text.length],
    };
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
const INDENT = /^[ \t]*/u;
const BLANK = /^[ \t]*$/u;
export function dedent(input, ...values) {
    const text = typeof input === 'string'
        ? input
        : input.map((part, i) => part + (i < values.length ? String(values[i]) : '')).join('');
    const parts = text.split('\n');
    let indent = Number.POSITIVE_INFINITY;
    for (const line of parts) {
        if (BLANK.test(line))
            continue;
        indent = Math.min(indent, INDENT.exec(line)?.[0].length ?? 0);
    }
    const stripped = parts.map(line => (BLANK.test(line) ? '' : line.slice(indent)));
    if (stripped.length > 1 && stripped[0] === '')
        stripped.shift();
    if (stripped.length > 1 && stripped.at(-1) === '')
        stripped.pop();
    return stripped.join('\n');
}
//# sourceMappingURL=format.js.map