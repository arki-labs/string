/**
 * Case conversion built on one tokenizer (`caseWords`), so every case style
 * splits identifiers the same way. Tokens are letters, numbers, and attached
 * marks; everything else is a boundary. Casing is locale-independent unless a
 * `locale` is passed explicitly.
 */
export type CaseOptions = Readonly<{
    locale?: string;
}>;
/** Splits `text` into the tokens every case function works on. */
export declare function caseWords(text: string): string[];
/** Uppercases the first grapheme and leaves the rest untouched. */
export declare function capitalize(text: string, options?: CaseOptions): string;
/** Lowercases the first grapheme and leaves the rest untouched. */
export declare function uncapitalize(text: string, options?: CaseOptions): string;
/** `fooBarBaz` */
export declare function camelCase(text: string, options?: CaseOptions): string;
/** `FooBarBaz` */
export declare function pascalCase(text: string, options?: CaseOptions): string;
/** `foo_bar_baz` */
export declare function snakeCase(text: string, options?: CaseOptions): string;
/** `foo-bar-baz` */
export declare function kebabCase(text: string, options?: CaseOptions): string;
/** `FOO_BAR_BAZ` */
export declare function constantCase(text: string, options?: CaseOptions): string;
/** `foo.bar.baz` */
export declare function dotCase(text: string, options?: CaseOptions): string;
/** `foo/bar/baz` */
export declare function pathCase(text: string, options?: CaseOptions): string;
/** `Foo Bar Baz` — every token capitalized, joined by spaces. Punctuation is discarded. */
export declare function titleCase(text: string, options?: CaseOptions): string;
/** `Foo bar baz` — tokens lowercased and joined by spaces, first grapheme capitalized. */
export declare function sentenceCase(text: string, options?: CaseOptions): string;
//# sourceMappingURL=case.d.ts.map