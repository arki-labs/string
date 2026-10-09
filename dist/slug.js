/**
 * URL-safe slugs with multi-script transliteration, and no dependencies.
 *
 * `transliterate` applies, in priority order: caller `replacements`, `locale`
 * overrides, the curated per-language rule sets, the general table, then
 * strips remaining diacritics. `slugify` builds on it with decamelizing,
 * lowercasing, separator handling, and apostrophe contractions.
 */
import { escapeRegExp } from './escape.js';
import { rulesets } from './slug/rules.js';
import { builtinReplacements, localeReplacements } from './slug/transliterations.js';
export { rulesets } from './slug/rules.js';
/**
 * Rule sets applied by default, in ascending priority (later wins). Ordered by
 * share of websites in that language, following cocur/slugify.
 */
const DEFAULT_RULESET_ORDER = [
    'common',
    'yiddish',
    'armenian',
    'azerbaijani',
    'burmese',
    'hindi',
    'georgian',
    'norwegian',
    'vietnamese',
    'ukrainian',
    'latvian',
    'finnish',
    'greek',
    'czech',
    'arabic',
    'slovak',
    'turkish',
    'polish',
    'german',
    'russian',
    'romanian',
];
/** Symbols that read better as words. Callers can override them via `replacements`. */
const SYMBOL_REPLACEMENTS = [
    ['&', ' and '],
    ['🦄', ' unicorn '],
    ['♥', ' love '],
];
function compile(entries) {
    const map = new Map();
    for (const [from, to] of entries)
        if (from !== '')
            map.set(from, to);
    // eslint-disable-next-line unicorn/no-array-sort -- fresh copy; ES2023 toSorted is missing on older engines
    const keys = [...map.keys()].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(keys.map(key => escapeRegExp(key)).join('|'), 'gu');
    return { map, pattern };
}
function apply(text, { map, pattern }) {
    if (map.size === 0)
        return text;
    return text.replace(pattern, match => map.get(match) ?? match);
}
let curated;
function curatedRules() {
    curated ??= compile([...SYMBOL_REPLACEMENTS, ...DEFAULT_RULESET_ORDER.flatMap(name => rulesets[name])]);
    return curated;
}
let general;
function generalRules() {
    general ??= compile(builtinReplacements);
    return general;
}
function localeRules(locale) {
    const key = normalizeLocale(locale);
    if (key === undefined)
        return undefined;
    let compiled = localeCache.get(key);
    if (compiled === undefined) {
        compiled = compile(localeReplacements[key] ?? []);
        localeCache.set(key, compiled);
    }
    return compiled;
}
const localeCache = new Map();
/** User tables (the opt-in CJK sets have thousands of entries) compile once per array instance. */
const userCache = new WeakMap();
function userRules(entries) {
    let compiled = userCache.get(entries);
    if (compiled === undefined) {
        compiled = compile(entries);
        userCache.set(entries, compiled);
    }
    return compiled;
}
function normalizeLocale(locale) {
    if (locale === undefined || locale === '')
        return undefined;
    const normalized = locale.toLowerCase().replace(/^no(?=-|$)/u, 'nb');
    if (Object.hasOwn(localeReplacements, normalized))
        return normalized;
    const prefix = normalized.split('-')[0] ?? '';
    return Object.hasOwn(localeReplacements, prefix) ? prefix : undefined;
}
/** Converts `text` to ASCII-friendly Latin letters. Characters without a rule are kept. */
export function transliterate(text, options = {}) {
    let output = text.normalize();
    if (options.replacements !== undefined && options.replacements.length > 0) {
        output = apply(output, userRules(options.replacements));
    }
    const locale = localeRules(options.locale);
    if (locale !== undefined)
        output = apply(output, locale);
    output = apply(output, curatedRules());
    output = apply(output, generalRules());
    output = output
        .normalize('NFD')
        .replaceAll(/\p{Diacritic}/gu, '')
        .normalize();
    return output.replaceAll(/\p{Dash_Punctuation}/gu, '-');
}
function decamelize(text) {
    return text
        .replaceAll(/([A-Z]{2})(\d+)/gu, '$1 $2')
        .replaceAll(/([a-z\d])([A-Z])/gu, '$1 $2')
        .replaceAll(/([A-Z])([A-Z](?!s(?![a-z]))[a-z\d]+)/gu, '$1 $2');
}
/** Produces a URL-safe slug: transliterated, lowercased, separator-joined. */
export function slugify(text, options = {}) {
    const separator = options.separator ?? '-';
    const lowercase = options.lowercase ?? true;
    const preserve = options.preserveCharacters ?? [];
    if (preserve.includes(separator)) {
        throw new TypeError(`The separator ${JSON.stringify(separator)} cannot also be a preserved character`);
    }
    const leadingUnderscore = options.preserveLeadingUnderscore === true && text.startsWith('_');
    const trailingDash = options.preserveTrailingDash === true && text.endsWith('-');
    let output = transliterate(text, { replacements: options.replacements, locale: options.locale });
    if (options.decamelize ?? true)
        output = decamelize(output);
    // Already transliterated to Latin, so locale casing rules no longer apply.
    if (lowercase)
        output = output.toLowerCase();
    // `Conway's Law` → `conways-law`, not `conway-s-law`.
    output = output.replaceAll(/([a-z\d])['’]([ts])(?![a-z\d])/giu, '$1$2');
    const allowed = `a-z\\d${lowercase ? '' : 'A-Z'}${preserve.map(char => escapeRegExp(char)).join('')}`;
    output = output.replaceAll(new RegExp(`[^${allowed}]+`, 'gu'), () => separator).replaceAll('\\', '');
    if (separator !== '') {
        const escaped = escapeRegExp(separator);
        output = output
            .replaceAll(new RegExp(`(?:${escaped}){2,}`, 'gu'), () => separator)
            .replaceAll(new RegExp(`^(?:${escaped})|(?:${escaped})$`, 'gu'), '');
    }
    return `${leadingUnderscore ? '_' : ''}${output}${trailingDash ? '-' : ''}`;
}
//# sourceMappingURL=slug.js.map