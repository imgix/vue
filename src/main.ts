import VueImgix from '@/plugins/vue-imgix';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueImgix, {
  domain: 'assets.imgix.net',
  defaultIxParams: {
    auto: 'format',
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
