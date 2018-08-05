import { IdTextPair } from 'select2';

/**
 * Expected input and output of the editor:
 *
 *   □ IdTextPair - Single selection editor.
 *   □ IdTextPair[] - Multiple selection editor.
 *   □ undefined - Undefined input, revert to original.
 *   □ null - Null input, revert to original, removed single selection.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export type EditorValue = IdTextPair | IdTextPair[] | undefined | null;
