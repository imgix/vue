<template>
  <div id="app">
    <h1>Advanced Usage</h1>
    <h2>buildUrlObject</h2>
    <advanced-build-url-object></advanced-build-url-object>
    <h2>buildUrl</h2>
    <advanced-build-url />
  </div>
</template>

<script>
import advancedBuildUrlObject from './components/advanced/buildUrlObject';
import advancedBuildUrl from './components/advanced/buildUrl';

export default {
  name: 'App',

  components: {
    advancedBuildUrlObject,
    advancedBuildUrl,
  },

  computed: {},
};
</script>
