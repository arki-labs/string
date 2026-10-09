/**
 * Non-negative 32-bit hash of `text` over its UTF-16 code units: the classic `h * 31 + unit`
 * (Java `String.hashCode`) with the sign dropped. Stable across runtimes and releases, so it is safe
 * for picking a deterministic variant (`hashCode(id) % variants.length`) or a cache key. Not
 * cryptographic and not collision-resistant.
 */
export declare function hashCode(text: string): number;
//# sourceMappingURL=hash.d.ts.map