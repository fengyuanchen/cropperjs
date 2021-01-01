<template>
  <div class="live-demo">
    <div class="live-demo__view">
      <div ref="demo" class="live-demo__view-content"></div>
    </div>
    <div ref="code" class="live-demo__code">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveDemo',
  mounted() {
    this.render();
  },
  updated() {
    this.render();
  },
  methods: {
    render() {
      this.$refs.demo.innerHTML = this.$refs.code.textContent;
    },
  },
};
</script>

<style lang="stylus" scoped>
.live-demo {
  margin-bottom: 1rem;
  margin-top: 1rem;

  &__view {
    border: 1px solid #eaecef;
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
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
}
</style>
