const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/": {
        target: "http://45.12.236.247:50",
        ws: false,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
})
