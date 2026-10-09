export function sum(values) {
    let total = 0;
    for (const value of values)
        total += value;
    return total;
}
/** Ascending copy; `Array.prototype.toSorted` is ES2023 and missing from some mobile engines. */
export function sortedAscending(values) {
    // eslint-disable-next-line unicorn/no-array-sort -- copying first keeps the input untouched
    return [...values].sort((a, b) => a - b);
}
//# sourceMappingURL=math.js.map