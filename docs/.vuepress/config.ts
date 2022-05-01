import { readdirSync } from 'fs';
import { resolve } from 'path';
import markdownItContainer from 'markdown-it-container';
import { defineUserConfig, defaultTheme } from 'vuepress';
import { webpackBundler } from 'vuepress-webpack';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { searchPlugin } from '@vuepress/plugin-search';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';

const packages = resolve(__dirname, '../../packages');

export default defineUserConfig({
  base: '/cropperjs/v2/',
  title: 'Cropper.js',
  description: 'JavaScript image cropper.',
  head: [
    ['link', {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/cropperjs/v2/apple-touch-icon.png',
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      size: '16x16',
      href: '/cropperjs/v2/favicon-16x16.png',
    }],
    ['link', {
      rel: 'icon',
      type: 'image/png',
      size: '32x32',
      href: '/cropperjs/v2/favicon-32x32.png',
    }],
    ['link', {
      rel: 'manifest',
      href: '/cropperjs/v2/manifest.webmanifest',
    }],
    ['link', {
      rel: 'mask-icon',
      color: '#39f',
      href: '/cropperjs/v2/safari-pinned-tab.svg',
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
  theme: defaultTheme({
    logo: '/logo.svg',
    repo: 'fengyuanchen/cropperjs',
    docsBranch: 'v2',
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
  }),
  plugins: [
    pwaPlugin({}),
    pwaPopupPlugin(),
    searchPlugin(),
    registerComponentsPlugin({
      componentsDir: resolve(__dirname, './components'),
    }),
    googleAnalyticsPlugin({
      id: 'G-CD35DZJ728',
    }),
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
  bundler: webpackBundler({
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
  }),
});
