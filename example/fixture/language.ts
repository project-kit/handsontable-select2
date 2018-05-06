import { IdTextPair } from 'select2';
import { createIdText } from './helper';

/**
 * Languages.
 *
 * @example
 *
 *   [
 *     {
 *       id: 'U',
 *       text: 'Ukrainian'
 *     },
 *     {
 *       id: 'E',
 *       text: 'English'
 *     }
 *   ]
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export const language: IdTextPair[] = createIdText([
  ['F', 'French'],
  ['U', 'Ukrainian'],
  ['S', 'Spanish'],
  ['E', 'English'],
  ['D', 'Dutch']
]);
