/**
 * @deprecated Counts UTF-16 code units, which is what native `.length` does.
 * Kept for compatibility with earlier releases. For user-perceived characters
 * use `length()` from `@arki/string/unicode`.
 */
export function countCharacters(subject) {
    return subject?.length ?? 0;
}
//# sourceMappingURL=countCharacters.js.map