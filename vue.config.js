// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  outputDir: './build',
  // publicPath: "./",
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://dqanony02.ytbig.cn/test',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
      },
    },
  },
};
