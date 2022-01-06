import { defineComponent, h } from 'vue';
import { ensureVueImgixClientSingleton } from './vue-imgix';

const IxPictureProps = defineComponent({
  props: {},
});

export const IxPicture = defineComponent({
  mixins: [IxPictureProps],
  setup(_, { slots }) {
    ensureVueImgixClientSingleton();
    const defaultSlots = slots && slots.default && slots.default();
    return () => {
      return h('picture', defaultSlots);
    };
  },
});
