<template>
  <div>
    <h2>attributeConfig</h2>
    <div data-testid="advanced-attribute-config">
      <ix-img
        src="examples/pione.jpg"
        :attributeConfig="{
          src: 'data-src',
          srcset: 'data-srcset',
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'advance-api',
};
</script>
