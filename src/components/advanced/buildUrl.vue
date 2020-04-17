<template>
  <img :src="advancedUrl" data-testid="advanced-build-url" />
</template>

<script>
import { buildUrl } from '@/plugins/vue-imgix';

// NB: Make sure initVueImgix has been called before this code runs
export default {
  name: 'advanced-build-url',

  computed: {
    advancedUrl: () =>
      buildUrl('examples/pione.jpg', {
        auto: 'format',
        w: 400,
      }),
  },
};
</script>
