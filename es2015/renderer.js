import Handsontable from 'handsontable';
import { compatValue, isNil } from './helper';
/**
 * Delimiter to merge multi selections.
 */
const DELIMITER = ', ';
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
    const { delimiter = null } = cellProperties;
    // Text displayed in the cell.
    const txt = compatValue(value, cellProperties)
        // Retrieve text from each item.
        .map(({ text }) => text)
        // Join by delimiter.
        .join(isNil(delimiter) ? DELIMITER : delimiter);
    // Base renderer.
    return Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, txt, cellProperties);
}
//# sourceMappingURL=renderer.js.map