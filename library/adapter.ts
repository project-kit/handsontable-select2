import jQuery from 'jquery';

/**
 * Default adapters used by select2.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
const adapter: any = {
  get DataBase(): any {
    return jQuery.fn.select2.amd.require('select2/data/base');
  },
  get DataArray(): any {
    return jQuery.fn.select2.amd.require('select2/data/array');
  },
  get DataAjax(): any {
    return jQuery.fn.select2.amd.require('select2/data/ajax');
  },
  get DataTags(): any {
    return jQuery.fn.select2.amd.require('select2/data/tags');
  }
};

export { adapter as Adapter };
