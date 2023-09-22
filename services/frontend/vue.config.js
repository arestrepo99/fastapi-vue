const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // Allow connections from any host
    port: 80, // Adjust the port as needed
  },
})
