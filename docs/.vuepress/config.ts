import markdownItContainer from 'markdown-it-container';
import type { DefaultThemeOptions, WebpackBundlerOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const packages = resolve(__dirname, '../../packages');

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  title: 'Cropper.js',
  description: 'JavaScript image cropper.',
  themeConfig: {
    repo: 'fengyuanchen/cropperjs-next',
    docsDir: 'docs',
    editLinks: true,
    navbar: [
      {
        text: 'Docs',
        ariaLabel: 'Documentation Menu',
        children: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Examples',
            link: '/examples/',
          },
          {
            text: 'Migration from Cropper.js 1',
            link: '/migration/',
          },
        ],
      },
      {
        text: 'API Reference',
        link: '/api/',
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
          isGroup: true,
          text: 'API',
          children: [
            'index.html',
            'cropper-element.html',
            {
              isGroup: true,
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
      '/examples/': [
        {
          isGroup: true,
          text: 'Examples',
          children: [
            'index.html',
            'banner-editor.html',
          ],
        },
      ],
    },
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: resolve(__dirname, './components'),
      },
    ],
    '@vuepress/search',
  ],
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
  extendsMarkdown: (md) => {
    md.use(markdownItContainer, 'live-demo', {
      render(tokens, index) {
        return tokens[index].nesting === 1 ? '<ClientOnly><LiveDemo>' : '</LiveDemo></ClientOnly>';
      },
    });
  },
  bundlerConfig: {
    configureWebpack: () => ({
      resolve: {
        alias: readdirSync(packages).reduce((alias, name) => {
          alias[name === 'cropperjs' ? name : `@cropper/${name}`] = resolve(packages, name, 'src');
          return alias;
        }, {}),
      },
    }),
  },
});
