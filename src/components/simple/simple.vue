<template>
  <div>
    <h2>Simple</h2>
    <div style="width: 400px;">
      <Imgix :src="examples/pione.jpg" sizes="100vw" data-testid="simple-fluid"></Imgix>
    </div>
  </div>
</template>

<script>
import { Imgix } from '@/plugins/vue-imgix';
export default {
  name: 'simple-api',
  components: { Imgix },
};
</script>
