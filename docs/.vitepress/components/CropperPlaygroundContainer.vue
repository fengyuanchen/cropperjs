<template>
  <iframe
    class="cropper-playground-container"
    :src="src"
  />
</template>

<script lang="ts">
export default {
  name: 'CropperPlaygroundContainer',
  props: {
    src: {
      type: String,
      default: undefined,
    },
  },
  mounted() {
    const footer = document.body.querySelector('.VPFooter') as any;

    if (footer) {
      footer.style.display = 'none';
    }
  },
  beforeUnmount() {
    const footer = document.body.querySelector('.VPFooter') as any;

    if (footer) {
      footer.style.display = '';
    }
  },
};
</script>

<style lang="scss">
.cropper-playground-container {
  border-color: var(--vp-c-divider);
  border-style: solid;
  border-width: 1px 0 0;
  height: calc(100vh - var(--vp-nav-height));
  width: 100%;
}
</style>
