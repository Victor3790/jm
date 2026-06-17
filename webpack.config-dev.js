'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: [path.resolve('src/js/main.js')],
    archive: [path.resolve('src/js/archive.js')],
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'],
      filename: 'index.html' }),
    new HtmlWebpackPlugin({
      template: './src/dir-archive.html',
      chunks: ['archive'],
      filename: 'dir-archive.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            options: {
              sassOptions: {
                // Optional: Silence Sass deprecation warnings. See note below.
                silenceDeprecations: [
                  'mixed-decls',
                  'color-functions',
                  'global-builtin',
                  'import'
                ],
              },
              additionalData: `
                @import "~bootstrap/scss/functions";
                @import "~bootstrap/scss/variables";
                @import "~bootstrap/scss/mixins";
              `,
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
     },
    ]
  },
  target: 'web',
}