/**
 * Base64 and UTF-8 without `Buffer`, `atob`, or `btoa`, so the same code runs
 * in Node, Bun, browsers, and Hermes. Text functions are UTF-8; byte functions
 * take and return `Uint8Array`. Decoding is strict: malformed base64 throws
 * `SyntaxError`, invalid UTF-8 throws `TypeError`.
 */
export type Base64Options = Readonly<{
    /** `standard` uses `+` and `/`; `url` uses `-` and `_` (RFC 4648 §5). Defaults to `standard`. */
    alphabet?: 'standard' | 'url';
    /** Whether `=` padding must be present or absent. Defaults to `required` for `standard`, `forbidden` for `url`. */
    padding?: 'required' | 'forbidden';
}>;
/** UTF-8 byte length of `text`. Throws `TypeError` on an unpaired surrogate. */
export declare function byteLength(text: string): number;
/** Encodes `text` as UTF-8. Throws `TypeError` on an unpaired surrogate. */
export declare function utf8Encode(text: string): Uint8Array;
/** Decodes strict UTF-8. Overlong forms, surrogates, and truncated sequences throw `TypeError`. A leading BOM is kept. */
export declare function utf8Decode(bytes: Uint8Array): string;
/** Encodes bytes as base64. */
export declare function bytesToBase64(bytes: Uint8Array, options?: Base64Options): string;
/**
 * Decodes base64 to bytes. Rejects whitespace, characters outside the selected
 * alphabet, misplaced or missing padding, impossible lengths, and nonzero
 * unused bits, throwing `SyntaxError`.
 */
export declare function base64ToBytes(encoded: string, options?: Base64Options): Uint8Array;
/** Encodes `text` (UTF-8) as base64. */
export declare function toBase64(text: string, options?: Base64Options): string;
/** Decodes base64 to text. Throws `SyntaxError` for malformed base64 and `TypeError` for invalid UTF-8. */
export declare function fromBase64(encoded: string, options?: Base64Options): string;
/** Like `fromBase64`, but returns `null` instead of throwing. */
export declare function tryFromBase64(encoded: string, options?: Base64Options): string | null;
//# sourceMappingURL=base64.d.ts.map