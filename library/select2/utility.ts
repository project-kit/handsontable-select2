import { amdRequire } from './require';

/**
 * Utils.
 */
export class Utils {
  public static get Decorate(): any {
    return amdRequire('utils').Decorate;
  }

  public static get Extend(): any {
    return amdRequire('utils').Extend;
  }

  public static get Observable(): any {
    return amdRequire('utils').Observable;
  }
}
