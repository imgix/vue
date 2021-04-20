import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import { h } from 'vue';
import { Vue, prop } from 'vue-class-component';

class Props {
  src = prop({
    type: String,
    required: true,
  });
  imgixParams = prop({ type: Object });
  attributeConfig = prop({ type: Object });
}

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

export class IxSource extends Vue.with(Props) {
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
