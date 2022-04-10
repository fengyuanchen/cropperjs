import markdownItContainer from 'markdown-it-container';
import { defineUserConfig } from 'vuepress';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import type { DefaultThemeOptions } from 'vuepress';

const packages = resolve(__dirname, '../../packages');

export default defineUserConfig<DefaultThemeOptions>({
  base: '/cropperjs/v2/',
  title: 'Cropper.js',
  description: 'JavaScript image cropper.',
  head: [
    ['link', {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      size: '16x16',
      href: '/favicon-16x16.png',
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      size: '32x32',
      href: '/favicon-32x32.png',
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.webmanifest',
    }],
    ['link', {
      rel: 'mask-icon',
      color: '#39f',
      href: '/safari-pinned-tab.svg',
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#2b5797',
    }],
    ['meta', {
      name: 'theme-color',
      content: '#39f',
    }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    repo: 'fengyuanchen/cropperjs-next',
    docsDir: 'docs',
    editLinks: true,
    navbar: [
      {
        text: 'Guide',
        link: '/guide.html',
      },
      {
        text: 'API Reference',
        link: '/api/',
      },
      {
        text: 'Migration',
        link: '/migration.html',
      },
      {
        text: 'Playground',
        link: '/playground.html',
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
          children: [
            'index.html',
            'cropper-element.html',
            {
              text: 'Elements',
              children: [
                'cropper-canvas.html',
                'cropper-image.html',
                'cropper-shade.html',
                'cropper-handle.html',
                'cropper-selection.html',
                'cropper-grid.html',
                'cropper-crosshair.html',
                'cropper-viewer.html',
              ],
            },
          ],
        },
      ],
    },
  },
  plugins: [
    '@vuepress/plugin-pwa',
    '@vuepress/plugin-pwa-popup',
    '@vuepress/search',
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve(__dirname, './components'),
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-CD35DZJ728',
      },
    ],
  ],
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
  extendsMarkdown: (md) => {
    md.use(markdownItContainer, 'live-demo', {
      render(tokens: any[], index: number) {
        return tokens[index].nesting === 1 ? '<ClientOnly><LiveDemo>' : '</LiveDemo></ClientOnly>';
      },
    });
  },
  bundlerConfig: {
    configureWebpack: () => ({
      resolve: {
        alias: readdirSync(packages).reduce((alias: Record<string, string>, name) => {
          alias[name === 'cropperjs' ? name : `@cropper/${name}`] = resolve(packages, name, 'src');
          return alias;
        }, {}),
      },
    }),
    vue: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('cropper-'),
      },
    },
  },
});
