<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>initialCenterSize:</legend>
        <input
          id="initialCenterSizeCover"
          v-model="initialCenterSize"
          type="radio"
          name="initialCenterSize"
          value="cover"
        >
        <label for="initialCenterSizeCover">cover</label>
        <input
          id="initialCenterSizeFill"
          v-model="initialCenterSize"
          type="radio"
          name="initialCenterSize"
          value="fill"
        >
        <label for="initialCenterSizeFill">fill</label>
        <input
          id="initialCenterSizeContain"
          v-model="initialCenterSize"
          type="radio"
          name="initialCenterSize"
          value="contain"
        >
        <label for="initialCenterSizeContain">contain</label>
        <input
          id="initialCenterSizeScaleDown"
          v-model="initialCenterSize"
          type="radio"
          name="initialCenterSize"
          value="scale-down"
        >
        <label for="initialCenterSizeScaleDown">scale-down</label>
        <input
          id="initialCenterSizeNone"
          v-model="initialCenterSize"
          type="radio"
          name="initialCenterSize"
          value="none"
        >
        <label for="initialCenterSizeNone">none</label>
      </fieldset>
    </form>
    <cropper-canvas
      ref="cropperCanvas"
      :key="initialCenterSize"
      background
    >
      <cropper-image
        ref="cropperImage"
        :src="src"
        alt="Picture"
        :initial-center-size="initialCenterSize"
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
  name: 'CropperImageInitialCenterSizeExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      initialCenterSize: 'contain',
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
