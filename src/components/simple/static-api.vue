<template>
  <div>
    <h2>Absolute URL Static API Example</h2>
    <!-- relative URL gets domain from client -->
    <ix-img
      src="/examples/pione.jpg"
      width="100"
      data-testid="static-api-relative"
    />
    <!-- absolute URL domain does not get overridden -->
    <ix-img
      src="https://sdk-test.imgix.net/amsterdam.jpg"
      width="100"
      data-testid="static-api-absolute"
    />
  </div>
</template>

<script>
export default {
  name: 'static-api',
};
</script>
