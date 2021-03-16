import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';

const IxSourceProps = Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    imgixParams: Object,
    attributeConfig: Object,
  },
});

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

@Component
export class IxSource extends IxSourceProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render(createElement: CreateElement) {
    const imgixParamsFromAttributes = {};

    const { srcset } = this.vueImgixSingleton.buildUrlObject(this.src, {
      ...imgixParamsFromAttributes,
      ...this.imgixParams,
    });

    const attributeConfig = {
      ...defaultAttributeMap,
      ...this.attributeConfig,
    };

    const childAttrs = {
      [attributeConfig.srcset]: srcset,
    };

    return createElement('source', { attrs: childAttrs });
  }
}
