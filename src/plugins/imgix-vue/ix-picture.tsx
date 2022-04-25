import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './imgix-vue';

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
