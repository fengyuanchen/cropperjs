import type { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './index.scss';

export default {
  extends: DefaultTheme,
  async enhanceApp(ctx: EnhanceAppContext) {
    if (import.meta.env.SSR) {
      return;
    }

    await import('cropperjs');
    await import('vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue').then((VPDocAsideCarbonAds) => {
      ctx.app.component('VPDocAsideCarbonAds', VPDocAsideCarbonAds.default);
    });
    await Promise.all([
      import('../components/ColorInput.vue'),
      import('../components/CropperCanvasToNativeCanvas.vue'),
      import('../components/CropperExample.vue'),
      import('../components/CropperPlayground.vue'),
      import('../components/CropperPlaygroundContainer.vue'),
      import('../components/CropperSelectionToNativeCanvas.vue'),
      import('../components/LiveDemo.vue'),
    ]).then((components) => {
      components.forEach((component: any) => {
        ctx.app.component(component.default.name, component.default);
      });
    });
  },
};
