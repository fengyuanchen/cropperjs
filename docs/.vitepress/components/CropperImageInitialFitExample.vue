<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>initialFit:</legend>
        <input
          id="initialFitCover"
          v-model="initialFit"
          type="radio"
          name="initialFit"
          value="cover"
        >
        <label for="initialFitCover">cover</label>
        <input
          id="initialFitFill"
          v-model="initialFit"
          type="radio"
          name="initialFit"
          value="fill"
        >
        <label for="initialFitFill">fill</label>
        <input
          id="initialFitContain"
          v-model="initialFit"
          type="radio"
          name="initialFit"
          value="contain"
        >
        <label for="initialFitContain">contain</label>
        <input
          id="initialFitScaleDown"
          v-model="initialFit"
          type="radio"
          name="initialFit"
          value="scale-down"
        >
        <label for="initialFitScaleDown">scale-down</label>
        <input
          id="initialFitNone"
          v-model="initialFit"
          type="radio"
          name="initialFit"
          value="none"
        >
        <label for="initialFitNone">none</label>
      </fieldset>
    </form>
    <cropper-canvas
      ref="cropperCanvas"
      :key="initialFit"
      background
    >
      <cropper-image
        ref="cropperImage"
        :src="src"
        alt="Picture"
        :initial-fit="initialFit"
        rotatable
        scalable
        skewable
        translatable
      />
      <cropper-handle
        action="move"
        plain
      />
    </cropper-canvas>
  </div>
</template>

<script lang="ts">
const { BASE_URL } = import.meta.env;

export default {
  name: 'CropperImageInitialFitExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      initialFit: 'contain',
    };
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
