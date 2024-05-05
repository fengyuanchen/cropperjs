<template>
  <div class="cropper-container">
    <cropper-canvas ref="cropperCanvas" background>
      <cropper-image :src="src" alt="Picture"></cropper-image>
      <cropper-selection initial-coverage="0.5" movable resizable outlined @change="onCropperSelectionChange">
        <cropper-grid role="grid" covered></cropper-grid>
        <cropper-crosshair centered></cropper-crosshair>
        <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
        <cropper-handle action="n-resize"></cropper-handle>
        <cropper-handle action="e-resize"></cropper-handle>
        <cropper-handle action="s-resize"></cropper-handle>
        <cropper-handle action="w-resize"></cropper-handle>
        <cropper-handle action="ne-resize"></cropper-handle>
        <cropper-handle action="nw-resize"></cropper-handle>
        <cropper-handle action="se-resize"></cropper-handle>
        <cropper-handle action="sw-resize"></cropper-handle>
      </cropper-selection>
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperSelectionExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
    };
  },
  methods: {
    onCropperSelectionChange(event: CustomEvent) {
      const cropperCanvas = this.$refs.cropperCanvas as CropperCanvas;
      const selection = event.detail;

      if (cropperCanvas && (
        selection.x < 0
        || selection.y < 0
        || (selection.x + selection.width) > cropperCanvas.offsetWidth
        || (selection.y + selection.height) > cropperCanvas.offsetHeight
      )) {
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

  :deep(cropper-canvas) {
    height: 360px;
  }
}
</style>
