<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Within:</legend>
        <input
          id="inputWithinCanvas"
          v-model="within"
          type="radio"
          name="within"
          value="canvas"
        >
        <label for="inputWithinCanvas">canvas</label>
        <input
          id="inputWithinImage"
          v-model="within"
          type="radio"
          name="within"
          value="image"
        >
        <label for="inputWithinImage">image</label>
        <input
          id="inputWithinNone"
          v-model="within"
          type="radio"
          name="within"
          value="none"
        >
        <label for="inputWithinNone">none</label>
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
        @transform="onCropperImageTransform"
      />
      <cropper-handle
        action="move"
        plain
      />
      <cropper-selection
        ref="cropperSelection"
        initial-coverage="0.5"
        movable
        resizable
        outlined
        @change="onCropperSelectionChange"
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
import type CropperSelection from '@cropper/element-selection';
import type { Selection } from '@cropper/element-selection';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperSelectionExample',
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
    onCropperImageTransform(event: CustomEvent) {
      if (this.within !== 'image') {
        return;
      }

      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;
      const cropperImage = this.$refs.cropperImage as CropperImage;
      const cropperSelection = this.$refs.cropperSelection as CropperSelection;
      const cropperCanvasRect = cropperCanvas.getBoundingClientRect();

      // 1. Clone the cropper image.
      const cropperImageClone = cropperImage.cloneNode() as CropperImage;

      // 2. Apply the new matrix to the cropper image clone.
      cropperImageClone.style.transform = `matrix(${event.detail.matrix.join(', ')})`;

      // 3. Make the cropper image clone invisible.
      cropperImageClone.style.opacity = '0';

      // 4. Append the cropper image clone to the cropper canvas.
      cropperCanvas.appendChild(cropperImageClone);

      // 5. Compute the boundaries of the cropper image clone.
      const cropperImageRect = cropperImageClone.getBoundingClientRect();

      // 6. Remove the cropper image clone.
      cropperCanvas.removeChild(cropperImageClone);

      const selection = cropperSelection as Selection;
      const maxSelection: Selection = {
        x: cropperImageRect.left - cropperCanvasRect.left,
        y: cropperImageRect.top - cropperCanvasRect.top,
        width: cropperImageRect.width,
        height: cropperImageRect.height,
      };

      if (!this.inSelection(selection, maxSelection)) {
        event.preventDefault();
      }
    },
    onCropperSelectionChange(event: CustomEvent) {
      if (this.within === 'none') {
        return;
      }

      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;
      const cropperCanvasRect = cropperCanvas.getBoundingClientRect();
      const selection = event.detail as Selection;

      switch (this.within) {
        case 'canvas': {
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

        case 'image': {
          const cropperImage = this.$refs.cropperImage as CropperImage;
          const cropperImageRect = cropperImage.getBoundingClientRect();
          const maxSelection: Selection = {
            x: cropperImageRect.left - cropperCanvasRect.left,
            y: cropperImageRect.top - cropperCanvasRect.top,
            width: cropperImageRect.width,
            height: cropperImageRect.height,
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
