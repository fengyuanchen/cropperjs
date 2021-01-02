const fs = require('fs');
const path = require('path');
const packages = path.resolve(__dirname, '../../packages');

module.exports = {
  title: 'Cropper',
  description: 'JavaScript image cropper.',
  themeConfig: {
    repo: 'fengyuanchen/cropperjs-next',
    docsDir: 'docs',
    editLinks: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'API Reference',
        link: '/api/',
      },
      {
        text: 'Examples',
        link: '/examples/',
      },
      {
        text: 'Playground',
        link: '/playground.html',
      },
    ],
    sidebar: {
      '/api/': [
        {
          title: 'API',
          collapsable: false,
          children: [
            '',
            'cropper-element',
            'cropper-canvas',
            'cropper-image',
            'cropper-selection',
            'cropper-handle',
            'cropper-shade',
            'cropper-grid',
            'cropper-crosshair',
            'cropper-viewer',
          ],
        },
      ],
      '/examples/': [
        {
          title: 'Examples',
          collapsable: false,
          children: [
            '',
            'banner-editor',
          ],
        },
      ],
    },
  },
  plugins: [
    '@vuepress/last-updated',
    '@vuepress/back-to-top',
  ],
  markdown: {
    extendMarkdown: (md) => {
      md.use(require('markdown-it-container'), 'live-demo', {
        render(tokens, index) {
          return tokens[index].nesting === 1 ? '<ClientOnly><LiveDemo>' : '</LiveDemo></ClientOnly>';
        },
      });
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                ],
              },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: fs.readdirSync(packages).reduce((alias, name) => {
        alias[name === 'cropperjs' ? name : `@cropper/${name}`] = path.resolve(packages, name, 'src');
        return alias;
      }, {}),
      extensions: ['.wasm', '.mjs', '.js', '.json', '.ts'],
    },
  },
};
