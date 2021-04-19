import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import { defineComponent, h } from 'vue';

const IxPictureProps = defineComponent({});

export class IxPicture extends IxPictureProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render() {
    return h('picture', {slots: this.$slots.defaults});
  }
}
