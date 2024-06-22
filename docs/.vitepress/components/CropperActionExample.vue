<template>
  <div class="cropper-container">
    <cropper-canvas background>
      <cropper-image
        :src="src"
        alt="Picture"
        rotatable
        scalable
        skewable
        translatable
      />
      <cropper-handle
        action="select"
        plain
        @dblclick="toggleActionOnDblclick"
      />
      <cropper-selection
        ref="cropperSelection"
        initial-coverage="0.5"
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
          @dblclick="toggleActionOnDblclick"
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
import type CropperHandle from '@cropper/element-handle';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperActionExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
    };
  },
  methods: {
    toggleActionOnDblclick(event: any) {
      const cropperHandle = event.target as CropperHandle;

      cropperHandle.action = cropperHandle.action === 'move' ? 'select' : 'move';
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

  cropper-canvas {
    height: 320px;
  }
}
</style>
