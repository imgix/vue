<template>
  <img
    :src="advancedSrc"
    :srcset="advancedSrcSet"
    data-testid="static-build-src-set"
  />
</template>

<script>
import { buildUrl, buildSrcSet } from '@/plugins/vue-imgix';

// NB: Make sure initVueImgix has been called before this code runs
export default {
  name: 'static-build-src-set',

  computed: {
    advancedSrc: () =>
      buildUrl('https://sdk-test.imgix.net/amsterdam.jpg', {
        auto: 'format',
      }),
    advancedSrcSet: () =>
      buildSrcSet('https://sdk-test.imgix.net/amsterdam.jpg', {
        auto: 'format',
      }),
  },
};
</script>
