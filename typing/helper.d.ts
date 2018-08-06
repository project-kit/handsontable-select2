import { EditorCell } from './config';
import { EditorValue, EditorIdText } from './value';
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
export declare function isNil(value: any): value is null | undefined;
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
export declare function isPrimitive(value: any): boolean;
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
export declare function isEqual(value1: any, value2: any): boolean;
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
export declare function toString(value: any): string;
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
export declare function compatValue(value: EditorValue, cellProperties: EditorCell): EditorIdText[];
/**
 * Determine belonging of target to base type.
 *
 * @param base Base class.
 * @param target Class to be checked.
 * @return True when editor extends Editor; false otherwise.
 */
export declare function isExtends(base: any, target?: any): boolean;
