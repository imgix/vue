import _Vue from 'vue';
import { IxPicture } from './ix-picture';
import { IxSource } from './ix-source';
import { IVueUseImgixOptions } from './types';
import { initVueImgix, IxImg } from './vue-imgix';

// Declare install function executed by Vue.use()
export function install(Vue: typeof _Vue, options: IVueUseImgixOptions) {
  if (install.installed) return;
  install.installed = true;
  initVueImgix(options);
  Vue.component('ix-img', IxImg);
  Vue.component('ix-picture', IxPicture);
  Vue.component('ix-source', IxSource);
}
install.installed = false;

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
export * from './vue-imgix';
