import { defineComponent, h } from 'vue';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';

const IxImgProps = defineComponent({
  props: {
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
  },
});

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

export class IxImg extends IxImgProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render() {
    const imgixParamsFromImgAttributes = {
      ...(this.fixed && {
        ...(this.width != null ? { w: this.width } : {}),
        ...(this.height != null ? { h: this.height } : {}),
      }),
    };

    const { src, srcset } = this.vueImgixSingleton.buildUrlObject(
      this.src,
      {
        ...imgixParamsFromImgAttributes,
        ...this.imgixParams,
      },
      {
        disableVariableQuality: Boolean(this.disableVariableQuality),
      },
    );

    const attributeConfig = {
      ...defaultAttributeMap,
      ...this.attributeConfig,
    };

    return h('img', {
      [attributeConfig.src]: src,
      [attributeConfig.srcset]: srcset,
      width: this.width,
      height: this.height,
    });
  }

};
