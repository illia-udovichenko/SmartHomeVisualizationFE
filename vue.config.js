const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // devServer: {
  //   proxy: {
  //     '/api': { // это префикс API, который вы используете в своих запросах, например: axios.get('/api/your-endpoint')
  //       // target: 'http://192.168.50.200:3000/', // URL вашего API
  //       target: 'http://localhost:3000/', // URL вашего API
  //       changeOrigin: true, // необходимо для виртуального хостинга сайтов на одном и том же сервере
  //       pathRewrite: {'^/api': ''}, // может быть использовано для удаления префикса API из запроса
  //     },
  //   }
  // }
})