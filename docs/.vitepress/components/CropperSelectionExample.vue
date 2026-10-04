<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Within:</legend>
        <input
          id="withinCanvas"
          v-model="within"
          type="radio"
          name="within"
          value="canvas"
        >
        <label for="withinCanvas">canvas</label>
        <input
          id="withinImage"
          v-model="within"
          type="radio"
          name="within"
          value="image"
        >
        <label for="withinImage">image</label>
        <input
          id="withinNone"
          v-model="within"
          type="radio"
          name="within"
          value="none"
        >
        <label for="withinNone">none</label>
      </fieldset>
    </form>
    <cropper-canvas
      ref="cropperCanvas"
      :key="within"
      background
    >
      <cropper-image
        ref="cropperImage"
        :src="src"
        alt="Picture"
        :rotatable="within !== 'image'"
        :scalable="within !== 'image'"
        :skewable="within !== 'image'"
        :translatable="within !== 'image'"
      />
      <cropper-handle
        action="move"
        plain
      />
      <cropper-selection
        initial-coverage="0.5"
        :min-inset="minInset"
        movable
        resizable
        outlined
      >
        <cropper-grid
          role="grid"
          covered
        />
        <cropper-crosshair centered />
        <cropper-handle
          action="move"
          theme-color="rgba(255, 255, 255, 0.35)"
        />
        <cropper-handle action="n-resize" />
        <cropper-handle action="e-resize" />
        <cropper-handle action="s-resize" />
        <cropper-handle action="w-resize" />
        <cropper-handle action="ne-resize" />
        <cropper-handle action="nw-resize" />
        <cropper-handle action="se-resize" />
        <cropper-handle action="sw-resize" />
      </cropper-selection>
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperSelectionExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      within: 'canvas',
      minInset: '0',
    };
  },
  watch: {
    within: 'updateMinInset',
  },
  methods: {
    async updateMinInset() {
      const { within } = this;

      this.minInset = within === 'canvas' ? '0' : 'auto';

      if (within !== 'image') {
        return;
      }

      // Waits for the canvas to be re-created by the `key` change.
      await this.$nextTick();

      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;
      const cropperImage = this.$refs.cropperImage as CropperImage;

      await cropperImage.$ready();

      if (this.within !== within) {
        return;
      }

      const canvasRect = cropperCanvas.getBoundingClientRect();
      const imageRect = cropperImage.getBoundingClientRect();

      this.minInset = [
        imageRect.top - canvasRect.top,
        canvasRect.right - imageRect.right,
        canvasRect.bottom - imageRect.bottom,
        imageRect.left - canvasRect.left,
      ].map((value) => `${value}px`).join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1.25rem 1.5rem;

  fieldset {
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;

    > input {
      margin: 0 0.25rem 0 0;
      transform: translateY(-0.5px);
      vertical-align: middle;
    }

    > label {
      margin-right: 0.5rem;
    }
  }

  cropper-canvas {
    height: 320px;
  }
}
</style>
