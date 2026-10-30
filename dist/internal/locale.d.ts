/**
 * Locale-independent by default; locale-sensitive only when a BCP 47 tag is passed explicitly.
 * A malformed tag (an `Accept-Language` header, a cookie) makes `Intl` throw a `RangeError`: it falls back to
 * the default, locale-independent casing and is logged at DEBUG.
 */
export declare function lower(text: string, locale: string | undefined): string;
export declare function upper(text: string, locale: string | undefined): string;
//# sourceMappingURL=locale.d.ts.map