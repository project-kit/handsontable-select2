import Handsontable from 'handsontable';
import { Editor } from './editor';
import { isEqual, isExtends, isNil } from './helper';
/**
 * Autofill source.
 */
var autofillSource = 'Autofill.fill';
/**
 * Autofill metadata.
 */
var autofillMetadata;
/**
 * Retrieve autofill cell value.
 *
 * @param data Fill data.
 * @param row Row index
 * @param col Col index.
 * @return Cell value.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
function getAutofillCellValue(data, row, col) {
    // Row value.
    var value = data[row % data.length];
    // Cell value.
    return value[col % value.length];
}
/**
 * Before change hook to correctly clean up cell.
 *
 * @param changes Changes to be applied.
 * @param source Operation causing change.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function beforeChange(changes, source) {
    var _this = this;
    // Iterate changes to analyze cell metadata.
    changes.forEach(function (change) {
        // Retrieve editor class.
        var editor = _this.getCellEditor(change[0], _this.propToCol(change[1]));
        // New value to be set at cell.
        var newVal = change[3];
        // Verify editor to determine that it's suitable to change value to null.
        if (newVal === '' && (isEqual(editor, Editor) || isExtends(Editor, editor))) {
            // Replace change new value to null.
            change[3] = null;
        }
    });
}
/**
 * Before autofill hook to initialize autofill metadata.
 *
 * @param start Start coordinates.
 * @param end End coordinates.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function beforeAutofill(start, end) {
    // Initial autofill metadata.
    autofillMetadata = { data: [], start: start, end: end };
}
/**
 * After set data at cell hook to apply editor value.
 *
 * @param changes Changes to be applied.
 * @param source Operation causing change.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function afterSetDataAtCell(changes, source) {
    if (source === autofillSource && autofillMetadata) {
        // Data to be set as autofilled.
        var data = autofillMetadata.data;
        // Clear remaining autofill.
        autofillMetadata = null;
        // Clear current changes.
        changes.length = 0;
        // Autofill new data.
        this.setDataAtCell(data, autofillSource);
    }
}
/**
 * Before autofill populate hook to prevent standard duckSchema process.
 *
 * @param index Autofill coordinates.
 * @param direction Fill direction.
 * @param data Autofill data.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
function beforeAutofillInsidePopulate(index, direction, data) {
    if (autofillMetadata) {
        // Cell row index.
        var cellRow = autofillMetadata.start.row + index.row;
        // Cell col index.
        var cellCol = autofillMetadata.start.col + index.col;
        // Cell autofill value.
        var cellVal = getAutofillCellValue(data, index.row, index.col);
        // Original value.
        var origVal = this.getDataAtCell(cellRow, cellCol);
        // Check real change.
        if (!isNil(origVal) || !isNil(cellVal)) {
            // Cell data must be stored for further processing.
            autofillMetadata.data.push([cellRow, cellCol, cellVal]);
        }
    }
    // Prevent value processed in standard way.
    return {
        value: {
            __not_existing_to_break_duck_schema__: true
        }
    };
}
// Register global hook to correctly handle cell clean up.
Handsontable.hooks.add('beforeChange', beforeChange);
// Register global hook tto initialize autofill metadata.
Handsontable.hooks.add('beforeAutofill', beforeAutofill);
// Register global hook to correctly apply editor value.
Handsontable.hooks.add('afterSetDataAtCell', afterSetDataAtCell);
// Register global hook to prevent standard duckSchema process.
Handsontable.hooks.add('beforeAutofillInsidePopulate', beforeAutofillInsidePopulate);
//# sourceMappingURL=hook.js.map