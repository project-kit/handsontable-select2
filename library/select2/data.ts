import { amdRequire } from './require';

/**
 * Data Adapter.
 */
export class Data {
  public static get Base(): any {
    return amdRequire('data/base');
  }

  public static get Select(): any {
    return amdRequire('data/select');
  }

  public static get Array(): any {
    return amdRequire('data/array');
  }

  public static get Ajax(): any {
    return amdRequire('data/ajax');
  }

  public static get Tags(): any {
    return amdRequire('data/tags');
  }

  public static get Tokenizer(): any {
    return amdRequire('data/tokenizer');
  }

  public static get MinimumInputLength(): any {
    return amdRequire('data/minimumInputLength');
  }

  public static get MaximumInputLength(): any {
    return amdRequire('data/maximumInputLength');
  }

  public static get MaximumSelectionLength(): any {
    return amdRequire('data/maximumSelectionLength');
  }
}
