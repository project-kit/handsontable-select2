import Handsontable from 'handsontable';
/**
 * Autofill cell coordinates.
 */
declare type CellCoordinates = Handsontable.wot.CellCoords;
/**
 * Before change hook to correctly clean up cell.
 *
 * @param changes Changes to be applied.
 * @param source Operation causing change.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare function beforeChange(this: Handsontable, changes: any[][], source: string): void;
/**
 * Before autofill hook to initialize autofill metadata.
 *
 * @param start Start coordinates.
 * @param end End coordinates.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare function beforeAutofill(this: Handsontable, start: CellCoordinates, end: CellCoordinates): void;
/**
 * After set data at cell hook to apply editor value.
 *
 * @param changes Changes to be applied.
 * @param source Operation causing change.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare function afterSetDataAtCell(this: Handsontable, changes: any[][], source: string): void;
export {};
