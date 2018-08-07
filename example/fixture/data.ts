import { IdTextPair } from 'select2';
import { hobby } from './hobby';
import { progLang } from './progLang';
import { langLevel } from './langLevel';
import { filterById, findById } from './helper';

/**
 * Data format.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export interface Data {
  name: string;
  hobby?: IdTextPair[];
  langLvl?: IdTextPair;
  progLang?: number[];
  metadata: {
    progLang?: IdTextPair[];
  };
}

/**
 * Demo data.
 *
 * @example
 *
 *  {
 *    name: 'Alex Dakal',
 *    hobby: [
 *      {
 *         id: '7',
 *         text: 'Poker'
 *      },
 *      {
 *         id: '8',
 *         text: 'Paintball'
 *      }
 *    ],
 *    langLvl: {
 *      id: 'C1',
 *      text: 'Advanced level of English'
 *    },
 *    progLang: [1, 2, 8],
 *    metadata: {
 *      progLang: [
 *        {
 *          id: 1,
 *          text: 'JS'
 *        },
 *        {
 *          id: 2,
 *          text: 'Python'
 *        },
 *        {
 *          id: 8,
 *          text: 'Kotlin'
 *        }
 *      ]
 *    }
 *  }
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export const data: Data[] = [
  {
    name: 'Ted Right',
    progLang: [1],
    hobby: filterById(hobby, ['3']),
    langLvl: findById(langLevel, 'B1'),
    metadata: {
      progLang: filterById(progLang, [1])
    }
  },
  {
    name: 'Frank Honest',
    progLang: [2, 3],
    hobby: filterById(hobby, ['4', '7']),
    metadata: {
      progLang: filterById(progLang, [2, 3])
    }
  },
  {
    name: 'Joan Well',
    progLang: [4, 1],
    langLvl: findById(langLevel, 'B2'),
    metadata: {
      progLang: filterById(progLang, [4, 1])
    }
  },
  {
    name: 'Gail Polite',
    hobby: filterById(hobby, ['1']),
    langLvl: findById(langLevel, 'A2'),
    metadata: {}
  },
  {
    name: 'Matt Cool',
    progLang: [5, 7],
    langLvl: findById(langLevel, 'C1'),
    metadata: {
      progLang: filterById(progLang, [5, 7])
    }
  },
  {
    name: 'Yuri Kitana',
    hobby: filterById(hobby, ['3']),
    langLvl: findById(langLevel, 'B1'),
    metadata: {}
  }
];
