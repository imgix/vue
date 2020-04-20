import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';

const ImgixProps = Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    imgixParams: Object,
  },
});

@Component
export class Imgix extends ImgixProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render(createElement: CreateElement) {
    const { src, srcset } = this.vueImgixSingleton.buildUrlObject(
      this.src,
      this.imgixParams,
    );

    return createElement('img', {
      attrs: {
        src,
        srcset,
      },
    });
  }
}
