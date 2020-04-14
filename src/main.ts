import { initVueImgix } from '@/plugins/vue-imgix';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

initVueImgix({
  domain: 'assets.imgix.net',
});

new Vue({
  render: h => h(App),
}).$mount('#app');
