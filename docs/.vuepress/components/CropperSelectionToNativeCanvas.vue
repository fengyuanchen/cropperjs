<template>
  <div class="to-canvas-demo">
    <div>
      <cropper-canvas background>
        <cropper-image src="/picture.jpg" alt="Logo"></cropper-image>
        <cropper-shade hidden></cropper-shade>
        <cropper-handle action="move" plain></cropper-handle>
        <cropper-selection ref="source" auto-select auto-select-area="0.5" movable zoomable>
          <cropper-handle action="move" plain></cropper-handle>
        </cropper-selection>
      </cropper-canvas>
    </div>
    <button type="button" @click="convertToCanvas">Convert to canvas &raquo;</button>
    <div ref="target"></div>
  </div>
</template>

<script>
export default {
  name: 'CropperSelectionToNativeCanvas',
  methods: {
    convertToCanvas() {
      this.$refs.target.innerHTML = '';
      this.$refs.source.$toCanvas().then((canvas) => {
        this.$refs.target.appendChild(canvas);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.to-canvas-demo {
  display: flex;

  > :first-child,
  > :last-child {
    border: 1px solid #eee;
    flex: 1;
    font-size: 0;
  }

  > :last-child {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  > button {
    align-self: center;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
