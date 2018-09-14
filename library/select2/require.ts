/**
 * Require select2 definitions by path.
 *
 * @param path Require path.
 */
export function amdRequire(path: string): any {
  return jQuery.fn.select2.amd.require(`select2/${path}`);
}
