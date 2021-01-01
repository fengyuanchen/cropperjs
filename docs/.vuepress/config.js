const path = require('path');

module.exports = {
  title: 'Cropper',
  description: 'JavaScript image cropper.',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'API',
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
          return tokens[index].nesting === 1 ? '<LiveDemo>' : '</LiveDemo>';
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
      alias: {
        '@cropper': path.resolve(__dirname, '../../packages/'),
        cropperjs: path.resolve(__dirname, '../../packages/cropperjs/src'),
      },
      extensions: ['.wasm', '.mjs', '.js', '.json', '.ts'],
    },
  },
};
