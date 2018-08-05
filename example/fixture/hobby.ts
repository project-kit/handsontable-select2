import { IdTextPair } from 'select2';
import { createIdText } from './helper';

/**
 * Indoor and outdoor hobbies.
 *
 * @example
 *
 *   [
 *     {
 *       id: '7',
 *       text: 'Poker'
 *     },
 *     {
 *       id: '8',
 *       text: 'Paintball'
 *     }
 *   ]
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export const hobby: IdTextPair[] = createIdText([
  ['1', '3D printing'],
  ['2', 'Acrobatics'],
  ['3', 'Puzzles'],
  ['4', 'Graffiti'],
  ['5', 'Surfing'],
  ['6', 'Judo'],
  ['7', 'Poker'],
  ['8', 'Paintball']
]);
