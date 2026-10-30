/**
 * Static misuse outside UTF-8/base64 raises a {@link StringError} with a
 * stable `code`. Match on the code, never on the message. Wrong runtime types
 * (a number where a string was required) are not checked and have no code.
 */
/** Stable error codes of `@arki/string`. */
export declare const STRING_ERROR_CODES: {
    /**
     * An argument is outside what the function accepts (empty needle, negative length, bad glyph).
     *
     * @fix Check the argument against the range in the function reference: a non-empty needle, a whole number of at least 0 for lengths.
     * @verify bun run test
     */
    readonly invalidArgument: 'ARKI_STRING_E001';
    /**
     * An `interpolate` template has a malformed placeholder.
     *
     * @fix Write placeholders as `{{ name }}` with an identifier inside, and close every `{{` with `}}`.
     * @verify bun run test
     */
    readonly invalidTemplate: 'ARKI_STRING_E004';
};
/** The code of a {@link StringError}. */
export type StringErrorCode = (typeof STRING_ERROR_CODES)[keyof typeof STRING_ERROR_CODES];
/** Diagnostic for static misuse; encoding APIs return canonical failures. */
export declare class StringError extends Error {
    readonly code: StringErrorCode;
    /** What to do about it, in one sentence. */
    readonly remediation: string;
    constructor(code: StringErrorCode, message: string, options?: ErrorOptions);
}
//# sourceMappingURL=errors.d.ts.map