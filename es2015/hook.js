import Handsontable from 'handsontable';
import { Editor } from './editor';
import { isEqual } from './helper';
/**
 * Determine belonging of editor to <#Editor> type.
 *
 * @param editor Class to be checked.
 * @return True when editor extends Editor; false otherwise.
 */
function isExtends(editor = {}) {
    // Editor prototype.
    const { prototype = null } = editor;
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
    // Iterate changes to analyze cell metadata.
    changes.forEach((change) => {
        // Retrieve editor class.
        const editor = this.getCellEditor(change[0], this.propToCol(change[1]));
        // New value to be set at cell.
        const newVal = change[3];
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