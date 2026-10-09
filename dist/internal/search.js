/**
 * Literal search that only matches at grapheme boundaries, so searching for `e`
 * never matches the base letter of `é`. A native `indexOf` miss short-circuits
 * before any segmentation; callers that search repeatedly pass a shared
 * boundary set.
 */
import { graphemeBoundaries, isGraphemeBoundary } from './graphemes.js';
export function assertNeedle(needle, name = 'needle') {
    if (needle === '')
        throw new TypeError(`${name} must not be empty`);
}
export function boundarySet(text) {
    return new Set(graphemeBoundaries(text));
}
/** UTF-16 index of the first (or last) boundary-aligned occurrence of `needle`, or -1. */
export function findLiteral(text, needle, options = {}) {
    assertNeedle(needle);
    let index = options.last === true ? text.lastIndexOf(needle) : text.indexOf(needle, options.from ?? 0);
    if (index === -1)
        return -1;
    const boundaries = options.boundaries ?? boundarySet(text);
    const aligned = (candidate) => boundaries.has(candidate) && boundaries.has(candidate + needle.length);
    if (options.last === true) {
        while (index !== -1) {
            if (aligned(index))
                return index;
            index = index === 0 ? -1 : text.lastIndexOf(needle, index - 1);
        }
        return -1;
    }
    while (index !== -1) {
        if (aligned(index))
            return index;
        index = text.indexOf(needle, index + 1);
    }
    return -1;
}
/** Whether `text` starts with `prefix` and the match ends on a grapheme boundary. */
export function hasPrefix(text, prefix) {
    if (prefix === '')
        return true;
    return text.startsWith(prefix) && isGraphemeBoundary(text, prefix.length);
}
/** Whether `text` ends with `suffix` and the match starts on a grapheme boundary. */
export function hasSuffix(text, suffix) {
    if (suffix === '')
        return true;
    return text.endsWith(suffix) && isGraphemeBoundary(text, text.length - suffix.length);
}
//# sourceMappingURL=search.js.map