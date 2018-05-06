import Handsontable from 'handsontable';
import { EditorCell } from './config';
import { EditorValue } from './value';
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
export declare function renderer(instance: Handsontable, TD: HTMLElement, row: number, col: number, prop: string | number | any, value: EditorValue, cellProperties: EditorCell): HTMLElement;
