<template>
  <div id="app">
    <h1>Simple Usage</h1>
    <simple />
    <h1>Static Usage</h1>
    <partial />

    <h1>Advanced Usage</h1>
    <advanced-api />
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
import advancedApi from './components/advanced/advanced';
import simple from './components/simple/simple';
import partial from './components/simple/static-api';

export default {
  name: 'App',

  components: {
    advancedBuildUrlObject,
    advancedBuildUrl,
    advancedBuildSrcSet,
    advancedApi,
    simple,
    partial,
  },

  computed: {},
};
</script>
