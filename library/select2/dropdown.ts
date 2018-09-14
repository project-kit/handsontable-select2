import { amdRequire } from './require';

/**
 * Dropdown Adapter.
 */
export class Dropdown {
  public static get Base(): any {
    return amdRequire('dropdown');
  }

  public static get Search(): any {
    return amdRequire('dropdown/search');
  }

  public static get HidePlaceholder(): any {
    return amdRequire('dropdown/hidePlaceholder');
  }

  public static get InfiniteScroll(): any {
    return amdRequire('dropdown/infiniteScroll');
  }

  public static get AttachBody(): any {
    return amdRequire('dropdown/attachBody');
  }

  public static get MinimumResultsForSearch(): any {
    return amdRequire('dropdown/minimumResultsForSearch');
  }

  public static get SelectOnClose(): any {
    return amdRequire('dropdown/selectOnClose');
  }

  public static get CloseOnSelect(): any {
    return amdRequire('dropdown/closeOnSelect');
  }
}
