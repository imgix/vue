<template>
  <div id="app">
    <h1>Advanced Usage</h1>
    <h2>buildUrlObject</h2>
    <advanced-build-url-object></advanced-build-url-object>
    <h2>buildUrl</h2>
    <advanced-build-url />
    <h2>buildSrcSet</h2>
    <advanced-build-src-set />
  </div>
</template>

<script>
import advancedBuildUrlObject from './components/advanced/buildUrlObject';
import advancedBuildUrl from './components/advanced/buildUrl';
import advancedBuildSrcSet from './components/advanced/buildSrcSet';

export default {
  name: 'App',

  components: {
    advancedBuildUrlObject,
    advancedBuildUrl,
    advancedBuildSrcSet,
  },

  computed: {},
};
</script>
