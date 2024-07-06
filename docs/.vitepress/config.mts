import { readdirSync } from 'fs';
import { resolve } from 'path';
import markdownItContainer from 'markdown-it-container';
import { defineConfig } from 'vitepress';
import lerna from '../../lerna.json';

const packages = resolve(__dirname, '../../packages');

export default defineConfig({
  base: '/cropperjs/v2/',
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/cropperjs/v2/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/cropperjs/v2/favicon.ico',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        size: '16x16',
        href: '/cropperjs/v2/favicon-16x16.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        size: '32x32',
        href: '/cropperjs/v2/favicon-32x32.png',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#39f',
      },
    ],
    [
      'script',
      {
        src: 'https://fengyuanchen.github.io/shared/google-analytics.js',
        crossOrigin: 'anonymous',
      },
    ],
  ],

  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      level: [2, 3],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/fengyuanchen/cropperjs/tree/v2',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2015-present Chen Fengyuan',
    },
    search: {
      provider: 'local',
    },
    carbonAds: {
      code: 'CKYI55Q7',
      placement: 'fengyuanchengithubio',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Cropper.js',
      description: 'JavaScript image cropper.',
      themeConfig: {
        editLink: {
          pattern: 'https://github.com/fengyuanchen/cropperjs/edit/v2/docs/:path',
          text: 'Edit this page on GitHub',
        },
        nav: [
          {
            text: 'Guide',
            link: '/guide.html',
          },
          {
            text: 'API',
            link: '/api/',
          },
          {
            text: 'Playground',
            link: '/playground.html',
          },
          {
            text: 'Migration',
            link: '/migration.html',
          },
          {
            text: lerna.version,
            items: [
              { text: 'Changelog', link: 'https://github.com/fengyuanchen/cropperjs/blob/v2/CHANGELOG.md' },
              { text: 'Contributing', link: 'https://github.com/fengyuanchen/cropperjs/blob/v2/.github/CONTRIBUTING.md' },
            ],
          },
          {
            text: '1.x',
            link: 'https://fengyuanchen.github.io/cropperjs',
          },
        ],
        sidebar: {
          '/api/': [
            {
              text: 'API',
              items: [
                {
                  text: 'Cropper',
                  link: '/api/',
                },
                {
                  text: 'CropperElement',
                  link: '/api/cropper-element.html',
                },
                {
                  text: 'Elements',
                  items: [
                    {
                      text: 'CropperCanvas',
                      link: '/api/cropper-canvas.html',
                    },
                    {
                      text: 'CropperImage',
                      link: '/api/cropper-image.html',
                    },
                    {
                      text: 'CropperShade',
                      link: '/api/cropper-shade.html',
                    },
                    {
                      text: 'CropperHandle',
                      link: '/api/cropper-handle.html',
                    },
                    {
                      text: 'CropperSelection',
                      link: '/api/cropper-selection.html',
                    },
                    {
                      text: 'CropperGrid',
                      link: '/api/cropper-grid.html',
                    },
                    {
                      text: 'CropperCrosshair',
                      link: '/api/cropper-crosshair.html',
                    },
                    {
                      text: 'CropperViewer',
                      link: '/api/cropper-viewer.html',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: 'Cropper.js',
      description: 'JavaScript 图片裁剪器。',
      themeConfig: {
        lastUpdatedText: '上次更新',
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '选择语言',
        outline: {
          level: [2, 3],
          label: '在当前页面上',
        },
        editLink: {
          pattern: 'https://github.com/fengyuanchen/cropperjs/edit/v2/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        nav: [
          {
            text: '指南',
            link: '/zh/guide.html',
          },
          {
            text: 'API',
            link: '/zh/api/',
          },
          {
            text: '演练场',
            link: '/zh/playground.html',
          },
          {
            text: '迁移',
            link: '/zh/migration.html',
          },
          {
            text: '1.x',
            link: 'https://fengyuanchen.github.io/cropperjs',
          },
        ],
        sidebar: {
          '/zh/api/': [
            {
              text: 'API',
              items: [
                {
                  text: 'Cropper',
                  link: '/zh/api/',
                },
                {
                  text: 'CropperElement',
                  link: '/zh/api/cropper-element.html',
                },
                {
                  text: '元素',
                  items: [
                    {
                      text: 'CropperCanvas',
                      link: '/zh/api/cropper-canvas.html',
                    },
                    {
                      text: 'CropperImage',
                      link: '/zh/api/cropper-image.html',
                    },
                    {
                      text: 'CropperShade',
                      link: '/zh/api/cropper-shade.html',
                    },
                    {
                      text: 'CropperHandle',
                      link: '/zh/api/cropper-handle.html',
                    },
                    {
                      text: 'CropperSelection',
                      link: '/zh/api/cropper-selection.html',
                    },
                    {
                      text: 'CropperGrid',
                      link: '/zh/api/cropper-grid.html',
                    },
                    {
                      text: 'CropperCrosshair',
                      link: '/zh/api/cropper-crosshair.html',
                    },
                    {
                      text: 'CropperViewer',
                      link: '/zh/api/cropper-viewer.html',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
  markdown: {
    lineNumbers: false,
    config: (md) => {
      md.use(markdownItContainer, 'live-demo', {
        render(tokens: any[], index: number) {
          return tokens[index].nesting === 1 ? '<ClientOnly><LiveDemo>' : '</LiveDemo></ClientOnly>';
        },
      });
    },
  },
  vite: {
    resolve: {
      alias: readdirSync(packages).reduce((alias: Record<string, string>, name) => {
        alias[name === 'cropperjs' ? name : `@cropper/${name}`] = resolve(packages, name, 'src');
        return alias;
      }, {}),
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('cropper-'),
      },
    },
  },
});
