/**
 * Base64 and UTF-8 without `Buffer`, `atob`, or `btoa`, so the same code runs
 * in Node, Bun, browsers, and Hermes. Text functions are UTF-8; byte functions
 * take and return `Uint8Array`. Decoding is strict: malformed base64 returns
 * `InvalidBase64`, invalid UTF-8 returns `InvalidUtf8`. Successes are unwrapped.
 */
/** Invalid UTF-8. No submitted text or bytes are exposed.
 * @fix Pass well-formed text or valid UTF-8 bytes.
 * @verify bun run test
 */
export declare const InvalidUtf8: import("@arki/failure").FailureDefinition<"string.invalid_utf8", undefined>;
/** Noncanonical base64. No submitted input is exposed.
 * @fix Use the selected alphabet, correct padding, and zero unused bits.
 * @verify bun run test
 */
export declare const InvalidBase64: import("@arki/failure").FailureDefinition<"string.invalid_base64", undefined>;
export type Base64Options = Readonly<{
    /** `standard` uses `+` and `/`; `url` uses `-` and `_` (RFC 4648 §5). Defaults to `standard`. */
    alphabet?: 'standard' | 'url';
    /** Whether `=` padding must be present or absent. Defaults to `required` for `standard`, `forbidden` for `url`. */
    padding?: 'required' | 'forbidden';
}>;
/** UTF-8 byte length of `text`. Returns `InvalidUtf8` on an unpaired surrogate. */
export declare function byteLength(text: string): number | import("@arki/failure").Failure<"string.invalid_utf8", undefined>;
/** Encodes `text` as UTF-8. Returns `InvalidUtf8` on an unpaired surrogate. */
export declare function utf8Encode(text: string): import("@arki/failure").Failure<"string.invalid_utf8", undefined> | Uint8Array<ArrayBuffer>;
/** Decodes strict UTF-8. Overlong forms, surrogates, and truncated sequences return `InvalidUtf8`. A leading BOM is kept. */
export declare function utf8Decode(bytes: Uint8Array): string | import("@arki/failure").Failure<"string.invalid_utf8", undefined>;
/** Encodes bytes as base64. */
export declare function bytesToBase64(bytes: Uint8Array, options?: Base64Options): string;
/**
 * Decodes base64 to bytes. Rejects whitespace, characters outside the selected
 * alphabet, misplaced or missing padding, impossible lengths, and nonzero
 * unused bits, returning `InvalidBase64`.
 */
export declare function base64ToBytes(encoded: string, options?: Base64Options): import("@arki/failure").Failure<"string.invalid_base64", undefined> | Uint8Array<ArrayBuffer>;
/** Encodes `text` (UTF-8) as base64. */
export declare function toBase64(text: string, options?: Base64Options): string | import("@arki/failure").Failure<"string.invalid_utf8", undefined>;
/** Decodes base64 to text. Returns `InvalidBase64` for malformed base64 and `InvalidUtf8` for invalid UTF-8. */
export declare function fromBase64(encoded: string, options?: Base64Options): string | import("@arki/failure").Failure<"string.invalid_base64", undefined> | import("@arki/failure").Failure<"string.invalid_utf8", undefined>;
//# sourceMappingURL=base64.d.ts.map