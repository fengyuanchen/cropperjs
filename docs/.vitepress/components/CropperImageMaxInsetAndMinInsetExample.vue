<template>
  <div class="cropper-container">
    <form>
      <fieldset>
        <legend>Max Inset:</legend>
        <select
          id="maxInsetOption"
          v-model="maxInsetOption"
          name="maxInsetOption"
        >
          <option
            v-for="option in options"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
          <option value="">
            custom
          </option>
        </select>
        <input
          v-if="maxInsetOption === ''"
          id="maxInset"
          v-model="maxInsetCustom"
          type="text"
          name="maxInset"
          placeholder="e.g. 10px 5% 1rem"
          autocomplete="off"
        >
      </fieldset>
      <fieldset>
        <legend>Min Inset:</legend>
        <select
          id="minInsetOption"
          v-model="minInsetOption"
          name="minInsetOption"
        >
          <option
            v-for="option in options"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
          <option value="">
            custom
          </option>
        </select>
        <input
          v-if="minInsetOption === ''"
          id="minInset"
          v-model="minInsetCustom"
          type="text"
          name="minInset"
          placeholder="e.g. -50px 0"
          autocomplete="off"
        >
      </fieldset>
    </form>
    <cropper-canvas
      background
    >
      <cropper-image
        :src="src"
        alt="Picture"
        :max-inset="maxInset"
        :min-inset="minInset"
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
  name: 'CropperImageMaxInsetAndMinInsetExample',
  data() {
    return {
      src: `${BASE_URL}picture.jpg`,
      options: [
        'auto',
        '0',
        '50px',
        '-50px',
        '50%',
        '-50px 0',
        '0 50px',
        '0 -50px -100px',
        '10px 20px 30px 40px',
      ],
      maxInsetOption: 'auto',
      maxInsetCustom: '',
      minInsetOption: '-50px 0',
      minInsetCustom: '',
    };
  },
  computed: {
    maxInset(): string {
      return this.maxInsetOption || this.maxInsetCustom || 'auto';
    },
    minInset(): string {
      return this.minInsetOption || this.minInsetCustom || 'auto';
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

  fieldset {
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;

    > input {
      border: 1px solid var(--vp-c-divider);
      border-radius: 0.25rem;
      display: block;
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      width: 100%;
    }
  }

  cropper-canvas {
    height: 320px;
  }
}
</style>
