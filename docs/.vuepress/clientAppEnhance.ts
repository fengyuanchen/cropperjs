import { defineClientAppEnhance } from '@vuepress/client';

export default defineClientAppEnhance(({ app }) => {
  if (!__SSR__) {
    import('cropperjs');
  }

  app.config.isCustomElement = (tag) => tag.startsWith('cropper-');
});
