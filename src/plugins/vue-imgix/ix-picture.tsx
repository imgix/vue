import { ensureVueImgixClientSingleton, IVueImgixClient } from './vue-imgix';
import { h } from 'vue';
import { Vue } from 'vue-class-component';

export class IxPicture extends Vue {
  // Using !: here because we ensure it is set in created()
  private vueImgixSingleton!: IVueImgixClient;

  created() {
    this.vueImgixSingleton = ensureVueImgixClientSingleton();
  }

  render() {
    return h('picture', {slots: this.$slots.defaults});
  }
}
