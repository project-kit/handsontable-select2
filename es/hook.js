import Handsontable from 'handsontable';
import { Editor } from './editor';
import { isEqual } from './helper';
/**
 * Determine belonging of editor to <#Editor> type.
 *
 * @param editor Class to be checked.
 * @return True when editor extends Editor; false otherwise.
 */
function isExtends(editor) {
    if (editor === void 0) { editor = {}; }
    // Editor prototype.
    var _a = editor.prototype, prototype = _a === void 0 ? null : _a;
    // End of prototype chain.
    if (!prototype) {
        return false;
    }
    // Compare constructors or/and prototype instance.
    return prototype.constructor === Editor || prototype instanceof Editor || isExtends(Object.getPrototypeOf(prototype));
}
/**
 * Before change handler to correctly clean up cell.
 *
 * @param changes HT changes.
 * @param source Change source.
 */
function beforeChange(changes, source) {
    var _this = this;
    // Iterate changes to analyze cell metadata.
    changes.forEach(function (change) {
        // Retrieve editor class.
        var editor = _this.getCellEditor(change[0], _this.propToCol(change[1]));
        // New value to be set at cell.
        var newVal = change[3];
        // Verify editor to determine that it's suitable to change value to null.
        if (newVal === '' && (isEqual(editor, Editor) || isExtends(editor))) {
            // Replace change new value to null.
            change[3] = null;
        }
    });
}
// Register global hook to correctly handle cell clean up.
Handsontable.hooks.add('beforeChange', beforeChange);
//# sourceMappingURL=hook.js.map