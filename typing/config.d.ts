import Handsontable from 'handsontable';
import { Options, IdTextPair } from 'select2';
import { EditorValue } from './value';
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
export declare type EditorCell = EditorConfigs & Handsontable.GridSettings & Handsontable.wot.CellCoords & {
    prop: any;
    visualRow: number;
    visualCol: number;
};
/**
 * Item received by event.
 */
export declare type IdTextPairEvent = IdTextPair & {
    selected: boolean;
};
/**
 * Editor change event.
 *
 * @example
 *
 *   editorEvents:
 *     editorSelecting(event, item, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare type ChangeEvent = (event: Event, item: IdTextPairEvent, value: IdTextPair[], cellProperties: EditorCell) => undefined;
/**
 * Editor state event.
 *
 * @example
 *
 *   editorEvents:
 *     editorOpen(event, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare type StateEvent = (event: Event, value: IdTextPair[], cellProperties: EditorCell) => undefined;
/**
 * Editor events.
 *
 * @example
 *
 *   editorEvents:
 *     editorOpening(event, value, cellProperties)
 *     changeSelected(event, item, value, cellProperties)
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export interface EditorEvents {
    selecting: ChangeEvent;
    unselecting: ChangeEvent;
    selected: ChangeEvent;
    unselected: ChangeEvent;
    open: StateEvent;
    close: StateEvent;
    opening: StateEvent;
    closing: StateEvent;
    apply(value: IdTextPair[], cellProperties: EditorCell): undefined;
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
