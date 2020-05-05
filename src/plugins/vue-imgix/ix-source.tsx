import {
  ensureVueImgixClientSingleton,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';
import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';

const IxSourceProps = Vue.extend({
  props: {},
});

@Component
export class IxSource extends IxSourceProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render(createElement: CreateElement) {
    return createElement('source', {
      attrs: {},
    });
  }
}
