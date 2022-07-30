<template>
  <div class="cropper-container" />
</template>

<script lang="ts">
import Cropper from 'cropperjs';

export default {
  name: 'CropperExample',
  data() {
    return {
      src: this.$withBase('picture.jpg'),
    };
  },
  mounted(): void {
    const image = new Image();

    image.src = this.src;
    image.alt = 'Picture';

    const cropper = new Cropper(image, {
      container: '.cropper-container',
    });

    // eslint-disable-next-line no-console
    console.log(cropper);
  },
};
</script>

<style lang="scss" scoped>
.cropper-container {
  border: 1px solid var(--c-border);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1.25rem 1.5rem;

  :deep(cropper-canvas) {
    height: 360px;
  }
}
</style>
