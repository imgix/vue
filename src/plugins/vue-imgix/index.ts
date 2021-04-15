import _App from './App.vue';
import { IxPicture } from './ix-picture';
import { IxSource } from './ix-source';
import { IVueUseImgixOptions } from './types';
import { initVueImgix, IxImg } from './vue-imgix';

// Declare install function executed by Vue.use()
export function install(App: typeof _App, options: IVueUseImgixOptions) {
  if (install.installed) return;
  install.installed = true;
  initVueImgix(options);
  App.use('ix-img', IxImg);
  App.use('ix-picture', IxPicture);
  App.use('ix-source', IxSource);
}
install.installed = false;

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
export * from './vue-imgix';
