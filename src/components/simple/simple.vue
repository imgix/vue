<template>
  <div>
    <h2>Simple</h2>
    <ix-img src="examples/pione.jpg" sizes="20vw" data-testid="simple-fluid" />
    <h2>Fixed</h2>
    <ix-img
      src="examples/pione.jpg"
      width="100"
      data-testid="simple-fixed-width"
    />
  </div>
</template>

<script>
export default {
  name: 'simple-api',
};
</script>
