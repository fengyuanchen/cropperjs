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
      @actionstart="onCropperCanvasActionStart"
      @actionend="onCropperCanvasActionEnd"
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
import { ACTION_MOVE } from '@cropper/utils';
import type CropperCanvas from '@cropper/element-canvas';
import type { Selection } from '@cropper/element-selection';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperImageExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      within: 'canvas',
      action: '',
    };
  },
  methods: {
    onCropperCanvasActionStart(event: CustomEvent) {
      this.action = event.detail.action;
    },
    onCropperCanvasActionEnd() {
      this.action = '';
    },
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
      const cropperImage = this.$refs.cropperImage as HTMLElement & {
        $move: (x: number, y: number) => void;
      };

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

          this.limitImageChange(event, selection, maxSelection, cropperCanvas, cropperImage);
          break;
        }

        case 'canvas': {
          const maxSelection: Selection = {
            x: 0,
            y: 0,
            width: cropperCanvasRect.width,
            height: cropperCanvasRect.height,
          };

          this.limitImageChange(event, selection, maxSelection, cropperCanvas, cropperImage);
          break;
        }

        default:
      }
    },
    limitImageChange(
      event: CustomEvent,
      selection: Selection,
      bounds: Selection,
      cropperCanvas: CropperCanvas,
      cropperImage: HTMLElement & { $move: (x: number, y: number) => void },
    ) {
      if (this.inSelection(selection, bounds)) {
        return;
      }

      event.preventDefault();

      if (this.action !== ACTION_MOVE) {
        return;
      }

      const canvasRect = cropperCanvas.getBoundingClientRect();
      const imageRect = cropperImage.getBoundingClientRect();
      const current: Selection = {
        x: imageRect.x - canvasRect.x,
        y: imageRect.y - canvasRect.y,
        width: imageRect.width,
        height: imageRect.height,
      };
      const maxX = bounds.x + bounds.width - selection.width;
      const maxY = bounds.y + bounds.height - selection.height;
      const x = maxX >= bounds.x
        ? Math.min(Math.max(selection.x, bounds.x), maxX)
        : current.x;
      const y = maxY >= bounds.y
        ? Math.min(Math.max(selection.y, bounds.y), maxY)
        : current.y;
      const moveX = x - current.x;
      const moveY = y - current.y;

      if (moveX || moveY) {
        cropperImage.$move(moveX, moveY);
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
