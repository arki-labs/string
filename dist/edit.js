/**
 * Literal editing, affixes, and grapheme-aware padding. Replacement strings are literal:
 * `$&` stays `$&`.
 */
import { escapeRegExp } from './escape.js';
import { graphemeBoundaries, segmentGraphemes } from './internal/graphemes.js';
import { assertNeedle, findLiteral, hasPrefix, hasSuffix } from './internal/search.js';
import { length } from './unicode.js';
/** Replaces the first literal occurrence of `search`. */
export function replaceFirst(text, search, replacement) {
    const index = findLiteral(text, search);
    return index === -1 ? text : text.slice(0, index) + replacement + text.slice(index + search.length);
}
/** Replaces the last literal occurrence of `search`. */
export function replaceLast(text, search, replacement) {
    const index = findLiteral(text, search, { last: true });
    return index === -1 ? text : text.slice(0, index) + replacement + text.slice(index + search.length);
}
/** Replaces `search` only when `text` starts with it. */
export function replaceStart(text, search, replacement) {
    assertNeedle(search, 'search');
    return hasPrefix(text, search) ? replacement + text.slice(search.length) : text;
}
/** Replaces `search` only when `text` ends with it. */
export function replaceEnd(text, search, replacement) {
    assertNeedle(search, 'search');
    return hasSuffix(text, search) ? text.slice(0, text.length - search.length) + replacement : text;
}
/**
 * Simultaneous literal substitutions in one pass over `text`. At each position
 * the longest matching key wins, and inserted values are never re-scanned.
 */
export function swap(text, replacements) {
    // eslint-disable-next-line unicorn/no-array-sort -- fresh array; ES2023 toSorted is missing on older engines
    const keys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    for (const key of keys)
        assertNeedle(key, 'replacement key');
    if (keys.length === 0)
        return text;
    const boundaries = new Set(graphemeBoundaries(text));
    let output = '';
    let index = 0;
    while (index < text.length) {
        const key = boundaries.has(index)
            ? keys.find(candidate => text.startsWith(candidate, index) && boundaries.has(index + candidate.length))
            : undefined;
        if (key === undefined) {
            output += text[index] ?? '';
            index += 1;
        }
        else {
            output += replacements[key] ?? '';
            index += key.length;
        }
    }
    return output;
}
/** Collapses adjacent repeats of `token` (default: a space) into one. */
export function deduplicate(text, token = ' ') {
    assertNeedle(token, 'token');
    const pattern = new RegExp(`(?:${escapeRegExp(token)}){2,}`, 'gu');
    return text.replaceAll(pattern, token);
}
/** Surrounds `text` with `opening` and `closing` (defaults to `opening`). */
export function wrap(text, opening, closing = opening) {
    return opening + text + closing;
}
/** Removes one complete `opening`/`closing` pair; returns `text` unchanged when the pair is incomplete. */
export function unwrap(text, opening, closing = opening) {
    if (text.length < opening.length + closing.length)
        return text;
    if (!hasPrefix(text, opening) || !hasSuffix(text, closing))
        return text;
    return text.slice(opening.length, text.length - closing.length);
}
function resolveIndex(index, count) {
    if (index < 0)
        return Math.max(count + index, 0);
    return Math.min(index, count);
}
/** Replaces every grapheme in the `[start, end)` range with `glyph`. Masked length stays visible. */
export function mask(text, options = {}) {
    const glyph = options.glyph ?? '*';
    const boundaries = graphemeBoundaries(text);
    const count = boundaries.length - 1;
    const start = options.start ?? 0;
    const end = options.end ?? count;
    if (!Number.isInteger(start) || !Number.isInteger(end))
        throw new RangeError('start and end must be integers');
    const from = resolveIndex(start, count);
    const to = resolveIndex(end, count);
    if (to <= from)
        return text;
    return text.slice(0, boundaries[from]) + glyph.repeat(to - from) + text.slice(boundaries[to]);
}
function padding(fill, needed) {
    if (fill === '')
        throw new TypeError('fill must not be empty');
    const fillGraphemes = [...segmentGraphemes(fill)];
    let output = '';
    for (let index = 0; index < needed; index += 1)
        output += fillGraphemes[index % fillGraphemes.length] ?? '';
    return output;
}
function assertTargetLength(targetLength) {
    if (!Number.isInteger(targetLength) || targetLength < 0) {
        throw new RangeError(`targetLength must be a non-negative integer, got ${String(targetLength)}`);
    }
}
/** Pads the start until `text` has `targetLength` graphemes. Never shortens. */
export function padStart(text, targetLength, fill = ' ') {
    assertTargetLength(targetLength);
    const needed = targetLength - length(text);
    return needed <= 0 ? text : padding(fill, needed) + text;
}
/** Pads the end until `text` has `targetLength` graphemes. Never shortens. */
export function padEnd(text, targetLength, fill = ' ') {
    assertTargetLength(targetLength);
    const needed = targetLength - length(text);
    return needed <= 0 ? text : text + padding(fill, needed);
}
/** Pads both sides to centre `text`; an odd extra grapheme goes on the right. */
export function padBoth(text, targetLength, fill = ' ') {
    assertTargetLength(targetLength);
    const needed = targetLength - length(text);
    if (needed <= 0)
        return text;
    const left = Math.floor(needed / 2);
    return padding(fill, left) + text + padding(fill, needed - left);
}
/** Adds `prefix` unless `text` already starts with it. */
export function ensureStart(text, prefix) {
    return hasPrefix(text, prefix) ? text : prefix + text;
}
/** Adds `suffix` unless `text` already ends with it. */
export function ensureEnd(text, suffix) {
    return hasSuffix(text, suffix) ? text : text + suffix;
}
/** Removes one leading `prefix` when present. */
export function trimPrefix(text, prefix) {
    return hasPrefix(text, prefix) ? text.slice(prefix.length) : text;
}
/** Removes one trailing `suffix` when present. */
export function trimSuffix(text, suffix) {
    return hasSuffix(text, suffix) ? text.slice(0, text.length - suffix.length) : text;
}
//# sourceMappingURL=edit.js.map