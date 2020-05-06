import {
  ensureVueImgixClientSingleton,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';
import Vue from 'vue';
import Component from 'vue-class-component';

const IxSourceProps = Vue.extend({
  props: {
    src: {
      type: String,
      required: true,
    },
    width: [String, Number],
    height: [String, Number],
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

  render() {
    const imgixParamsFromImgAttributes = {
      ...(this.width != null ? { w: this.width } : {}),
      ...(this.height != null ? { h: this.height } : {}),
    };

    const { src, srcset } = this.vueImgixSingleton.buildUrlObject(this.src, {
      ...imgixParamsFromImgAttributes,
      ...this.imgixParams,
    });

    const attributeConfig = {
      ...defaultAttributeMap,
      ...this.attributeConfig,
    };

    const childAttrs = {
      [attributeConfig.srcset]: srcset,
      abc: 123,
    };

    return <source attrs={childAttrs} />;
  }
}
