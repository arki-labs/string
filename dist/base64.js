/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/**
 * Helper class to base64 encode/decode values with option
 * for url encoding and decoding
 */
class Base64 {
    encode(data, encoding) {
        if (typeof data === 'string') {
            return Buffer.from(data, encoding).toString('base64');
        }
        return Buffer.from(data).toString('base64');
    }
    decode(encoded, encoding = 'utf-8', strict = false) {
        if (Buffer.isBuffer(encoded)) {
            return encoded.toString(encoding);
        }
        const decoded = Buffer.from(encoded, 'base64').toString(encoding);
        const isInvalid = this.encode(decoded, encoding) !== encoded;
        if (strict && isInvalid) {
            throw new Error('Cannot decode malformed value');
        }
        return isInvalid ? null : decoded;
    }
    urlEncode(data, encoding) {
        const encoded = typeof data === 'string' ? this.encode(data, encoding) : this.encode(data);
        return encoded.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    }
    urlDecode(encoded, encoding = 'utf-8', strict = false) {
        if (Buffer.isBuffer(encoded)) {
            return encoded.toString(encoding);
        }
        const decoded = Buffer.from(encoded, 'base64').toString(encoding);
        const isInvalid = this.urlEncode(decoded, encoding) !== encoded;
        if (strict && isInvalid) {
            throw new Error('Cannot urlDecode malformed value');
        }
        return isInvalid ? null : decoded;
    }
}
export const base64 = new Base64();
//# sourceMappingURL=base64.js.map