/**
 * URL-safe slugs with multi-script transliteration, and no dependencies.
 *
 * `transliterate` applies, in priority order: caller `replacements`, `locale`
 * overrides, the curated per-language rule sets, the general table, then
 * strips remaining diacritics. `slugify` builds on it with decamelizing,
 * lowercasing, separator handling, and apostrophe contractions.
 */
import type { Replacements } from './slug/types.js';
export type { Replacements } from './slug/types.js';
export { rulesets } from './slug/rules.js';
export type TransliterateOptions = Readonly<{
    /** Extra `[from, to]` pairs applied before every built-in rule. */
    replacements?: Replacements;
    /** BCP-47 tag selecting language-specific overrides (`de`, `sv`, `da`, `nb`, `tr`, `hu`, `sr`). */
    locale?: string;
}>;
export type SlugifyOptions = TransliterateOptions & Readonly<{
    /** Defaults to `-`. */
    separator?: string;
    /** Defaults to `true`. */
    lowercase?: boolean;
    /** Split camelCase words (`fooBar` → `foo-bar`). Defaults to `true`. */
    decamelize?: boolean;
    /** Characters to keep verbatim instead of replacing with the separator. */
    preserveCharacters?: readonly string[];
    /** Keep one leading `_` from the input. */
    preserveLeadingUnderscore?: boolean;
    /** Keep one trailing `-` from the input. */
    preserveTrailingDash?: boolean;
}>;
/** Converts `text` to ASCII-friendly Latin letters. Characters without a rule are kept. */
export declare function transliterate(text: string, options?: TransliterateOptions): string;
/** Produces a URL-safe slug: transliterated, lowercased, separator-joined. */
export declare function slugify(text: string, options?: SlugifyOptions): string;
//# sourceMappingURL=slug.d.ts.map