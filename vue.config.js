const path = require('path')
const {argv} = require('yargs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const vendor = argv.vendor ? argv.vendor : 'default'
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VENDOR: JSON.stringify(vendor)
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: `vendors/${vendor}/favicon.ico`, to: '.' }
        ]
      })
    ],
    module: {
      rules: [
        {
          /** SvgIcon loader */
          test: /\.svg$/,
          include: [
            path.resolve(__dirname, "src/assets/icons")
        ],
          use: [{ loader: 'html-loader' }]
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        
        additionalData: `
          @import "./vendors/${vendor}/style.scss";
          $BREAKPOINT: ${process.env.BREAKPOINT};
        `
      }
    }
  }
}