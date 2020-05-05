import {
  ensureVueImgixClientSingleton,
  IVueImgixClient,
} from '@/plugins/vue-imgix/vue-imgix';
import Vue from 'vue';
import Component from 'vue-class-component';

const IxPictureProps = Vue.extend({
  props: {},
});

@Component
export class IxPicture extends IxPictureProps {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render() {
    return <picture>{this.$slots.default}</picture>;
  }
}
