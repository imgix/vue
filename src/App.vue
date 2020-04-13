<template>
  <div id="app">
    Hello, world.

    <h2>Advanced Usage</h2>
    <img
      src="advancedSrcObject.src"
      srcset="advancedSrcObject.srcset"
      sizes="50vw"
    />
  </div>
</template>

<script>
import { buildUrlObject } from '@/plugins/vue-imgix';

export default {
  name: 'App',

  computed: {
    advancedSrcObject: buildUrlObject(
      'https://assets.imgix.net/examples/pione.jpg',
    ),
  },
};
</script>
