const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'cloud.arec.me', // Allow connections from any host
    port: 80, // Adjust the port as needed
  },
})
