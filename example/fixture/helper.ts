import { IdTextPair } from 'select2';

/**
 * Convert tuple to IdTextPair.
 *
 * @param tuple Tuple to convert.
 * @return Created IdText pairs.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function createIdText(tuple: [any, string][]): IdTextPair[] {
  return tuple.map(([id, text]: [any, string]) => ({ id, text }));
}

/**
 * Find IdText pair by id.
 *
 * @param pairs Pairs used as source.
 * @param queryId Id to find IdTextPair.
 * @return Found IdText; undefined when not found.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function findById(pairs: IdTextPair[], queryId: any): IdTextPair | undefined {
  // Simple way to find it.
  return pairs.filter(({ id }: IdTextPair) => queryId === id)[0];
}

/**
 * Filter IdText pair by id.
 *
 * @param pairs Pairs used as source.
 * @param queryIds Ids to filter IdTextPair.
 * @return Filtered IdText pairs; empty list when not found.
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
export function filterById(pairs: IdTextPair[], queryIds: any[]): IdTextPair[] {
  return pairs.filter(({ id }: IdTextPair) => queryIds.indexOf(id) >= 0);
}
