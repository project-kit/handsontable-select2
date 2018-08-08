/// <reference types="jquery" />
import Handsontable from 'handsontable';
import { Event, DataParams, IngParams } from 'select2';
import { EditorCell, EditorOptions } from './config';
import { EditorValue, EditorIdText, EditorItem } from './value';
/**
 * Editor based on select2 and can activated by HT on edit mode.
 *
 *   □ column:
 *       type: 'select2'
 *
 *   □ column:
 *       editor: 'Select2Editor' | <Editor>
 *
 *   □ cell:
 *       editor: 'Select2Editor' | <Editor>
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export declare class Editor extends Handsontable.editors.BaseEditor {
    /**
     * Current value.
     */
    value: EditorIdText[];
    /**
     * Editor options.
     */
    options: EditorOptions;
    /**
     * Original value.
     */
    originalValue: any;
    /**
     * Cell properties.
     */
    cellProperties: EditorCell;
    /**
     * TD cell element.
     */
    $TD: JQuery;
    /**
     * Editor element.
     */
    $editor: JQuery;
    /**
     * Select element.
     */
    $select: JQuery;
    /**
     * Create editor root DOM.
     *
     * @return jQuery editor element.
     */
    static createEditorDOM(): JQuery;
    /**
     * Create editor select DOM.
     *
     * @return jQuery select element.
     */
    static createSelectDOM({ multiple }: EditorOptions): JQuery;
    /**
     * Editor output value.
     *
     * @param value Value to be converted output value.
     * @param cellProperties Cell properties.
     * @return Output value.
     */
    static outputValue(value: EditorValue, cellProperties: EditorCell): any;
    /**
     * Create editor item gets from event.
     *
     * @param data Base data.
     * @param selected Selected.
     * @return Editor item.
     */
    static createEventItem({ id, text }: any, selected: boolean): EditorItem;
    /**
     * Editor focus.
     */
    focus(): void;
    /**
     * Editor prepare.
     */
    prepare(row: number, col: number, prop: string | number | any, TD: HTMLElement, originalValue: any, cellProperties: EditorCell): void;
    /**
     * Editor begin editing.
     *
     * @param initialValue Init value.
     */
    beginEditing(initialValue?: string): void;
    /**
     * Editor open.
     */
    open(): void;
    /**
     * Finish editing.
     *
     * @param restore Restore original.
     * @param ctrlDown Ctrl down key.
     * @param callback Finish callback.
     */
    finishEditing(restore?: boolean, ctrlDown?: boolean, callback?: () => void): void;
    /**
     * Editor discard.
     *
     * @param validationResult Editor validation result.
     */
    discardEditor(validationResult: boolean | undefined): void;
    /**
     * Editor close.
     */
    close(): void;
    /**
     * Editor get value.
     *
     * @return Cell value.
     */
    getValue(): null | undefined | any;
    /**
     * Editor set value.
     *
     * @param value Cell value.
     */
    setValue(value: any): void;
    /**
     * Editor save value.
     *
     * @param value Cell value.
     * @param ctrlDown Control down.
     */
    saveValue(value: any, ctrlDown: boolean): void;
    /**
     * Determine editor activeness.
     *
     * @return Editor active state.
     */
    isActive(): boolean;
    /**
     * Editor refresh value.
     */
    refreshValue(): void;
    /**
     * Refresh editor.
     */
    refreshEditor(): void;
    /**
     * Refresh cell.
     */
    refreshCell(): void;
    /**
     * Trigger select2 event.
     *
     * @param name Event name.
     */
    triggerSelect2Event(name: string): void;
    /**
     * Create data adapter.
     *
     * @param options Select2 options.
     * @return DataAdapter wrapper.
     */
    protected createDataAdapter(this: Editor, { data }: EditorOptions): any;
    /**
     * Wrap data adapter to give access to cell properties.
     *
     * @param cellProperties Cell properties.
     * @return DataAdapter wrapper.
     */
    protected wrapDataAdapter(this: Editor, cellProperties: EditorCell): new () => {};
    /**
     * Register editor events.
     */
    protected registerEvents(): void;
    /**
     * Before select hook.
     *
     * @param event Event.
     */
    protected beforeSelect(event: Event<Element, IngParams>): void;
    /**
     * Before unselect hook.
     *
     * @param event Event.
     */
    protected beforeUnselect(event: Event<Element, IngParams>): void;
    /**
     * After select hook.
     *
     * @param event Event.
     */
    protected afterSelect(event: Event<Element, DataParams>): void;
    /**
     * After unselect hook.
     *
     * @param event Event.
     */
    protected afterUnselect(event: Event<Element, DataParams>): void;
    /**
     * After change handler.
     */
    protected afterChangeHandler(): void;
    /**
     * Add item to editor value.
     *
     * @param item Editor item.
     */
    protected addItem({ id, text }: EditorItem): void;
    /**
     * Remove item from editor value.
     *
     * @param item Editor item.
     */
    protected removeItem({ id }: EditorItem): void;
    /**
     * Invoke specified event handler.
     *
     * @param eventType Event type.
     * @param args Handler arguments.
     * @return Event output.
     */
    protected invokeEventHandler(eventType: string, ...args: any[]): void;
}
