/**
 * Immutable fluent wrapper. Every string-producing function in this package is
 * available as a method; queries return plain values. `str('x')` never mutates.
 * Note: `Boolean(str(''))` is `true` like any object — use `isEmpty()`.
 */
import { fromBase64, toBase64 } from './base64.js';
import { camelCase, capitalize, caseWords, constantCase, dotCase, kebabCase, pascalCase, pathCase, sentenceCase, snakeCase, titleCase, uncapitalize, } from './case.js';
import { deduplicate, ensureEnd, ensureStart, mask, padBoth, padEnd, padStart, replaceEnd, replaceFirst, replaceLast, replaceStart, swap, trimPrefix, trimSuffix, unwrap, wrap, } from './edit.js';
import { escapeHtml, escapeRegExp } from './escape.js';
import { collapseWhitespace, excerpt, initials, squish, truncate, wrapText } from './format.js';
import { interpolate } from './interpolate.js';
import { after, before, between, containsAny, indexOf } from './search.js';
import { lines, paragraphs, sentences, wordCount, words } from './segment.js';
import { slugify, transliterate } from './slug.js';
import { at, chunk, graphemes, length, reverse, slice, splice, take } from './unicode.js';
export class StringValue {
    #value;
    constructor(value) {
        this.#value = value;
    }
    // Extraction
    value() {
        return this.#value;
    }
    toString() {
        return this.#value;
    }
    valueOf() {
        return this.#value;
    }
    toJSON() {
        return this.#value;
    }
    [Symbol.toPrimitive]() {
        return this.#value;
    }
    /** Iterates graphemes, unlike native string iteration (code points). */
    [Symbol.iterator]() {
        return graphemes(this.#value);
    }
    // Unicode positional
    /** Grapheme count. */
    get length() {
        return length(this.#value);
    }
    at(index) {
        return at(this.#value, index);
    }
    slice(start, end) {
        return str(slice(this.#value, start, end));
    }
    take(count) {
        return str(take(this.#value, count));
    }
    reverse() {
        return str(reverse(this.#value));
    }
    splice(start, deleteCount, insert) {
        return str(splice(this.#value, start, deleteCount, insert));
    }
    chunk(size) {
        return chunk(this.#value, size);
    }
    // Native, chainable
    trim() {
        return str(this.#value.trim());
    }
    trimStart() {
        return str(this.#value.trimStart());
    }
    trimEnd() {
        return str(this.#value.trimEnd());
    }
    upper(locale) {
        return str(locale === undefined ? this.#value.toUpperCase() : this.#value.toLocaleUpperCase(locale));
    }
    lower(locale) {
        return str(locale === undefined ? this.#value.toLowerCase() : this.#value.toLocaleLowerCase(locale));
    }
    normalize(form = 'NFC') {
        return str(this.#value.normalize(form));
    }
    append(suffix) {
        return str(this.#value + suffix);
    }
    prepend(prefix) {
        return str(prefix + this.#value);
    }
    repeat(count) {
        return str(this.#value.repeat(count));
    }
    replaceAll(search, replacement) {
        return str(this.#value.replaceAll(search, replacement));
    }
    split(separator, limit) {
        return this.#value.split(separator, limit);
    }
    includes(needle) {
        return this.#value.includes(needle);
    }
    startsWith(prefix) {
        return this.#value.startsWith(prefix);
    }
    endsWith(suffix) {
        return this.#value.endsWith(suffix);
    }
    // Predicates and combinators
    isEmpty() {
        return this.#value === '';
    }
    isBlank() {
        return this.#value.trim() === '';
    }
    equals(other) {
        return this.#value === (typeof other === 'string' ? other : other.value());
    }
    /** Tests `pattern` without touching the caller's `lastIndex`. */
    test(pattern) {
        return new RegExp(pattern.source, pattern.flags).test(this.#value);
    }
    /** Iterates every match of `pattern` using a cloned global expression. */
    scan(pattern) {
        const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
        return this.#value.matchAll(new RegExp(pattern.source, flags));
    }
    map(fn) {
        return str(fn(this.#value));
    }
    pipe(fn) {
        return fn(this);
    }
    tap(fn) {
        fn(this);
        return this;
    }
    when(condition, then, otherwise) {
        const matched = typeof condition === 'function' ? condition(this) : condition;
        if (matched)
            return then(this);
        return otherwise === undefined ? this : otherwise(this);
    }
    whenEmpty(fn) {
        return this.isEmpty() ? fn(this) : this;
    }
    // Case
    caseWords() {
        return caseWords(this.#value);
    }
    camelCase(options) {
        return str(camelCase(this.#value, options));
    }
    pascalCase(options) {
        return str(pascalCase(this.#value, options));
    }
    snakeCase(options) {
        return str(snakeCase(this.#value, options));
    }
    kebabCase(options) {
        return str(kebabCase(this.#value, options));
    }
    constantCase(options) {
        return str(constantCase(this.#value, options));
    }
    dotCase(options) {
        return str(dotCase(this.#value, options));
    }
    pathCase(options) {
        return str(pathCase(this.#value, options));
    }
    titleCase(options) {
        return str(titleCase(this.#value, options));
    }
    sentenceCase(options) {
        return str(sentenceCase(this.#value, options));
    }
    capitalize(options) {
        return str(capitalize(this.#value, options));
    }
    uncapitalize(options) {
        return str(uncapitalize(this.#value, options));
    }
    // Text
    collapseWhitespace() {
        return str(collapseWhitespace(this.#value));
    }
    squish() {
        return str(squish(this.#value));
    }
    lines() {
        return lines(this.#value);
    }
    words() {
        return words(this.#value);
    }
    wordCount() {
        return wordCount(this.#value);
    }
    sentences() {
        return sentences(this.#value);
    }
    paragraphs() {
        return paragraphs(this.#value);
    }
    initials(options) {
        return str(initials(this.#value, options));
    }
    truncate(maxLength, options) {
        return str(truncate(this.#value, maxLength, options));
    }
    excerpt(needle, options) {
        return excerpt(this.#value, needle, options);
    }
    wrapText(width, options) {
        return str(wrapText(this.#value, width, options));
    }
    // Search and affixes
    before(delimiter, occurrence) {
        return str(before(this.#value, delimiter, occurrence));
    }
    after(delimiter, occurrence) {
        return str(after(this.#value, delimiter, occurrence));
    }
    between(opening, closing) {
        return str(between(this.#value, opening, closing));
    }
    ensureStart(prefix) {
        return str(ensureStart(this.#value, prefix));
    }
    ensureEnd(suffix) {
        return str(ensureEnd(this.#value, suffix));
    }
    trimPrefix(prefix) {
        return str(trimPrefix(this.#value, prefix));
    }
    trimSuffix(suffix) {
        return str(trimSuffix(this.#value, suffix));
    }
    containsAny(needles) {
        return containsAny(this.#value, needles);
    }
    indexOf(needle, from) {
        return indexOf(this.#value, needle, from);
    }
    // Edit
    replaceFirst(search, replacement) {
        return str(replaceFirst(this.#value, search, replacement));
    }
    replaceLast(search, replacement) {
        return str(replaceLast(this.#value, search, replacement));
    }
    replaceStart(search, replacement) {
        return str(replaceStart(this.#value, search, replacement));
    }
    replaceEnd(search, replacement) {
        return str(replaceEnd(this.#value, search, replacement));
    }
    swap(replacements) {
        return str(swap(this.#value, replacements));
    }
    deduplicate(token) {
        return str(deduplicate(this.#value, token));
    }
    wrap(opening, closing) {
        return str(wrap(this.#value, opening, closing));
    }
    unwrap(opening, closing) {
        return str(unwrap(this.#value, opening, closing));
    }
    mask(options) {
        return str(mask(this.#value, options));
    }
    padStart(targetLength, fill) {
        return str(padStart(this.#value, targetLength, fill));
    }
    padEnd(targetLength, fill) {
        return str(padEnd(this.#value, targetLength, fill));
    }
    padBoth(targetLength, fill) {
        return str(padBoth(this.#value, targetLength, fill));
    }
    // Slugs
    slugify(options) {
        return str(slugify(this.#value, options));
    }
    transliterate(options) {
        return str(transliterate(this.#value, options));
    }
    // Escaping, templating, encoding
    escapeHtml() {
        return str(escapeHtml(this.#value));
    }
    escapeRegExp() {
        return str(escapeRegExp(this.#value));
    }
    /** Treats the value as a `{{ name }}` template. */
    interpolate(values, options) {
        return str(interpolate(this.#value, values, options));
    }
    toBase64(options) {
        return str(toBase64(this.#value, options));
    }
    fromBase64(options) {
        return str(fromBase64(this.#value, options));
    }
}
/** Wraps `text` in an immutable fluent `StringValue`. */
export function str(text) {
    return typeof text === 'string' ? new StringValue(text) : text;
}
//# sourceMappingURL=fluent.js.map