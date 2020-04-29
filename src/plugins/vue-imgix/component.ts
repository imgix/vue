import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';

const IxImgProps = Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    imgixParams: Object,
    width: [String, Number],
    height: [String, Number],
  },
});

@Component
export class IxImg extends IxImgProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render(createElement: CreateElement) {
    const imgixParamsFromImgAttributes = {
      ...(this.width != null ? { w: this.width } : {}),
      ...(this.height != null ? { h: this.height } : {}),
    };

    const { src, srcset } = this.vueImgixSingleton.buildUrlObject(this.src, {
      ...imgixParamsFromImgAttributes,
      ...this.imgixParams,
    });

    return createElement('img', {
      attrs: {
        src,
        srcset,
        width: this.width,
        height: this.height,
      },
    });
  }
}
