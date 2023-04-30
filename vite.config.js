const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../docs'
  },
  server: {
    port: 8080,
    hot: true
  }
}