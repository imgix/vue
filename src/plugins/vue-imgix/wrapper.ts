// THIS FILE IS A WIP
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// Import vue component
// import  from './my-component.vue';

// Declare install function executed by Vue.use()
export function install(Vue: Vue) {
  if (install.installed) return;
  install.installed = true;
  // Vue.component('MyComponent', component);
}
install.installed = false;

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
  // @ts-ignore
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
// export default component;
export * from './index';
