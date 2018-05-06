import { IdTextPair } from 'select2';
import { createIdText } from './helper';

/**
 * Programming languages.
 *
 * @example
 *
 *   [
 *     {
 *       id: 0,
 *       text: 'JS'
 *     },
 *     {
 *       id: 1,
 *       text: 'Python'
 *     }
 *   ]
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export const progLang: IdTextPair[] = createIdText([
  [0, 'JS'],
  [1, 'Python'],
  [2, 'Ruby'],
  [3, 'Java'],
  [4, 'C++'],
  [5, 'PHP'],
  [6, 'Go'],
  [7, 'Pascal'],
  [8, 'Kotlin']
]);
