import { defineClientAppEnhance } from '@vuepress/client';

export default defineClientAppEnhance(() => {
  if (!__VUEPRESS_SSR__) {
    import('cropperjs');
  }
});
