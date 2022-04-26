import { defineComponent, h } from 'vue';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './imgix-vue';

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

export const IxSource = defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    imgixParams: Object,
    attributeConfig: Object,
  },
  setup(props) {
    const vueImgixSingleton: IVueImgixClient = ensureVueImgixClientSingleton();

    const imgixParamsFromAttributes = {};

    const { srcset } = vueImgixSingleton.buildUrlObject(props.src, {
      ...imgixParamsFromAttributes,
      ...props.imgixParams,
    });

    const attributeConfig = {
      ...defaultAttributeMap,
      ...props.attributeConfig,
    };

    const childAttrs = {
      [attributeConfig.srcset]: srcset,
    };

    return () => h('source', childAttrs);
  },
});
