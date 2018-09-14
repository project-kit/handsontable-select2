import { amdRequire } from './require';

/**
 * Selection Adapter.
 */
export class Selection {
  public static get Single(): any {
    return amdRequire('selection/single');
  }

  public static get Multiple(): any {
    return amdRequire('selection/multiple');
  }

  public static get Placeholder(): any {
    return amdRequire('selection/placeholder');
  }

  public static get AllowClear(): any {
    return amdRequire('selection/allowClear');
  }

  public static get Search(): any {
    return amdRequire('selection/search');
  }

  public static get EventRelay(): any {
    return amdRequire('selection/eventRelay');
  }
}
