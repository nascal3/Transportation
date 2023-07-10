const Dotenv = require('dotenv-webpack')

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    plugins: [
      new Dotenv({
        path: '.env',
        systemvars: true
      })
    ]
  }
}
