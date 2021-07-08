import { ensureVueImgixClientSingleton } from './vue-imgix';
import { defineComponent, h } from 'vue';

const IxPictureProps = defineComponent({
  props: {},
});

export const IxPicture = defineComponent({
  mixins: [IxPictureProps],
  render() {
    ensureVueImgixClientSingleton();

    return h('picture', this.$slots.default);
  },
});
