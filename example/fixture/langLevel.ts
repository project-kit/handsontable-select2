import { IdTextPair } from 'select2';
import { createIdText } from './helper';

/**
 * Language levels.
 *
 * @example
 *
 *   [
 *     {
 *       id: 'C1',
 *       text: 'Advanced level of English'
 *     },
 *     {
 *       id: 'C2',
 *       text: 'Proficient in English'
 *     }
 *   ]
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export const langLevel: IdTextPair[] = createIdText([
  ['A2', 'Elementary level of English'],
  ['B1', 'Low intermediate level of English'],
  ['B2', 'High intermediate level of English'],
  ['C1', 'Advanced level of English'],
  ['C2', 'Proficient in English']
]);
