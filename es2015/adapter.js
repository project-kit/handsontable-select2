import jQuery from 'jquery';
/**
 * Default adapters used by select2.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
const adapter = {
    get DataBase() {
        return jQuery.fn.select2.amd.require('select2/data/base');
    },
    get DataArray() {
        return jQuery.fn.select2.amd.require('select2/data/array');
    },
    get DataAjax() {
        return jQuery.fn.select2.amd.require('select2/data/ajax');
    },
    get DataTags() {
        return jQuery.fn.select2.amd.require('select2/data/tags');
    }
};
export { adapter as Adapter };
//# sourceMappingURL=adapter.js.map