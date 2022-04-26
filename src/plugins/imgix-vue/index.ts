import { app } from '@/main';
import { initVueImgix, IxImg } from './imgix-vue';
import { IxPicture } from './ix-picture';
import { IxSource } from './ix-source';
import { IVueUseImgixOptions } from './types';

// Declare install function executed by Vue.use()
export function install(_app: typeof app, options: IVueUseImgixOptions) {
  if (install.installed) return;
  install.installed = true;
  initVueImgix(options);
  _app.component('ix-img', IxImg);
  _app.component('ix-picture', IxPicture);
  _app.component('ix-source', IxSource);
}
install.installed = false;

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
export * from './imgix-vue';
