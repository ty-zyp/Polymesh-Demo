// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })



const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin({})
    ]
  },
  transpileDependencies: true,
};