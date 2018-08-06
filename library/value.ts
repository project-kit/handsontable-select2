import { IdTextPair } from 'select2';

/**
 * Item operated by editor events and contains full metadata.
 *
 * @example
 *
 *  {
 *    id: "ts",
 *    text: "TypeScript",
 *    selected: true,
 *    disabled: false
 *  }
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type EditorItem = IdTextPair & {
  selected: boolean;
  disabled?: boolean;
};

/**
 * Item consist of id / text and used in editor value.
 *
 * @example
 *
 *  {
 *    id: "js",
 *    text: "JavaScript"
 *  }
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export interface EditorIdText {
  id: string;
  text: string;
}

/**
 * Expected input and output of the editor:
 *
 *   □ EditorIdText - Single selection editor.
 *   □ EditorIdText[] - Multiple selection editor.
 *   □ undefined - Undefined input or output.
 *   □ null - Null input or removed single selection.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type EditorValue = EditorIdText | EditorIdText[] | undefined | null;
