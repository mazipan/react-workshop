import loadable from "@loadable/component";

const Lazy = loadable( () => import(/* webpackChunkName: "product-list" */ './index'));

export default Lazy;
