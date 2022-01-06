<template>
  <div>
    <h2>Picture</h2>
    <div data-testid="simple-picture">
      <ix-picture>
        <ix-source src="blog/unsplash-kiss.jpg" />
        <ix-img src="blog/unsplash-kiss.jpg" />
      </ix-picture>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ix-picture-simple',
};
</script>
