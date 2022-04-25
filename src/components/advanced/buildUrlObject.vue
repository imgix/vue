<template>
  <img
    :src="advancedSrcObject.src"
    :srcset="advancedSrcObject.srcset"
    sizes="50vw"
    data-testid="advanced-basic-image"
  />
</template>

<script>
import { buildUrlObject } from '@/plugins/imgix-vue';

// NB: Make sure initVueImgix has been called before this code runs
export default {
  name: 'advanced-build-url-object',

  computed: {
    advancedSrcObject: () =>
      buildUrlObject('examples/pione.jpg', {
        auto: 'format',
      }),
  },
};
</script>
