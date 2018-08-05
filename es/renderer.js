import Handsontable from 'handsontable';
import { compatValue, isNil } from './helper';
/**
 * Default delimiter to merge multi selection.
 */
var DELIMITER = ', ';
/**
 * Renderer used to generate cell HTMLElement.
 *
 * @example
 *
 *   □ column:
 *       type: 'select2'
 *
 *   □ column:
 *       renderer: 'Select2Renderer' | <Renderer>
 *
 *   □ cell:
 *       renderer: 'Select2Renderer' | <Renderer>
 *
 * @param instance Instance.
 * @param TD Table cell.
 * @param row Row index.
 * @param col Col index.
 * @param prop Property name.
 * @param value Cell value.
 * @param cellProperties Cell properties.
 * @return HTMLElement cell.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function renderer(instance, TD, row, col, prop, value, cellProperties) {
    // Specified delimiter.
    var _a = cellProperties.delimiter, delimiter = _a === void 0 ? null : _a;
    // Text displayed in the cell.
    var txt = compatValue(value, cellProperties)
        // Retrieve text from each item.
        .map(function (_a) {
        var text = _a.text;
        return text;
    })
        // Join by delimiter.
        .join(isNil(delimiter) ? DELIMITER : delimiter);
    // Base renderer.
    return Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, txt, cellProperties);
}
//# sourceMappingURL=renderer.js.map