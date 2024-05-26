<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Image Fit:</legend>
        <input
          id="inputImageFitContain"
          v-model="imageFit"
          type="radio"
          name="imageFit"
          value="contain"
        >
        <label for="inputImageFitContain">contain</label>
        <input
          id="inputImageFitCover"
          v-model="imageFit"
          type="radio"
          name="imageFit"
          value="cover"
        >
        <label for="inputImageFitCover">cover</label>
        <input
          id="inputImageFitNone"
          v-model="imageFit"
          type="radio"
          name="imageFit"
          value="none"
        >
        <label for="inputImageFitNone">none</label>
      </fieldset>
    </form>
    <cropper-canvas
      ref="cropperCanvas"
      :key="imageFit"
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
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperImageExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      imageFit: 'contain',
    };
  },
  methods: {
    onCropperImageTransform(event: CustomEvent) {
      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;

      if (!cropperCanvas || this.imageFit === 'none') {
        return;
      }

      const cropperImage = this.$refs.cropperImage as CropperImage;
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

      if (
        (this.imageFit === 'contain' && (
          (
            cropperImageRect.top > cropperCanvasRect.top
            && cropperImageRect.right < cropperCanvasRect.right
          )
          || (
            cropperImageRect.right < cropperCanvasRect.right
            && cropperImageRect.bottom < cropperCanvasRect.bottom
          )
          || (
            cropperImageRect.bottom < cropperCanvasRect.bottom
            && cropperImageRect.left > cropperCanvasRect.left
          )
          || (
            cropperImageRect.left > cropperCanvasRect.left
            && cropperImageRect.top > cropperCanvasRect.top
          )
        ))
        || (this.imageFit === 'cover' && (
          cropperImageRect.top > cropperCanvasRect.top
          || cropperImageRect.right < cropperCanvasRect.right
          || cropperImageRect.bottom < cropperCanvasRect.bottom
          || cropperImageRect.left > cropperCanvasRect.left
        ))
      ) {
        event.preventDefault();
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
