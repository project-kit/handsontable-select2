
// Dependencies.
import jQuery from 'jquery';
import Handsontable from 'handsontable';
import select2, { IdTextPair, QueryOptions } from 'select2';

// CSS styles.
import 'select2/dist/css/select2.css';
import 'handsontable/dist/handsontable.css';

// @ts-ignore
// CommonJS format require JQuery manual inject.
select2(null, jQuery);

// Library import.
import '../library/css/style.css';
import { isNil } from '../library/helper';
import { EditorCell, Adapter } from '../library';

// Dummy data.
import { data } from './fixture/data';
import { hobby } from './fixture/hobby';
import { progLang } from './fixture/progLang';
import { langLevel } from './fixture/langLevel';

/**
 * Demo adapter.
 */
abstract class DemoAdapter extends Adapter.DataArray {
  // Options to be shown in editor.
  public abstract options: IdTextPair[];

  // Query.
  public query(value: IdTextPair[], cellProperties: EditorCell, query: QueryOptions, callback: Function): void {
    callback({ results: this.filterByQuery(query, this.options) });
  }

  // Filter query by term.
  public filterByQuery({ term = '' }: QueryOptions, results: IdTextPair[]): IdTextPair[] {
    return results.filter(({ text }: IdTextPair) => text.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  }
}

// HT Root.
const ROOT: HTMLElement = <HTMLElement>document.getElementById('container');

// Demo HT.
export const ht: any = new Handsontable(ROOT, {
  data,
  stretchH: 'all',
  colHeaders: true,
  rowHeaders: true,
  manualColumnMove: true,
  manualRowMove: true,
  columns: [
    {
      data: 'name'
    },
    {
      data: 'hobby',
      type: 'select2',
      editorOptions: {
        data: hobby,
        multiple: true,
        closeOnSelect: false
      }
    },
    {
      data: 'langLvl',
      type: 'select2',
      editorOptions: {
        allowClear: true,
        closeOnSelect: true,
        dataAdapter: class extends DemoAdapter {
          public options: IdTextPair[] = langLevel;
        }
      }
    },
    {
      data: 'progLang',
      type: 'select2',
      editorInput({ row, prop }: EditorCell): IdTextPair[] {
        // Get options from other object.
        return (data[row].metadata && data[row].metadata[prop]) || [];
      },
      editorOutput(value: IdTextPair[] | null): string[] | null {
        const val: IdTextPair[] | null = value;

        if (!isNil(val)) {
          // Map to have only id.
          return val.map(({ id }: IdTextPair) => id);
        }

        return val;
      },
      editorOptions: {
        multiple: true,
        dataAdapter: class extends DemoAdapter {
          public options: IdTextPair[] = progLang;
        }
      },
      editorEvents: {
        apply(value: IdTextPair[] | null, { row, prop }: EditorCell): void {
          if (!data[row].metadata) {
            data[row].metadata = {};
          }

          data[row].metadata[prop] = value;
        }
      }
    }
  ]
});
