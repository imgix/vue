<template>
  <img
    :src="advancedSrc"
    :srcset="advancedSrcSet"
    data-testid="advanced-build-src-set"
  />
</template>

<script>
import { buildUrl, buildSrcSet } from '@/plugins/imgix-vue';

// NB: Make sure initVueImgix has been called before this code runs
export default {
  name: 'advanced-build-srcset',

  computed: {
    advancedSrc: () =>
      buildUrl('examples/pione.jpg', {
        auto: 'format',
      }),
    advancedSrcSet: () =>
      buildSrcSet('examples/pione.jpg', {
        auto: 'format',
      }),
  },
};
</script>
