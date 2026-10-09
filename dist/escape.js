/**
 * Escaping for embedding text in other syntaxes. `escapeHtml` is not
 * sanitization; `escapeRegExp` follows the semantics of `RegExp.escape`.
 */
const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
/** Escapes `& < > " '` for HTML text and quoted attribute values. Existing entities are escaped again. */
export function escapeHtml(text) {
    return text.replaceAll(/["&'<>]/gu, char => HTML_ESCAPES[char] ?? char);
}
const SYNTAX_CHARACTERS = new Set('^$\\.*+?()[]{}|/');
const CONTROL_ESCAPES = {
    '\t': String.raw `\t`,
    '\n': String.raw `\n`,
    '\v': String.raw `\v`,
    '\f': String.raw `\f`,
    '\r': String.raw `\r`,
};
const OTHER_PUNCTUATORS = new Set(',-=<>#&!%:;@~\'`"');
const WHITESPACE_OR_LINE_TERMINATOR = /\s/u;
const ASCII_ALPHANUMERIC = /^[0-9A-Za-z]$/u;
function hexEscape(unit) {
    return unit < 0x1_00 ? `\\x${unit.toString(16).padStart(2, '0')}` : `\\u${unit.toString(16).padStart(4, '0')}`;
}
/**
 * Escapes `text` so it matches literally inside a `RegExp` source, with the
 * semantics of `RegExp.escape`: a leading ASCII letter or digit is hex-escaped
 * so the result can never merge with a preceding token.
 */
export function escapeRegExp(text) {
    let output = '';
    let first = true;
    for (const char of text) {
        const cp = char.codePointAt(0) ?? 0;
        const isLoneSurrogate = cp >= 0xd8_00 && cp <= 0xdf_ff;
        if (first && ASCII_ALPHANUMERIC.test(char)) {
            output += hexEscape(cp);
        }
        else if (SYNTAX_CHARACTERS.has(char)) {
            output += `\\${char}`;
        }
        else if (char in CONTROL_ESCAPES) {
            output += CONTROL_ESCAPES[char] ?? char;
        }
        else if (OTHER_PUNCTUATORS.has(char) || WHITESPACE_OR_LINE_TERMINATOR.test(char) || isLoneSurrogate) {
            output += hexEscape(cp);
        }
        else {
            output += char;
        }
        first = false;
    }
    return output;
}
//# sourceMappingURL=escape.js.map