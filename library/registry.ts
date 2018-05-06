import Handsontable from 'handsontable';
import { Editor } from './editor';
import { renderer } from './renderer';

// Register editor.
// TODO: Cast will be removed on HT@next release
(<any>Handsontable.editors).registerEditor('Select2Editor', Editor);

// Register renderer.
// TODO: Cast will be removed on HT@next release
(<any>Handsontable.renderers).registerRenderer('Select2Renderer', renderer);

// Register cell.
// TODO: Cast will be removed on HT@next release
(<any>Handsontable.cellTypes).registerCellType('select2', {
  editor: Editor,
  renderer: renderer
});
