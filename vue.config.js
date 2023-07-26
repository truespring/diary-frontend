const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  outputDir: '../diary/src/main/resources/static',

    devServer: {
      proxy: 'http://localhost:8089'
    }
}
