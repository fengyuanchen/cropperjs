import { defineClientAppEnhance } from '@vuepress/client';

export default defineClientAppEnhance(() => {
  if (!__SSR__) {
    import('cropperjs');
  }
});
