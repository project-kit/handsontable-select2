import { amdRequire } from './require';

/**
 * Results Adapter.
 */
export class Results {
  public static get Base(): any {
    return amdRequire('results');
  }
}
