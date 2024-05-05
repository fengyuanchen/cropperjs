<template>
  <input
    type="color"
    class="form-control form-control-color form-control-sm"
    :value="modelValueAsHex"
    @input="onInput"
  >
</template>

<script lang="ts">
import rgbHex from 'rgb-hex';

const EVENT_UPDATE_MODEL_VALUE = 'update:modelValue';

export default {
  name: 'ColorInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: [EVENT_UPDATE_MODEL_VALUE],
  computed: {
    modelValueAsHex() {
      const { modelValue } = this;

      if (modelValue.includes('rgba')) {
        return rgbHex(modelValue);
      }

      return modelValue;
    },
  },
  methods: {
    rgbHex,
    onInput(event: any) {
      this.$emit(EVENT_UPDATE_MODEL_VALUE, event.target.value, this.modelValue);
    },
  },
};
</script>
