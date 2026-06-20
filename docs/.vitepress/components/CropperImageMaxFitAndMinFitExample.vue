<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Max Fit:</legend>
        <input
          id="maxFitCover"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value="cover"
        >
        <label for="maxFitCover">cover</label>
        <input
          id="maxFitFill"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value="fill"
        >
        <label for="maxFitFill">fill</label>
        <input
          id="maxFitContain"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value="contain"
        >
        <label for="maxFitContain">contain</label>
        <input
          id="maxFitScaleDown"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value="scale-down"
        >
        <label for="maxFitScaleDown">scale-down</label>
        <input
          id="maxFitNone"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value="none"
        >
        <label for="maxFitNone">none</label>
        <input
          id="maxFit"
          v-model="maxFit"
          type="radio"
          name="maxFit"
          value=""
        >
        <label for="maxFit">default</label>
      </fieldset>
      <fieldset>
        <legend>Min Fit:</legend>
        <input
          id="minFitCover"
          v-model="minFit"
          type="radio"
          name="minFit"
          value="cover"
        >
        <label for="minFitCover">cover</label>
        <input
          id="minFitFill"
          v-model="minFit"
          type="radio"
          name="minFit"
          value="fill"
        >
        <label for="minFitFill">fill</label>
        <input
          id="minFitContain"
          v-model="minFit"
          type="radio"
          name="minFit"
          value="contain"
        >
        <label for="minFitContain">contain</label>
        <input
          id="minFitScaleDown"
          v-model="minFit"
          type="radio"
          name="minFit"
          value="scale-down"
        >
        <label for="minFitScaleDown">scale-down</label>
        <input
          id="minFitNone"
          v-model="minFit"
          type="radio"
          name="minFit"
          value="none"
        >
        <label for="minFitNone">none</label>
        <input
          id="minFit"
          v-model="minFit"
          type="radio"
          name="minFit"
          value=""
        >
        <label for="minFit">default</label>
      </fieldset>
    </form>
    <cropper-canvas
      ref="cropperCanvas"
      :key="minFit"
      background
    >
      <cropper-image
        ref="cropperImage"
        :src="src"
        alt="Picture"
        :max-fit="maxFit"
        :min-fit="minFit"
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
  name: 'CropperImageMaxFitAndMinFitExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      maxFit: 'cover',
      minFit: 'contain',
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
