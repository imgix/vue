import { ensureVueImgixClientSingleton } from './vue-imgix';
import { h, defineComponent } from 'vue';

const IxImgProps = {
  src: {
    type: String,
    required: true,
  },
  fixed: Boolean,
  imgixParams: Object,
  width: [String, Number],
  height: [String, Number],
  attributeConfig: Object,
  disableVariableQuality: Boolean,
  sizes: [String],
  // TODO(luis): remove dataTestId props in favor of a better solution
  dataTestId: {
    type: String,
    required: false,
  }
};

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

export const IxImg = defineComponent({
  props: IxImgProps,

  setup(props) {
    const vueImgixSingleton = ensureVueImgixClientSingleton();
    const imgixParamsFromImgAttributes = {
      ...(props.fixed && {
        ...(props.width != null ? { w: props.width } : {}),
        ...(props.height != null ? { h: props.height } : {}),
      }),
    };

    const { src, srcset } = vueImgixSingleton.buildUrlObject(
      props.src as string,
      {
        ...imgixParamsFromImgAttributes,
        ...props.imgixParams,
      },
      {
        disableVariableQuality: Boolean(props.disableVariableQuality),
      },
    );

    const attributeConfig = {
      ...defaultAttributeMap,
      ...props.attributeConfig,
    };

    return () =>
      h('img', {
          [attributeConfig.src]: src,
          [attributeConfig.srcset]: srcset,
          width: props.width,
          height: props.height,
          sizes: props.sizes,
          // TODO(luis): remove dataTestId props in favor of a better solution
          ['data-testid']: props.dataTestId || undefined,
      });
  },
});
