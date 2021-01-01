<template>
  <div class="avatar-editor">
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
      this.$refs.target.appendChild(this.$refs.source.$toCanvas());
    },
  },
};
</script>

<style lang="stylus" scoped>
.avatar-editor {
  > cropper-canvas {
    border: 1px solid #eee;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
}
</style>
