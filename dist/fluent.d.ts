/**
 * Immutable fluent wrapper. Every string-producing function in this package is
 * available as a method; queries return plain values. `str('x')` never mutates.
 * Note: `Boolean(str(''))` is `true` like any object — use `isEmpty()`.
 */
import type { Base64Options } from './base64.js';
import type { CaseOptions } from './case.js';
import type { MaskOptions } from './edit.js';
import type { ExcerptOptions, InitialsOptions, TruncateOptions, WrapTextOptions } from './format.js';
import type { InterpolateOptions, TemplateValues } from './interpolate.js';
import type { Occurrence } from './search.js';
import type { SlugifyOptions, TransliterateOptions } from './slug.js';
export type NormalizationForm = 'NFC' | 'NFD' | 'NFKC' | 'NFKD';
export type Transform = (value: StringValue) => StringValue;
export declare class StringValue {
    #private;
    constructor(value: string);
    value(): string;
    toString(): string;
    valueOf(): string;
    toJSON(): string;
    [Symbol.toPrimitive](): string;
    /** Iterates graphemes, unlike native string iteration (code points). */
    [Symbol.iterator](): IterableIterator<string>;
    /** Grapheme count. */
    get length(): number;
    at(index: number): string | undefined;
    slice(start?: number, end?: number): StringValue;
    take(count: number): StringValue;
    reverse(): StringValue;
    splice(start: number, deleteCount: number, insert?: string): StringValue;
    chunk(size: number): string[];
    trim(): StringValue;
    trimStart(): StringValue;
    trimEnd(): StringValue;
    upper(locale?: string): StringValue;
    lower(locale?: string): StringValue;
    normalize(form?: NormalizationForm): StringValue;
    append(suffix: string): StringValue;
    prepend(prefix: string): StringValue;
    repeat(count: number): StringValue;
    replaceAll(search: string, replacement: string): StringValue;
    split(separator: string | RegExp, limit?: number): string[];
    includes(needle: string): boolean;
    startsWith(prefix: string): boolean;
    endsWith(suffix: string): boolean;
    isEmpty(): boolean;
    isBlank(): boolean;
    equals(other: string | StringValue): boolean;
    /** Tests `pattern` without touching the caller's `lastIndex`. */
    test(pattern: RegExp): boolean;
    /** Iterates every match of `pattern` using a cloned global expression. */
    scan(pattern: RegExp): IterableIterator<RegExpMatchArray>;
    map(fn: (text: string) => string): StringValue;
    pipe<T>(fn: (value: StringValue) => T): T;
    tap(fn: (value: StringValue) => void): StringValue;
    when(condition: boolean | ((value: StringValue) => boolean), then: Transform, otherwise?: Transform): StringValue;
    whenEmpty(fn: Transform): StringValue;
    caseWords(): string[];
    camelCase(options?: CaseOptions): StringValue;
    pascalCase(options?: CaseOptions): StringValue;
    snakeCase(options?: CaseOptions): StringValue;
    kebabCase(options?: CaseOptions): StringValue;
    constantCase(options?: CaseOptions): StringValue;
    dotCase(options?: CaseOptions): StringValue;
    pathCase(options?: CaseOptions): StringValue;
    titleCase(options?: CaseOptions): StringValue;
    sentenceCase(options?: CaseOptions): StringValue;
    capitalize(options?: CaseOptions): StringValue;
    uncapitalize(options?: CaseOptions): StringValue;
    collapseWhitespace(): StringValue;
    squish(): StringValue;
    lines(): string[];
    words(): string[];
    wordCount(): number;
    sentences(): string[];
    paragraphs(): string[];
    initials(options?: InitialsOptions): StringValue;
    truncate(maxLength: number, options?: TruncateOptions): StringValue;
    excerpt(needle: string, options?: ExcerptOptions): string | undefined;
    wrapText(width: number, options?: WrapTextOptions): StringValue;
    before(delimiter: string, occurrence?: Occurrence): StringValue;
    after(delimiter: string, occurrence?: Occurrence): StringValue;
    between(opening: string, closing: string): StringValue;
    ensureStart(prefix: string): StringValue;
    ensureEnd(suffix: string): StringValue;
    trimPrefix(prefix: string): StringValue;
    trimSuffix(suffix: string): StringValue;
    containsAny(needles: readonly string[]): boolean;
    indexOf(needle: string, from?: number): number;
    replaceFirst(search: string, replacement: string): StringValue;
    replaceLast(search: string, replacement: string): StringValue;
    replaceStart(search: string, replacement: string): StringValue;
    replaceEnd(search: string, replacement: string): StringValue;
    swap(replacements: Readonly<Record<string, string>>): StringValue;
    deduplicate(token?: string): StringValue;
    wrap(opening: string, closing?: string): StringValue;
    unwrap(opening: string, closing?: string): StringValue;
    mask(options?: MaskOptions): StringValue;
    padStart(targetLength: number, fill?: string): StringValue;
    padEnd(targetLength: number, fill?: string): StringValue;
    padBoth(targetLength: number, fill?: string): StringValue;
    slugify(options?: SlugifyOptions): StringValue;
    transliterate(options?: TransliterateOptions): StringValue;
    escapeHtml(): StringValue;
    escapeRegExp(): StringValue;
    /** Treats the value as a `{{ name }}` template. */
    interpolate(values: TemplateValues, options?: InterpolateOptions): StringValue;
    toBase64(options?: Base64Options): StringValue;
    fromBase64(options?: Base64Options): StringValue;
}
/** Wraps `text` in an immutable fluent `StringValue`. */
export declare function str(text: string | StringValue): StringValue;
//# sourceMappingURL=fluent.d.ts.map