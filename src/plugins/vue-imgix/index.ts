// THIS FILE IS A WIP
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import _Vue from 'vue';
import { IVueUseImgixOptions } from './types';
import { initVueImgix, IxImage } from './vue-imgix';

// Declare install function executed by Vue.use()
export function install(Vue: typeof _Vue, options: IVueUseImgixOptions) {
  if (install.installed) return;
  install.installed = true;
  initVueImgix(options);
  Vue.component('IxImage', IxImage);
}
install.installed = false;

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
// let GlobalVue = null;
// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue;
//   // @ts-ignore
// } else if (typeof global !== 'undefined') {
//   // @ts-ignore
//   GlobalVue = global.Vue;
// }
// if (GlobalVue) {
//   GlobalVue.use(plugin);
// }

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
export * from './vue-imgix';
