<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Zoom Origin:</legend>
        <input
          id="zoomOriginPointer"
          v-model="zoomOrigin"
          type="radio"
          name="zoomOrigin"
          value="pointer"
        >
        <label for="zoomOriginPointer">pointer (default)</label>
        <input
          id="zoomOriginCenter"
          v-model="zoomOrigin"
          type="radio"
          name="zoomOrigin"
          value="center"
        >
        <label for="zoomOriginCenter">center</label>
      </fieldset>
    </form>
    <cropper-canvas
      :key="zoomOrigin"
      background
      @action="onCropperCanvasAction"
    >
      <cropper-image
        ref="cropperImage"
        :src="src"
        alt="Picture"
        scalable
      />
      <cropper-handle
        action="scale"
        plain
      />
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
import type CropperImage from '@cropper/element-image';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperImageZoomOriginExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      zoomOrigin: 'center',
    };
  },
  methods: {
    onCropperCanvasAction(event: CustomEvent) {
      if (this.zoomOrigin === 'center' && typeof event.detail.scale === 'number') {
        event.preventDefault();
        (this.$refs.cropperImage as CropperImage).$zoom(event.detail.scale);
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
