import { defineClientConfig } from '@vuepress/client';

export default defineClientConfig({
  enhance() {
    if (!__VUEPRESS_SSR__) {
      import('cropperjs');
    }
  },
});
