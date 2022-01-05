import { defineComponent, h } from 'vue';
import { ensureVueImgixClientSingleton } from './vue-imgix';

const IxPictureProps = defineComponent({
  props: {},
});

export const IxPicture = defineComponent({
  mixins: [IxPictureProps],
  render() {
    ensureVueImgixClientSingleton();
    const slots = this.$slots.default ? this.$slots.default : [];
    return h('picture', slots);
  },
});
