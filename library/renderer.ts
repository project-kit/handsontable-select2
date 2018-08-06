import Handsontable from 'handsontable';
import { EditorCell } from './config';
import { compatValue, isNil } from './helper';
import { EditorIdText, EditorValue } from './value';

/**
 * Delimiter to merge multi selections.
 */
const DELIMITER: string = ', ';

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
export function renderer(
  instance: Handsontable,
  TD: HTMLElement,
  row: number,
  col: number,
  prop: string | number | any,
  value: EditorValue,
  cellProperties: EditorCell
): HTMLElement {
  // Specified delimiter.
  const { delimiter = null } = cellProperties;

  // Text displayed in the cell.
  const txt: string = compatValue(value, cellProperties)
    // Retrieve text from each item.
    .map(({ text }: EditorIdText): string => text)
    // Join by delimiter.
    .join(isNil(delimiter) ? DELIMITER : delimiter);

  // Base renderer.
  return Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, txt, cellProperties);
}
