/**
 * Determine the belonging of value to the null or undefined type.
 *
 * @example
 *
 *    isNil(null) // True
 *    isNil(undefined) // True
 *    isNil(0) // False
 *    isNil('') // False
 *
 * @param value The value to check.
 * @return True when value is null-like; false otherwise.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function isNil(value) {
    return value === null || value === undefined;
}
/**
 * Determine the belonging of value to the primitive type.
 *
 * @example
 *
 *    isPrimitive({}) // False
 *    isPrimitive([]) // False
 *    isPrimitive(null) // True
 *    isPrimitive('') // True
 *    isPrimitive(0) // True
 *
 * @param value The value to check.
 * @return True when value is primitive category type; false otherwise.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function isPrimitive(value) {
    // Type of value.
    var valType = typeof value;
    // Checking type.
    return valType === 'string' || valType === 'number' || valType === 'boolean' || isNil(value);
}
/**
 * Determine the equality of two values without type comparison.
 *
 * @example
 *
 *    isEqual({}, {}) // False
 *    isEqual(null, undefined) // True
 *    isPrimitive(0, '0') // True
 *
 * @param value1 The first value to compare.
 * @param value2 The second value to compare.
 * @return True when values are equal; false otherwise.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function isEqual(value1, value2) {
    if (isPrimitive(value1) || isPrimitive(value2)) {
        return toString(value1) === toString(value2);
    }
    else {
        return value1 === value2;
    }
}
/**
 * Convert value to string.
 *
 * @example
 *
 *    toString(0) // '0'
 *    toString(null) // ''
 *    toString(true) // 'true'
 *    toString(undefined) // ''
 *
 * @param value The value to convert.
 * @return Value converted to string.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function toString(value) {
    if (isNil(value)) {
        return '';
    }
    // Do not convert when value already string.
    if (typeof value === 'string') {
        return value;
    }
    // Use string concat to convert.
    return "" + value;
}
/**
 * Editor compatible value.
 *
 * @example
 *
 *    compatValue(null, <prop>) // []
 *    compatValue([2], <prop>) // [2]
 *    compatValue(2, <prop>) // [2]
 *
 * @param value Editor value.
 * @param cellProperties Cell properties.
 * @return Internal compatible value.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function compatValue(value, cellProperties) {
    if (value === void 0) { value = []; }
    // Getter convert an existing value or return value from another source.
    var _a = cellProperties.editorInput, editorInput = _a === void 0 ? null : _a;
    // Original value.
    var val = value;
    // Verify existence of input transformer.
    if (typeof editorInput === 'function') {
        val = editorInput(cellProperties);
    }
    var outputValue = [];
    // Strip null like values.
    if (!isNil(val)) {
        if (Array.isArray(val)) {
            // Clone to avoid value mutability.
            outputValue = val.slice();
        }
        else {
            outputValue = [val];
        }
    }
    return outputValue;
}
/**
 * Determine belonging of target to base type.
 *
 * @param base Base class.
 * @param target Class to be checked.
 * @return True when editor extends Editor; false otherwise.
 */
export function isExtends(base, target) {
    if (target === void 0) { target = {}; }
    // Editor prototype.
    var _a = target.prototype, prototype = _a === void 0 ? null : _a;
    // End of prototype chain.
    if (!prototype) {
        return false;
    }
    // Compare constructors or/and prototype instance.
    return (prototype.constructor === base || prototype instanceof base || isExtends(base, Object.getPrototypeOf(prototype)));
}
//# sourceMappingURL=helper.js.map