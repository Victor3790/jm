const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    // Getting styles only
    bootstrap: [path.resolve(__dirname,'src/prod/bootstrap.js')],
    styles: [path.resolve(__dirname,'src/prod/styles.js')],
    sidebar: [path.resolve(__dirname,'src/prod/sidebar.js')],
    main: [path.resolve(__dirname,'src/prod/main.js')]
  },
  output: { pathinfo: false, },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        /*use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader']*/
        use: [
          {
            // Get styles in a file
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
    ]
  }
}