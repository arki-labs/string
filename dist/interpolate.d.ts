/**
 * Minimal `{{ name }}` templating for flat values. No expressions, no dotted
 * paths, no recursion. Output is plain text; escape separately when needed.
 */
export type TemplateValues = Readonly<Record<string, string | number | boolean | null | undefined>>;
export type InterpolateOptions = Readonly<{
    /** What to do for a placeholder without a value: `throw` (default), `keep` the placeholder, or render `empty`. */
    missing?: 'throw' | 'keep' | 'empty';
}>;
/**
 * Replaces `{{ name }}` placeholders with `values[name]`. `null` renders as
 * `''`; `undefined` counts as missing. `\{{` emits a literal `{{` and `\\`
 * a literal backslash. Malformed placeholders throw `SyntaxError`.
 */
export declare function interpolate(template: string, values: TemplateValues, options?: InterpolateOptions): string;
//# sourceMappingURL=interpolate.d.ts.map