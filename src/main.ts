import VueImgix from '@/plugins/vue-imgix';
import Vue from 'vue';
import App from './App.vue';

const app = Vue.createApp(App);

app.use(
  VueImgix, {
  domain: 'assets.imgix.net',
  defaultIxParams: {
    auto: 'format',
  },
}).mount('#app');
