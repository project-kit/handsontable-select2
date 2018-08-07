import Handsontable from 'handsontable';
import { Editor } from './editor';
import { EditorValue } from './value';
import { isEqual, isExtends, isNil } from './helper';

/**
 * Autofill source.
 */
const autofillSource: string = 'Autofill.fill';

/**
 * Autofill metadata.
 */
let autofillMetadata: {
  data: any[];
  start: CellCoordinates;
  end: CellCoordinates;
} | null;

/**
 * Autofill cell coordinates.
 */
type CellCoordinates = Handsontable.wot.CellCoords;

/**
 * Retrieve autofill cell value.
 *
 * @param data Fill data.
 * @param row Row index
 * @param col Col index.
 * @return Cell value.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
function getAutofillCellValue(data: any[], row: number, col: number): any {
  // Row value.
  const value: any = data[row % data.length];

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
export function beforeChange(this: Handsontable, changes: any[][], source: string): void {
  // Iterate changes to analyze cell metadata.
  changes.forEach(
    (change: any[]): void => {
      // Retrieve editor class.
      const editor: any = this.getCellEditor(change[0], this.propToCol(change[1]));

      // New value to be set at cell.
      const newVal: string | EditorValue | any = change[3];

      // Verify editor to determine that it's suitable to change value to null.
      if (newVal === '' && (isEqual(editor, Editor) || isExtends(Editor, editor))) {
        // Replace change new value to null.
        change[3] = null;
      }
    }
  );
}

/**
 * Before autofill hook to initialize autofill metadata.
 *
 * @param start Start coordinates.
 * @param end End coordinates.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function beforeAutofill(this: Handsontable, start: CellCoordinates, end: CellCoordinates): void {
  // Initial autofill metadata.
  autofillMetadata = { data: [], start, end };
}

/**
 * After set data at cell hook to apply editor value.
 *
 * @param changes Changes to be applied.
 * @param source Operation causing change.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function afterSetDataAtCell(this: Handsontable, changes: any[][], source: string): void {
  if (source === autofillSource && autofillMetadata) {
    // Data to be set as autofilled.
    const { data } = autofillMetadata;

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
function beforeAutofillInsidePopulate(this: Handsontable, index: CellCoordinates, direction: string, data: any[]): any {
  if (autofillMetadata) {
    // Cell row index.
    const cellRow: number = autofillMetadata.start.row + index.row;

    // Cell col index.
    const cellCol: number = autofillMetadata.start.col + index.col;

    // Cell autofill value.
    const cellVal: any = getAutofillCellValue(data, index.row, index.col);

    // Original value.
    const origVal: any = this.getDataAtCell(cellRow, cellCol);

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
(<any>Handsontable.hooks).add('beforeChange', beforeChange);

// Register global hook tto initialize autofill metadata.
(<any>Handsontable.hooks).add('beforeAutofill', beforeAutofill);

// Register global hook to correctly apply editor value.
(<any>Handsontable.hooks).add('afterSetDataAtCell', afterSetDataAtCell);

// Register global hook to prevent standard duckSchema process.
(<any>Handsontable.hooks).add('beforeAutofillInsidePopulate', beforeAutofillInsidePopulate);
