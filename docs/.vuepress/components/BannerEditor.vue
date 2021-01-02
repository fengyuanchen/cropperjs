<template>
  <div class="banner-editor">
    <cropper-canvas ref="source" background>
      <cropper-image src="/picture.jpg" alt="Logo"></cropper-image>
      <cropper-handle action="move" plain></cropper-handle>
    </cropper-canvas>
    <p>
      <button type="button" @click="crop">Crop</button>
    </p>
    <div ref="target"></div>
  </div>
</template>

<script>
export default {
  name: 'CropperCanvasToNativeCanvas',
  methods: {
    crop() {
      this.$refs.target.innerHTML = '';
      this.$refs.source.$toCanvas().then((canvas) => {
        this.$refs.target.appendChild(canvas);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.banner-editor {
  > cropper-canvas {
    border: 1px solid #eee;
    height: 200px;
  }
}
</style>
