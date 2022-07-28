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
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Cropper.js',
      description: 'JavaScript image cropper.',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Cropper.js',
      description: 'JavaScript 图片裁剪器。',
    },
  },
  theme: defaultTheme({
    logo: '/logo.svg',
    repo: 'fengyuanchen/cropperjs',
    docsBranch: 'v2',
    docsDir: 'docs',
    editLink: true,
    locales: {
      '/': {
        selectLanguageName: 'English',
        editLinkText: 'Edit this page on GitHub',
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
      '/zh/': {
        selectLanguageName: '中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
        navbar: [
          {
            text: '指南',
            link: '/zh/guide.html',
          },
          {
            text: 'API 参考',
            link: '/zh/api/',
          },
          {
            text: '迁移',
            link: '/zh/migration.html',
          },
          {
            text: '演示',
            link: '/zh/playground.html',
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
              children: [
                'index.html',
                'cropper-element.html',
                {
                  text: '元素',
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
    },
  }),
  plugins: [
    pwaPlugin(),
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
