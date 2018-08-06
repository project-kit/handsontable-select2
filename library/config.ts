import Handsontable from 'handsontable';
import { Options } from 'select2';
import { EditorValue, EditorIdText, EditorItem } from './value';

/**
 * Handsontable cell properties.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type HTCell = Handsontable.GridSettings &
  Handsontable.wot.CellCoords & {
    prop: any;
    visualRow: number;
    visualCol: number;
  };

/**
 * Editor options used by select2 plugin.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type EditorOptions = Options;

/**
 * Properties generated for each cell using column and individual config.
 *
 * @example
 *
 *   row: 0,
 *   col: 0,
 *   editorOptions: <Options>
 *   editorInput: <Function>
 *   editorOutput: <Function>
 *   editorEvents: <Events>
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type EditorCell = EditorConfigs & HTCell;

/**
 * Editor change event.
 *
 * @example
 *
 *   editorEvents:
 *     selecting(event, item, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type ChangeEvent = (
  event: Event,
  item: EditorItem,
  value: EditorIdText[],
  cellProperties: EditorCell
) => undefined;

/**
 * Editor state event.
 *
 * @example
 *
 *   editorEvents:
 *     opened(event, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type StateEvent = (event: Event, value: EditorIdText[], cellProperties: EditorCell) => undefined;

/**
 * Editor events.
 *
 * @example
 *
 *   editorEvents:
 *     opening(event, value, cellProperties)
 *     selected(event, item, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export interface EditorEvents {
  selecting: ChangeEvent;
  unselecting: ChangeEvent;
  selected: ChangeEvent;
  unselected: ChangeEvent;
  opening: StateEvent;
  opened: StateEvent;
  closing: StateEvent;
  closed: StateEvent;
  apply(value: EditorIdText[], cellProperties: EditorCell): undefined;
}

/**
 * Editor configuration can be specified on:
 *
 *   □ column:
 *       editorOptions: <Options>
 *
 *   □ cell:
 *       row: 0
 *       col: 2
 *       editorOptions: <Options>
 *       editorEvents: <Events>
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export interface EditorConfigs {
  /**
   * Delimiter to merge multi selection.
   */
  delimiter?: string;

  /**
   * Editor options.
   */
  editorOptions: Options;

  /**
   * Events emitted by editor.
   */
  editorEvents?: EditorEvents;

  /**
   * Used by editor to retrieve/change input value.
   */
  editorInput?(cellProperties: EditorCell): EditorValue;

  /**
   * Used by editor to set/change output value.
   */
  editorOutput?(value: EditorValue, cellProperties: EditorCell): any;
}
