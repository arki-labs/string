/**
 * Escaping for embedding text in other syntaxes. `escapeHtml` is not
 * sanitization; `escapeRegExp` follows the semantics of `RegExp.escape`.
 */
/** Escapes `& < > " '` for HTML text and quoted attribute values. Existing entities are escaped again. */
export declare function escapeHtml(text: string): string;
/**
 * Escapes `text` so it matches literally inside a `RegExp` source, with the
 * semantics of `RegExp.escape`: a leading ASCII letter or digit is hex-escaped
 * so the result can never merge with a preceding token.
 */
export declare function escapeRegExp(text: string): string;
//# sourceMappingURL=escape.d.ts.map