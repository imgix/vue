<template>
  <div>
    <h2>Simple</h2>
    <div style="width: 400px;">
      <Imgix
        src="examples/pione.jpg"
        sizes="100vw"
        data-testid="simple-fluid"
      ></Imgix>
    </div>
    <h2>Fixed</h2>
    <Imgix
      src="examples/pione.jpg"
      width="100"
      data-testid="simple-fixed-width"
    ></Imgix>
  </div>
</template>

<script>
import { Imgix } from '@/plugins/vue-imgix';
export default {
  name: 'simple-api',
  components: { Imgix },
};
</script>
