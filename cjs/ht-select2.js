(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('handsontable')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'handsontable'], factory) :
    (factory((global.HTSelect2 = {}),global.jQuery,global.Handsontable));
}(this, (function (exports,jQuery,Handsontable) { 'use strict';

    jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;
    Handsontable = Handsontable && Handsontable.hasOwnProperty('default') ? Handsontable['default'] : Handsontable;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * Default adapters used by select2.
     *
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    var adapter = {
        get DataBase() {
            return jQuery.fn.select2.amd.require('select2/data/base');
        },
        get DataArray() {
            return jQuery.fn.select2.amd.require('select2/data/array');
        },
        get DataAjax() {
            return jQuery.fn.select2.amd.require('select2/data/ajax');
        },
        get DataTags() {
            return jQuery.fn.select2.amd.require('select2/data/tags');
        }
    };

    /**
     * Determine the belonging of value to the null or undefined type.
     *
     * @example
     *
     *    isNil(null) // True
     *    isNil(undefined) // True
     *    isNil(0) // False
     *    isNil('') // False
     *
     * @param value The value to check.
     * @return True when value is null-like; false otherwise.
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    function isNil(value) {
        return value === null || value === undefined;
    }
    /**
     * Determine the belonging of value to the primitive type.
     *
     * @example
     *
     *    isPrimitive({}) // False
     *    isPrimitive([]) // False
     *    isPrimitive(null) // True
     *    isPrimitive('') // True
     *    isPrimitive(0) // True
     *
     * @param value The value to check.
     * @return True when value is primitive category type; false otherwise.
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    function isPrimitive(value) {
        // Type of value.
        var valType = typeof value;
        // Checking type.
        return valType === 'string' || valType === 'number' || valType === 'boolean' || isNil(value);
    }
    /**
     * Determine the equality of two values without type comparison.
     *
     * @example
     *
     *    isEqual({}, {}) // False
     *    isEqual(null, undefined) // True
     *    isPrimitive(0, '0') // True
     *
     * @param value1 The first value to compare.
     * @param value2 The second value to compare.
     * @return True when values are equal; false otherwise.
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    function isEqual(value1, value2) {
        if (isPrimitive(value1) || isPrimitive(value2)) {
            return toString(value1) === toString(value2);
        }
        else {
            return value1 === value2;
        }
    }
    /**
     * Convert value to string.
     *
     * @example
     *
     *    toString(0) // '0'
     *    toString(null) // ''
     *    toString(true) // 'true'
     *    toString(undefined) // ''
     *
     * @param value The value to convert.
     * @return Value converted to string.
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    function toString(value) {
        if (isNil(value)) {
            return '';
        }
        // Do not convert when value already string.
        if (typeof value === 'string') {
            return value;
        }
        // Use string concat to convert.
        return "" + value;
    }
    /**
     * Editor compatible value.
     *
     * @example
     *
     *    compatValue(null, <prop>) // []
     *    compatValue([2], <prop>) // [2]
     *    compatValue(2, <prop>) // [2]
     *
     * @param value Editor value.
     * @param cellProperties Cell properties.
     * @return Internal compatible value.
     * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
     */
    function compatValue(value, cellProperties) {
        if (value === void 0) { value = []; }
        // Getter convert an existing value or return value from another source.
        var _a = cellProperties.editorInput, editorInput = _a === void 0 ? null : _a;
        // Original value.
        var val = value;
        // Verify existence of input transformer.
        if (typeof editorInput === 'function') {
            val = editorInput(cellProperties);
        }
        var outputValue = [];
        // Strip null like values.
        if (!isNil(val)) {
            if (Array.isArray(val)) {
                // Clone to avoid value mutability.
                outputValue = val.slice();
            }
            else {
                outputValue = [val];
            }
        }
        return outputValue;
    }

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
    var Editor = /** @class */ (function (_super) {
        __extends(Editor, _super);
        function Editor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create editor root DOM.
         *
         * @return Root HTMLElement.
         */
        Editor.createEditorDOM = function () {
            // Create editor root.
            var $root = jQuery('<div class="select2-editor"></div>');
            // Create editor content.
            var $content = jQuery('<div class="select2-content"></div>');
            // Stop bubbling to avoid HT deselectOutside.
            $root.on('mousedown', function (event) {
                event.stopPropagation();
            });
            // Append to root.
            $root.append($content);
            // Editor root.
            return $root;
        };
        /**
         * Create editor select DOM.
         *
         * @return Select HTMLElement.
         */
        Editor.createSelectDOM = function (_a) {
            var multiple = _a.multiple;
            return jQuery('<select class="select2-target"></select>', { multiple: multiple });
        };
        /**
         * Editor output value.
         *
         * @param value Internal value to output value.
         * @param cellProperties Cell properties.
         * @return Output value.
         */
        Editor.outputValue = function (value, cellProperties) {
            // Verify transformer function existence.
            if (typeof cellProperties.editorOutput === 'function') {
                return cellProperties.editorOutput(value, cellProperties);
            }
            return value;
        };
        /**
         * Create event IdTextPair item.
         *
         * @param data Base data.
         * @param selected Selected state.
         * @return Created item.
         */
        Editor.createEventItem = function (_a, selected) {
            var id = _a.id, text = _a.text;
            return { id: id, text: text, selected: selected };
        };
        /**
         * Editor focus.
         */
        Editor.prototype.focus = function () {
            this.triggerSelect2Event('focus');
        };
        /**
         * Editor prepare.
         */
        Editor.prototype.prepare = function (row, col, prop, TD, originalValue, cellProperties) {
            // Invoke base prepare.
            _super.prototype.prepare.call(this, row, col, prop, TD, originalValue, cellProperties);
            // Verify options existence which must include data source.
            if (typeof cellProperties.editorOptions !== 'object') {
                throw new Error('Editor options is mandatory');
            }
        };
        /**
         * Editor begin editing.
         *
         * @param initialValue Init value.
         */
        Editor.prototype.beginEditing = function (initialValue) {
            // Copy editor options.
            this.options = __assign({}, this.cellProperties.editorOptions);
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
            _super.prototype.beginEditing.call(this, initialValue);
        };
        /**
         * Editor open.
         */
        Editor.prototype.open = function () {
            // Initialize select2 plugin.
            this.$select.select2(this.options);
            // Open select2.
            this.$select.select2('open');
            // Register events.
            this.registerEvents();
        };
        /**
         * Finish editing.
         * @param restore Restore original.
         * @param ctrlDown Ctrl down key.
         * @param callback Finish callback.
         */
        Editor.prototype.finishEditing = function (restore, ctrlDown, callback) {
            if (restore) {
                this.setValue(this.originalValue);
            }
            _super.prototype.finishEditing.call(this, restore, ctrlDown, callback);
        };
        /**
         * Editor discard.
         *
         * @param validationResult Editor validation result.
         */
        Editor.prototype.discardEditor = function (validationResult) {
            var _this = this;
            // Verify validation results.
            if (validationResult || isNil(validationResult)) {
                // Trigger event to finalize editor.
                this.invokeEventHandler('apply');
                // Refresh cell with new value.
                this.refreshCell();
                // Listen table after all finalized.
                setTimeout(function () {
                    _this.instance.listen();
                });
            }
            // Invoke base discard.
            _super.prototype.discardEditor.call(this, validationResult);
        };
        /**
         * Editor close.
         */
        Editor.prototype.close = function () {
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
        };
        /**
         * Editor get value.
         *
         * @return Cell value.
         */
        Editor.prototype.getValue = function () {
            var _a;
            // Value operated by editor.
            var editorValue = this.value;
            // Handle value from single selection editor.
            if (!this.options.multiple) {
                // Unpack value for single select.
                _a = (editorValue || [])[0], editorValue = _a === void 0 ? null : _a;
            }
            // Revert back to original when values same without type checking.
            // Needed to avoid changes from undefined to null.
            if (isEqual(editorValue, this.originalValue)) {
                editorValue = this.originalValue;
            }
            return Editor.outputValue(editorValue, this.cellProperties);
        };
        /**
         * Editor set value.
         *
         * @param value Cell value.
         */
        Editor.prototype.setValue = function (value) {
            // Compatible input value must be generated from original cell value.
            this.value = compatValue(this.originalValue, this.cellProperties);
        };
        /**
         * Editor save value.
         *
         * @param value Cell value.
         * @param ctrlDown Control down.
         */
        Editor.prototype.saveValue = function (value, ctrlDown) {
            var _a = this.cellProperties, visualRow = _a.visualRow, visualCol = _a.visualCol;
            // Set directly to cell without duckSchema.
            this.instance.setDataAtCell(visualRow, visualCol, this.getValue(), 'edit');
        };
        /**
         * Determine editor activeness.
         *
         * @return Editor active state.
         */
        Editor.prototype.isActive = function () {
            // Check select2 state.
            return this.$select && this.$select.hasClass('select2-hidden-accessible');
        };
        /**
         * Editor refresh value.
         */
        Editor.prototype.refreshValue = function () {
            // New value need to be refreshed in cell.
            var value = this.instance.getDataAtCell(this.cellProperties.visualRow, this.cellProperties.visualCol);
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
        };
        /**
         * Refresh editor.
         */
        Editor.prototype.refreshEditor = function () {
            this.triggerSelect2Event('change.select2');
        };
        /**
         * Refresh query.
         */
        Editor.prototype.refreshQuery = function () {
            this.$select.select2('close');
            this.$select.select2('open');
        };
        /**
         * Refresh cell.
         */
        Editor.prototype.refreshCell = function () {
            var _a = this.cellProperties, visualRow = _a.visualRow, visualCol = _a.visualCol;
            // Retrieve cell renderer.
            var renderer = this.instance.getCellRenderer(visualRow, visualCol);
            // Invoke renderer.
            renderer(this.instance, this.TD, visualRow, visualCol, this.prop, this.value, this.cellProperties);
        };
        /**
         * Trigger select2 event.
         *
         * @param name Event name.
         */
        Editor.prototype.triggerSelect2Event = function (name) {
            if (this.isActive()) {
                this.$select.trigger(name);
            }
        };
        /**
         * Create data adapter.
         *
         * @param options Select2 options.
         * @return DataAdapter wrapper.
         */
        Editor.prototype.createDataAdapter = function (_a) {
            var _this = this;
            var data = _a.data;
            var getValue = function () { return _this.value; };
            // Data adapter covers data option.
            return /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // Retrieve current value.
                class_1.prototype.current = function (callback) {
                    callback(getValue());
                };
                class_1.prototype.query = function (query, callback) {
                    callback({ results: data });
                };
                return class_1;
            }(adapter.DataArray));
        };
        /**
         * Wrap data adapter to give access to cell properties.
         *
         * @param cellProperties Cell properties.
         * @return DataAdapter wrapper.
         */
        Editor.prototype.wrapDataAdapter = function (cellProperties) {
            var _this = this;
            var getValue = function () { return _this.value; };
            // Wrap adapter class.
            return /** @class */ (function (_super) {
                __extends(class_2, _super);
                function class_2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                // Retrieve current value.
                class_2.prototype.current = function (callback) {
                    callback(getValue());
                };
                // Call user specified dataAdapter query.
                class_2.prototype.query = function (query, callback) {
                    _super.prototype.query.call(this, getValue(), cellProperties, query, callback);
                };
                return class_2;
            }(cellProperties.editorOptions.dataAdapter));
        };
        /**
         * Register editor events.
         */
        Editor.prototype.registerEvents = function () {
            var _this = this;
            // Select2 instance.
            var instance = this.$select.data('select2');
            // Catch instance keypress.
            instance.on('keypress', function (event) {
                var _a = Handsontable.helper.KEY_CODES, ESCAPE = _a.ESCAPE, TAB = _a.TAB;
                if (event.which === ESCAPE) {
                    _this.finishEditing(true);
                }
                else if (event.which === TAB) {
                    _this.finishEditing();
                }
            });
            // Register standard events.
            this.$select
                // Handle change in data.
                .on('select2:select', this.selectedHandler.bind(this))
                // Handle change in data.
                .on('select2:unselect', this.unselectedHandler.bind(this))
                // Handle open.
                .on('select2:open', this.invokeEventHandler.bind(this, 'open'))
                // Handle close.
                .on('select2:close', function (event) {
                _this.invokeEventHandler('close', event);
            })
                // Handle opening
                .on('select2:opening', function (event) {
                // TODO-pk: Fix preventing.
                _this.invokeEventHandler('opening', event);
            })
                .on('select2:closing', function (event) {
                // TODO-pk: Fix preventing.
                _this.invokeEventHandler('closing', event);
            })
                // Handle changing in data.
                .on('select2:selecting', function (event) {
                // Data received from event.
                // TODO-pk: Cast will be removed on select2@next release
                var selectingItem = Editor.createEventItem(event.params.args, true);
                // Invoke event that can change value.
                _this.invokeEventHandler('selecting', event, selectingItem);
            })
                // Handle changing in data.
                .on('select2:selecting', function (event) {
                // Data received from event.
                // TODO-pk: Cast will be removed on select2@next release
                var unselectingItem = Editor.createEventItem(event.params.args, false);
                // Invoke event that can change value.
                _this.invokeEventHandler('unselecting', event, unselectingItem);
            });
        };
        /**
         * Handle select event from select2.
         *
         * @param event Event object.
         */
        Editor.prototype.selectedHandler = function (event) {
            // Editor options.
            var multiple = this.options.multiple;
            // Already selected item.
            var selectedItem = Editor.createEventItem(event.params.data, true);
            // Clean up value on single selection.
            if (!multiple) {
                this.value = [];
            }
            // Copy to create new value.
            this.value = this.value.concat([selectedItem]);
            // Invoke event that can change value.
            this.invokeEventHandler('selected', event, selectedItem);
            // After change handler.
            this.afterChangeHandler();
        };
        /**
         * Handle unselect event from select2.
         *
         * @param event Event object.
         */
        Editor.prototype.unselectedHandler = function (event) {
            // Already unselected item.
            var unselectedItem = Editor.createEventItem(event.params.data, true);
            // Remove item from array value.
            this.value = this.value.filter(function (_a) {
                var id = _a.id;
                return !isEqual(id, unselectedItem.id);
            });
            // Invoke event that can change value.
            this.invokeEventHandler('unselected', event, unselectedItem);
            // After change handler.
            this.afterChangeHandler();
        };
        /**
         * After change handler.
         */
        Editor.prototype.afterChangeHandler = function () {
            // Editor options.
            var _a = this.options, closeOnSelect = _a.closeOnSelect, multiple = _a.multiple;
            // Refresh editor after handler invoked.
            this.refreshEditor();
            // On single selection editor can be closed.
            if (closeOnSelect) {
                if (!multiple) {
                    this.finishEditing();
                }
            }
            else if (multiple) {
                this.refreshQuery();
            }
        };
        /**
         * Invoke specified event handler.
         *
         * @param eventType Event type.
         * @param args Handler arguments.
         * @return Event output.
         */
        Editor.prototype.invokeEventHandler = function (eventType) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // Defined editor events.
            var _a = this.cellProperties.editorEvents, editorEvents = _a === void 0 ? {} : _a;
            // Invoke only when handlers exist.
            Object.keys(editorEvents).forEach(function (key) {
                var events = key.split(/\s+/g);
                for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                    var name_1 = events_1[_i];
                    if (name_1 === eventType && typeof editorEvents[key] === 'function') {
                        // Always include current value and cell properties
                        args.push(_this.value, _this.cellProperties);
                        // Invoke handler with specified arguments
                        editorEvents[key].apply(null, args);
                    }
                }
            });
        };
        return Editor;
    }(Handsontable.editors.BaseEditor));

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
    function renderer(instance, TD, row, col, prop, value, cellProperties) {
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

    // Register editor.
    // TODO: Cast will be removed on HT@next release
    Handsontable.editors.registerEditor('Select2Editor', Editor);
    // Register renderer.
    // TODO: Cast will be removed on HT@next release
    Handsontable.renderers.registerRenderer('Select2Renderer', renderer);
    // Register cell.
    // TODO: Cast will be removed on HT@next release
    Handsontable.cellTypes.registerCellType('select2', {
        editor: Editor,
        renderer: renderer
    });

    /**
     * Determine belonging of editor to <#Editor> type.
     *
     * @param editor Class to be checked.
     * @return True when editor extends Editor; false otherwise.
     */
    function isExtends(editor) {
        if (editor === void 0) { editor = {}; }
        // Editor prototype.
        var _a = editor.prototype, prototype = _a === void 0 ? null : _a;
        // End of prototype chain.
        if (!prototype) {
            return false;
        }
        // Compare constructors or/and prototype instance.
        return prototype.constructor === Editor || prototype instanceof Editor || isExtends(Object.getPrototypeOf(prototype));
    }
    /**
     * Before change handler to correctly clean up cell.
     *
     * @param changes HT changes.
     * @param source Change source.
     */
    function beforeChange(changes, source) {
        var _this = this;
        // Iterate changes to analyze cell metadata.
        changes.forEach(function (change) {
            // Retrieve editor class.
            var editor = _this.getCellEditor(change[0], _this.propToCol(change[1]));
            // New value to be set at cell.
            var newVal = change[3];
            // Verify editor to determine that it's suitable to change value to null.
            if (newVal === '' && (isEqual(editor, Editor) || isExtends(editor))) {
                // Replace change new value to null.
                change[3] = null;
            }
        });
    }
    // Register global hook to correctly handle cell clean up.
    Handsontable.hooks.add('beforeChange', beforeChange);

    exports.Editor = Editor;
    exports.Adapter = adapter;
    exports.renderer = renderer;
    exports.compatValue = compatValue;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ht-select2.js.map
