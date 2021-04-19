import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import {defineComponent, h } from 'vue';

const IxSourceProps = defineComponent({
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

export class IxSource extends IxSourceProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render() {
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

    return h('source', { attrs: childAttrs });
  }
}
