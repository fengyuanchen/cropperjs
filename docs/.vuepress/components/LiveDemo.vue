<template>
  <div class="live-demo">
    <div class="live-demo__view">
      <div
        ref="demo"
        class="live-demo__view-content"
      />
    </div>
    <div
      ref="code"
      class="live-demo__code"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LiveDemo',
  mounted(): void {
    this.render();
  },
  updated(): void {
    this.render();
  },
  methods: {
    render(): void {
      const demo = this.$refs.demo as HTMLElement;
      const code = this.$refs.code as HTMLElement;

      demo.innerHTML = code.textContent || '';
    },
  },
};
</script>

<style lang="scss" scoped>
.live-demo {
  margin-bottom: 1rem;
  margin-top: 1rem;

  &__view {
    border: 1px solid var(--c-border);
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    padding: 1.25rem 1.5rem;

    &-content {
      overflow: hidden;
      position: relative;
    }
  }

  &__code {
    > :first-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      > :first-child {
        margin-bottom: 0;
        margin-top: 0;
      }
    }
  }
}
</style>
