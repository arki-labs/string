/**
 * Minimal `{{ name }}` templating for flat values. No expressions, no dotted
 * paths, no recursion. Output is plain text; escape separately when needed.
 */
export type TemplateValues = Readonly<Record<string, string | number | boolean | null | undefined>>;
/** A template references an absent own key or an undefined value.
 * @fix Provide every referenced value, or explicitly choose missing: keep or empty.
 * @verify bun run test -- src/edit.test.ts src/fluent.test.ts
 */
export declare const MissingValue: import("@arki/failure").FailureDefinition<"string.missing_value", undefined>;
declare const MISSING_POLICIES: readonly ['fail', 'keep', 'empty'];
export type InterpolateOptions = Readonly<{
    /** What to do for a placeholder without a value: return a failure (`fail`, default), `keep` it, or render `empty`. */
    missing?: (typeof MISSING_POLICIES)[number];
}>;
/**
 * Replaces `{{ name }}` placeholders with `values[name]`. `null` renders as
 * `''`; `undefined` counts as missing. `\{{` emits a literal `{{` and `\\`
 * a literal backslash. Missing values return `MissingValue`; malformed
 * placeholders throw `StringError` (`ARKI_STRING_E004`).
 */
export declare function interpolate(template: string, values: TemplateValues, options?: InterpolateOptions): string | import("@arki/failure").Failure<"string.missing_value", undefined>;
export {};
//# sourceMappingURL=interpolate.d.ts.map