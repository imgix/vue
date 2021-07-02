import VueImgix from '@/plugins/vue-imgix';
import { createApp } from 'vue';
import App from './App.vue';

export const app = createApp(App);

app
  .use(VueImgix, {
    domain: 'assets.imgix.net',
    defaultIxParams: {
      auto: 'format',
    },
  })
  .mount('#app');
