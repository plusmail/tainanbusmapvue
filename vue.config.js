
const ProgressBarPlugin = require('progress-webpack-plugin');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/tainanbusmapvue/'
      : '/',

    configureWebpack: {
        plugins: [
            new ProgressBarPlugin()
        ]
    }
}