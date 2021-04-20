import { h } from 'vue';
import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import { prop, Vue } from 'vue-class-component';

const defaultAttributeMap = {
  src: 'src',
  srcset: 'srcset',
};

class Props{
  src = prop({
    type: String,
    required: true,
  });
  fixed = prop({type: Boolean});
  imgixParams = prop({type: Object});
  width = {type: [String, Number]};
  height = {type: [String, Number]};
  attributeConfig = prop({type: Object});
  disableVariableQuality = prop({type: Boolean});
};
export class IxImg extends Vue.with(Props) {
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
}
