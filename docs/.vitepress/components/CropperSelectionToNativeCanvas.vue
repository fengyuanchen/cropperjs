<template>
  <div class="to-canvas-demo">
    <div>
      <cropper-canvas background>
        <cropper-image
          :src="src"
          alt="Picture"
          rotatable
          scalable
          skewable
          translatable
        />
        <cropper-shade hidden />
        <cropper-handle
          action="move"
          plain
        />
        <cropper-selection
          ref="source"
          initial-coverage="0.5"
          movable
        >
          <cropper-handle
            action="move"
            plain
          />
        </cropper-selection>
      </cropper-canvas>
    </div>
    <button
      type="button"
      @click="convertToCanvas"
    >
      Convert to canvas &raquo;
    </button>
    <div ref="target" />
  </div>
</template>

<script lang="ts">
import type CropperCanvas from '@cropper/element-canvas';

const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperSelectionToNativeCanvas',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
    };
  },
  methods: {
    convertToCanvas() {
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
.to-canvas-demo {
  display: flex;

  > :first-child,
  > :last-child {
    border: 1px solid var(--vp-c-divider);
    flex: 1;
    font-size: 0;
  }

  > :last-child {
    align-items: center;
    display: flex;
    justify-content: center;

    :deep(canvas) {
      max-width: 100%;
    }
  }

  > button {
    align-self: center;
    border: 1px solid var(--vp-c-brand);
    border-radius: 0.25rem;
    color: var(--vp-c-brand);
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 0.25rem 0.5rem;

    &:focus,
    &:hover {
      background-color: var(--vp-c-brand);
      color: var(--vp-c-bg);
    }
  }
}
</style>
