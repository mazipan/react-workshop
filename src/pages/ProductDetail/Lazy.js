import loadable from "@loadable/component";

const Lazy = loadable( () => import(/* webpackChunkName: "product-detail" */ './index'));

export default Lazy;
