'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[name][ext]',
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
            loader: MiniCssExtractPlugin.loader,
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
              }
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