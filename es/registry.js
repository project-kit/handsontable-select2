import Handsontable from 'handsontable';
import { Editor } from './editor';
import { renderer } from './renderer';
// Register editor.
Handsontable.editors.registerEditor('Select2Editor', Editor);
// Register renderer.
Handsontable.renderers.registerRenderer('Select2Renderer', renderer);
// Register cell.
Handsontable.cellTypes.registerCellType('select2', {
    editor: Editor,
    renderer: renderer
});
//# sourceMappingURL=registry.js.map