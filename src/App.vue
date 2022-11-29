<template>
  <div id="app">
    <h1>Simple Usage</h1>
    <simple />
    <h1>Static Usage</h1>
    <static-api />

    <h1>Advanced Usage</h1>
    <advanced-api />
    <h2>buildUrlObject</h2>
    <advanced-build-url-object></advanced-build-url-object>
    <h2>buildUrl</h2>
    <advanced-build-url />
    <h2>buildSrcSet</h2>
    <advanced-build-src-set />
    <h2>_buildSrcSet</h2>
    <static-build-src-set />
  </div>
</template>

<script>
import advancedBuildUrlObject from './components/advanced/buildUrlObject.vue';
import advancedBuildUrl from './components/advanced/buildUrl.vue';
import advancedBuildSrcSet from './components/advanced/buildSrcSet.vue';
import staticBuildSrcSet from './components/advanced/_buildSrcSet.vue';
import advancedApi from './components/advanced/advanced.vue';
import simple from './components/simple/simple.vue';
import staticApi from './components/simple/static-api.vue';

export default {
  name: 'App',

  components: {
    advancedBuildUrlObject,
    advancedBuildUrl,
    advancedBuildSrcSet,
    staticBuildSrcSet,
    advancedApi,
    simple,
    staticApi,
  },

  computed: {},
};
</script>
