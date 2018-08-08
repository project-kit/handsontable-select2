import jQuery from 'jquery';
import Handsontable from 'handsontable';
import { Adapter } from './adapter';
import { isEqual, compatValue, isNil } from './helper';
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
export class Editor extends Handsontable.editors.BaseEditor {
    /**
     * Create editor root DOM.
     *
     * @return jQuery editor element.
     */
    static createEditorDOM() {
        // Create editor root.
        const $root = jQuery('<div class="select2-editor"></div>');
        // Create editor content.
        const $content = jQuery('<div class="select2-content"></div>');
        // Stop bubbling to avoid HT deselectOutside.
        $root.on('mousedown', (event) => {
            event.stopPropagation();
        });
        // Append content to root.
        $root.append($content);
        // Editor root element.
        return $root;
    }
    /**
     * Create editor select DOM.
     *
     * @return jQuery select element.
     */
    static createSelectDOM({ multiple }) {
        return jQuery('<select class="select2-target"></select>', { multiple });
    }
    /**
     * Editor output value.
     *
     * @param value Value to be converted output value.
     * @param cellProperties Cell properties.
     * @return Output value.
     */
    static outputValue(value, cellProperties) {
        // Verify transformer function existence.
        if (typeof cellProperties.editorOutput === 'function') {
            return cellProperties.editorOutput(value, cellProperties);
        }
        return value;
    }
    /**
     * Create editor item gets from event.
     *
     * @param data Base data.
     * @param selected Selected.
     * @return Editor item.
     */
    static createEventItem({ id, text }, selected) {
        return { id, text, selected };
    }
    /**
     * Editor focus.
     */
    focus() {
        this.triggerSelect2Event('focus');
    }
    /**
     * Editor prepare.
     */
    prepare(row, col, prop, TD, originalValue, cellProperties) {
        // Invoke base prepare.
        super.prepare(row, col, prop, TD, originalValue, cellProperties);
        // Verify options existence which must include data source.
        if (typeof cellProperties.editorOptions !== 'object') {
            throw new Error('Editor options is mandatory');
        }
    }
    /**
     * Editor begin editing.
     *
     * @param initialValue Init value.
     */
    beginEditing(initialValue) {
        // Re-initialize original value.
        this.originalValue = this.instance.getDataAtCell(this.row, this.col);
        // Copy editor options.
        this.options = Object.assign({}, this.cellProperties.editorOptions);
        // Handle select2 data source.
        if (this.options.data) {
            // Create data adapter from existing data options.
            this.options.dataAdapter = this.createDataAdapter(this.options);
        }
        else if (this.options.dataAdapter) {
            // Wrap existing adapter to give user access to cell properties.
            this.options.dataAdapter = this.wrapDataAdapter(this.cellProperties);
        }
        // Mute and give control to editor.
        this.instance.unlisten();
        // Create editor DOM.
        this.$editor = Editor.createEditorDOM();
        // Create select DOM.
        this.$select = Editor.createSelectDOM(this.options);
        // Append select element to editor DOM.
        this.$editor.find('.select2-content').append(this.$select);
        // Create jQuery TD.
        this.$TD = jQuery(this.TD);
        // Empty cell.
        this.$TD.empty();
        // Append editor to cell.
        this.$TD.append(this.$editor);
        // Begin editing.
        super.beginEditing(initialValue);
    }
    /**
     * Editor open.
     */
    open() {
        // Initialize select2 plugin.
        this.$select.select2(this.options);
        // Open select2.
        this.$select.select2('open');
        // Register events.
        this.registerEvents();
    }
    /**
     * Finish editing.
     *
     * @param restore Restore original.
     * @param ctrlDown Ctrl down key.
     * @param callback Finish callback.
     */
    finishEditing(restore, ctrlDown, callback) {
        if (restore) {
            this.setValue(this.originalValue);
        }
        super.finishEditing(restore, ctrlDown, callback);
    }
    /**
     * Editor discard.
     *
     * @param validationResult Editor validation result.
     */
    discardEditor(validationResult) {
        // Verify validation results.
        if (validationResult || isNil(validationResult)) {
            // Trigger event to finalize editor.
            this.invokeEventHandler('apply');
            // Refresh cell with new value.
            this.refreshCell();
            // Listen table after all finalized.
            setTimeout(() => {
                this.instance.listen();
            });
        }
        // Invoke base discard.
        super.discardEditor(validationResult);
    }
    /**
     * Editor close.
     */
    close() {
        // Destroy select2 on close.
        if (this.isActive()) {
            // Clean up listeners.
            this.$select.off();
            // Destroy Select2
            this.$select.select2('destroy');
        }
        // Remove editor.
        if (this.$editor) {
            // Clean up listeners.
            this.$editor.off();
            // Remove editor.
            this.$editor.remove();
        }
    }
    /**
     * Editor get value.
     *
     * @return Cell value.
     */
    getValue() {
        // Value operated by editor.
        let editorValue = this.value;
        // Handle value from single selection editor.
        if (!this.options.multiple) {
            // Unpack value for single select.
            [editorValue = null] = editorValue || [];
        }
        // Revert back to original when values same without type checking.
        // Needed to avoid changes from undefined to null.
        if (isEqual(editorValue, this.originalValue)) {
            editorValue = this.originalValue;
        }
        return Editor.outputValue(editorValue, this.cellProperties);
    }
    /**
     * Editor set value.
     *
     * @param value Cell value.
     */
    setValue(value) {
        // Compatible input value must be generated from original cell value.
        this.value = compatValue(this.originalValue, this.cellProperties);
    }
    /**
     * Editor save value.
     *
     * @param value Cell value.
     * @param ctrlDown Control down.
     */
    saveValue(value, ctrlDown) {
        const { visualRow, visualCol } = this.cellProperties;
        // Set directly to cell without duckSchema.
        this.instance.setDataAtCell(visualRow, visualCol, this.getValue(), 'edit');
    }
    /**
     * Determine editor activeness.
     *
     * @return Editor active state.
     */
    isActive() {
        // Check select2 state.
        return this.$select && this.$select.hasClass('select2-hidden-accessible');
    }
    /**
     * Editor refresh value.
     */
    refreshValue() {
        // New value need to be refreshed in cell.
        let value = this.instance.getDataAtCell(this.cellProperties.visualRow, this.cellProperties.visualCol);
        // HT clean up without active editor.
        if (!value && !this.isActive()) {
            if (isEqual(this.originalValue, value)) {
                value = this.originalValue;
            }
            else {
                value = Editor.outputValue(null, this.cellProperties);
            }
            // Current value
            this.value = value;
            // Assign new original value.
            this.originalValue = value;
            // Trigger event to finalize editor.
            this.invokeEventHandler('apply');
            // Refresh cell.
            this.refreshCell();
        }
    }
    /**
     * Refresh editor.
     */
    refreshEditor() {
        this.triggerSelect2Event('change.select2');
    }
    /**
     * Refresh cell.
     */
    refreshCell() {
        const { visualRow, visualCol } = this.cellProperties;
        // Retrieve cell renderer.
        const renderer = this.instance.getCellRenderer(visualRow, visualCol);
        // Invoke renderer.
        renderer(this.instance, this.TD, visualRow, visualCol, this.prop, this.value, this.cellProperties);
    }
    /**
     * Trigger select2 event.
     *
     * @param name Event name.
     */
    triggerSelect2Event(name) {
        if (this.isActive()) {
            this.$select.trigger(name);
        }
    }
    /**
     * Create data adapter.
     *
     * @param options Select2 options.
     * @return DataAdapter wrapper.
     */
    createDataAdapter({ data }) {
        const getValue = () => this.value;
        // Data adapter covers data option.
        return class extends Adapter.DataArray {
            // Retrieve current value.
            current(callback) {
                callback(getValue());
            }
            query(query, callback) {
                callback({ results: data });
            }
        };
    }
    /**
     * Wrap data adapter to give access to cell properties.
     *
     * @param cellProperties Cell properties.
     * @return DataAdapter wrapper.
     */
    wrapDataAdapter(cellProperties) {
        const getValue = () => this.value;
        // Wrap adapter class.
        return class extends cellProperties.editorOptions.dataAdapter {
            // Retrieve current value.
            current(callback) {
                callback(getValue());
            }
            // Call user specified dataAdapter query.
            query(query, callback) {
                super.query(getValue(), cellProperties, query, callback);
            }
        };
    }
    /**
     * Register editor events.
     */
    registerEvents() {
        // Select2 instance.
        const instance = this.$select.data('select2');
        // Catch instance keypress.
        instance.on('keypress', (event) => {
            const { ESCAPE, TAB } = Handsontable.helper.KEY_CODES;
            if (event.which === ESCAPE) {
                this.finishEditing(true);
            }
            else if (event.which === TAB) {
                this.finishEditing();
            }
        });
        // Register events.
        this.$select
            // Handle opening.
            .on('select2:opening', this.invokeEventHandler.bind(this, 'opening'))
            // Handle open.
            .on('select2:open', this.invokeEventHandler.bind(this, 'opened'))
            // Handle closing.
            .on('select2:closing', this.invokeEventHandler.bind(this, 'closing'))
            // Handle close.
            .on('select2:close', this.invokeEventHandler.bind(this, 'closed'))
            // Handle changing in data.
            .on('select2:selecting', this.beforeSelect.bind(this))
            // Handle change in data.
            .on('select2:select', this.afterSelect.bind(this))
            // Handle changing in data.
            .on('select2:unselecting', this.beforeUnselect.bind(this))
            // Handle change in data.
            .on('select2:unselect', this.afterUnselect.bind(this));
    }
    /**
     * Before select hook.
     *
     * @param event Event.
     */
    beforeSelect(event) {
        // Data received from event.
        const selectingItem = Editor.createEventItem(event.params.args.data, true);
        // Invoke event that can change value.
        this.invokeEventHandler('selecting', event, selectingItem);
        // Check event preventing.
        if (!event.isDefaultPrevented()) {
            this.addItem(selectingItem);
        }
    }
    /**
     * Before unselect hook.
     *
     * @param event Event.
     */
    beforeUnselect(event) {
        // Data received from event.
        const unselectingItem = Editor.createEventItem(event.params.args.data, false);
        // Invoke event that can change value.
        this.invokeEventHandler('unselecting', event, unselectingItem);
        // Check event preventing.
        if (!event.isDefaultPrevented()) {
            this.removeItem(unselectingItem);
        }
    }
    /**
     * After select hook.
     *
     * @param event Event.
     */
    afterSelect(event) {
        // Already selected item.
        const selectedItem = Editor.createEventItem(event.params.data, true);
        // Invoke event that can change value.
        this.invokeEventHandler('selected', event, selectedItem);
        // After change handler.
        this.afterChangeHandler();
    }
    /**
     * After unselect hook.
     *
     * @param event Event.
     */
    afterUnselect(event) {
        // Already unselected item.
        const unselectedItem = Editor.createEventItem(event.params.data, true);
        // Invoke event that can change value.
        this.invokeEventHandler('unselected', event, unselectedItem);
        // After change handler.
        this.afterChangeHandler();
    }
    /**
     * After change handler.
     */
    afterChangeHandler() {
        // Select2 instance.
        const instance = this.$select.data('select2');
        // Editor options.
        const { closeOnSelect, multiple } = this.options;
        // Refresh editor after handler invoked.
        this.refreshEditor();
        // On single selection editor can be closed.
        if (closeOnSelect) {
            if (!multiple) {
                this.finishEditing();
            }
        }
        if (multiple && instance.dropdown) {
            if (typeof instance.dropdown._positionDropdown === 'function') {
                instance.dropdown._positionDropdown();
            }
            if (typeof instance.dropdown._resizeDropdown === 'function') {
                instance.dropdown._resizeDropdown();
            }
        }
    }
    /**
     * Add item to editor value.
     *
     * @param item Editor item.
     */
    addItem({ id, text }) {
        // Editor options.
        const { multiple } = this.options;
        // Clean up value on single selection.
        if (!multiple) {
            this.value = [];
        }
        // Copy to create new value.
        this.value = [...this.value, { id, text }];
    }
    /**
     * Remove item from editor value.
     *
     * @param item Editor item.
     */
    removeItem({ id }) {
        // Remove item from array value.
        this.value = this.value.filter((val) => {
            return !isEqual(val.id, id);
        });
    }
    /**
     * Invoke specified event handler.
     *
     * @param eventType Event type.
     * @param args Handler arguments.
     * @return Event output.
     */
    invokeEventHandler(eventType, ...args) {
        // Defined editor events.
        const { editorEvents = {} } = this.cellProperties;
        // Invoke only when handlers exist.
        Object.keys(editorEvents).forEach((key) => {
            const events = key.split(/\s+/g);
            for (const name of events) {
                if (name === eventType && typeof editorEvents[key] === 'function') {
                    // Always include current value and cell properties
                    args.push(this.value, this.cellProperties);
                    // Invoke handler with specified arguments
                    editorEvents[key].apply(this, args);
                }
            }
        });
    }
}
//# sourceMappingURL=editor.js.map