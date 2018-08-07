import jQuery from 'jquery';
/**
 * Require select2 definitions by path.
 *
 * @param path Require path.
 */
function getByPath(path) {
    return jQuery.fn.select2.amd.require(`select2/${path}`);
}
/**
 * Adapters used by select2.
 *
 * @author Oleksandr Dakal <oleksandr-dakal@project-kit.org>
 */
const adapter = {
    getByPath,
    get DataBase() {
        return getByPath('data/base');
    },
    get DataSelect() {
        return getByPath('data/select');
    },
    get DataArray() {
        return getByPath('data/array');
    },
    get DataAjax() {
        return getByPath('data/ajax');
    },
    get DataTags() {
        return getByPath('data/tags');
    }
};
export { adapter as Adapter };
//# sourceMappingURL=adapter.js.map