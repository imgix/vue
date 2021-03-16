import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';

const IxPictureProps = Vue.extend({
  props: {},
});

@Component
export class IxPicture extends IxPictureProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render(createElement: CreateElement) {
    return createElement('picture', this.$slots.default);
  }
}
