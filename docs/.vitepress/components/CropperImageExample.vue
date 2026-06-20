<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Within:</legend>
        <input
          id="withinViewport"
          v-model="within"
          type="radio"
          name="within"
          value="viewport"
        >
        <label for="withinViewport">viewport</label>
        <input
          id="withinCanvas"
          v-model="within"
          type="radio"
          name="within"
          value="canvas"
        >
        <label for="withinCanvas">canvas</label>
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
        rotatable
        scalable
        skewable
        translatable
        @change="onCropperImageChange"
      />
      <cropper-handle
        action="move"
        plain
      />
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';
import type { Selection } from '@cropper/element-selection';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperImageExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      within: 'canvas',
    };
  },
  methods: {
    inSelection(selection: Selection, maxSelection: Selection) {
      return (
        selection.x >= maxSelection.x
        && selection.y >= maxSelection.y
        && (selection.x + selection.width) <= (maxSelection.x + maxSelection.width)
        && (selection.y + selection.height) <= (maxSelection.y + maxSelection.height)
      );
    },
    onCropperImageChange(event: CustomEvent) {
      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;

      if (!cropperCanvas || this.within === 'none') {
        return;
      }

      const cropperCanvasRect = cropperCanvas.getBoundingClientRect();
      const selection = event.detail as Selection;

      switch (this.within) {
        case 'viewport': {
          const maxSelection: Selection = {
            x: -cropperCanvasRect.x,
            y: -cropperCanvasRect.y,
            width: window.innerWidth,
            height: window.innerHeight,
          };

          if (!this.inSelection(selection, maxSelection)) {
            event.preventDefault();
          }
          break;
        }

        case 'canvas': {
          const cropperCanvasRect = cropperCanvas.getBoundingClientRect();
          const maxSelection: Selection = {
            x: 0,
            y: 0,
            width: cropperCanvasRect.width,
            height: cropperCanvasRect.height,
          };

          if (!this.inSelection(selection, maxSelection)) {
            event.preventDefault();
          }
          break;
        }

        default:
      }
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
