import jQuery from 'jquery';

/**
 * Require select2 definitions by path.
 *
 * @param path Require path.
 */
function getByPath(path: string): any {
  return jQuery.fn.select2.amd.require(`select2/${path}`);
}

/**
 * Adapters used by select2.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
const adapter: any = {
  getByPath,
  get DataBase(): any {
    return getByPath('data/base');
  },
  get DataSelect(): any {
    return getByPath('data/select');
  },
  get DataArray(): any {
    return getByPath('data/array');
  },
  get DataAjax(): any {
    return getByPath('data/ajax');
  },
  get DataTags(): any {
    return getByPath('data/tags');
  }
};

export { adapter as Adapter };
