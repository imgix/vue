<template>
  <img
    :src="advancedUrl"
    :srcset="advancedSrcSet"
    data-testid="advanced-build-src-set"
    alt="advanced-build-srcset-fruit-image"
  />
</template>

<script>
import { buildUrl, buildSrcSet } from '@/plugins/vue-imgix';

// NB: Make sure initVueImgix has been called before this code runs
export default {
  name: 'advanced-build-srcset',

  computed: {
    advancedUrl: () =>
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
