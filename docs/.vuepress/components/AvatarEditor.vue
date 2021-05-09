<template>
  <div class="avatar-editor">
    <cropper-canvas
      ref="source"
      background
    >
      <cropper-image
        src="/picture.jpg"
        alt="Picture"
      />
      <cropper-crosshair
        centered
      />
      <cropper-handle
        action="move"
        plain
      />
    </cropper-canvas>
    <p>
      <button
        type="button"
        @click="crop"
      >
        Crop
      </button>
    </p>
    <div ref="target" />
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';

export default {
  name: 'CropperCanvasToNativeCanvas',
  methods: {
    crop(): void {
      const source = this.$refs.source as CropperCanvas;
      const target = this.$refs.target as HTMLElement;

      target.innerHTML = '';
      source.$toCanvas().then((canvas: HTMLCanvasElement) => {
        target.appendChild(canvas);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-editor {
  > cropper-canvas {
    border: 1px solid #eee;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
}
</style>
